import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  listarRecurso,
  cadastrarRecurso,
  alterarRecurso,
  excluirRecurso,
} from "../services/api";

const formularioVazio = {
  nome: "",
  cpf: "",
  email: "",
  data_nascimento: "",
  telefone: "",
  cidade: "",
};

function PessoaPage({ recurso, titulo, singular, rotulo, idField }) {
  const [registros, setRegistros] = useState([]);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [registroEditando, setRegistroEditando] = useState(null);
  const [campoFiltro, setCampoFiltro] = useState("nome");
  const [textoFiltro, setTextoFiltro] = useState("");

  const mostrarFormulario = searchParams.get("acao") === "cadastrar";

  async function carregarRegistros() {
    setErro("");

    try {
      const dados = await listarRecurso(recurso);
      setRegistros(dados);
    } catch (erro) {
      setErro(erro.message || `Não foi possível carregar ${titulo.toLowerCase()}.`);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarRegistros();
  }, [recurso]);

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function abrirFormulario() {
    setFormulario(formularioVazio);
    setRegistroEditando(null);
    setMensagem("");
    setErro("");
    setSearchParams({ acao: "cadastrar" });
  }

  function fecharFormulario() {
    setFormulario(formularioVazio);
    setRegistroEditando(null);
    setSearchParams({});
  }

  function prepararEdicao(registro) {
    setFormulario({
      nome: registro.nome ?? "",
      cpf: registro.cpf ?? "",
      email: registro.email ?? "",
      data_nascimento: registro.data_nascimento
        ? String(registro.data_nascimento).slice(0, 10)
        : "",
      telefone: registro.telefone ?? "",
      cidade: registro.cidade ?? "",
    });

    setRegistroEditando(registro[idField]);
    setMensagem("");
    setErro("");
    setSearchParams({ acao: "cadastrar" });
  }

  async function salvarRegistro(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      if (registroEditando !== null) {
        await alterarRecurso(recurso, registroEditando, formulario);
        setMensagem(`${rotulo} alterado com sucesso.`);
      } else {
        await cadastrarRecurso(recurso, formulario);
        setMensagem(`${rotulo} cadastrado com sucesso.`);
      }

      setFormulario(formularioVazio);
      setRegistroEditando(null);
      setSearchParams({});
      await carregarRegistros();
    } catch (erro) {
      setErro(erro.message || `Não foi possível salvar o registro de ${singular}.`);
    } finally {
      setSalvando(false);
    }
  }

  async function removerRegistro(id) {
    const confirmar = window.confirm(
      `Tem certeza de que deseja excluir este ${singular}? Essa ação não poderá ser desfeita.`
    );

    if (!confirmar) {
      return;
    }

    setErro("");
    setMensagem("");

    try {
      await excluirRecurso(recurso, id);
      setMensagem(`${rotulo} excluído com sucesso.`);
      await carregarRegistros();
    } catch (erro) {
      setErro(erro.message || `Não foi possível excluir o registro de ${singular}.`);
    }
  }

  const registrosFiltrados = registros.filter((registro) => {
    const valor = registro[campoFiltro];

    if (valor === null || valor === undefined) {
      return false;
    }

    return String(valor)
      .toLowerCase()
      .includes(textoFiltro.trim().toLowerCase());
  });

  return (
    <section className="pagina">
      <PageHeader
        titulo={titulo}
        descricao={`Consulte, cadastre, altere e exclua os registros de ${titulo.toLowerCase()}.`}
        acao={
          !mostrarFormulario ? (
            <button
              className="botao botao-principal"
              type="button"
              onClick={abrirFormulario}
            >
              Novo {singular}
            </button>
          ) : null
        }
      />

      {mensagem && (
        <p className="alerta alerta-sucesso" role="status">
          {mensagem}
        </p>
      )}

      {erro && (
        <p className="alerta alerta-erro" role="alert">
          {erro}
        </p>
      )}

      {mostrarFormulario && (
        <section className="cartao formulario">
          <div className="cartao-topo">
            <div>
              <h2>
                {registroEditando !== null
                  ? `Alterar ${singular}`
                  : `Novo ${singular}`}
              </h2>
              <p className="cartao-descricao">
                {registroEditando !== null
                  ? `Atualize os dados do ${singular} selecionado.`
                  : `Preencha os dados para cadastrar um novo ${singular}.`}
              </p>
            </div>

            <button
              className="botao botao-fantasma botao-pequeno"
              type="button"
              onClick={fecharFormulario}
            >
              Fechar
            </button>
          </div>

          <form onSubmit={salvarRegistro}>
            <div className="campos">
              <label>
                <span>Nome</span>
                <input
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  maxLength={100}
                  required
                />
              </label>

              <label>
                <span>CPF</span>
                <input
                  name="cpf"
                  value={formulario.cpf}
                  onChange={atualizarCampo}
                  maxLength={14}
                  required
                />
              </label>

              <label>
                <span>E-mail</span>
                <input
                  name="email"
                  type="email"
                  value={formulario.email}
                  onChange={atualizarCampo}
                  maxLength={150}
                  required
                />
              </label>

              <label>
                <span>Data de nascimento</span>
                <input
                  name="data_nascimento"
                  type="date"
                  value={formulario.data_nascimento}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                <span>Telefone</span>
                <input
                  name="telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  maxLength={20}
                  required
                />
              </label>

              <label>
                <span>Cidade</span>
                <input
                  name="cidade"
                  value={formulario.cidade}
                  onChange={atualizarCampo}
                  maxLength={50}
                  required
                />
              </label>
            </div>

            <div className="acoes-formulario">
              <button
                className="botao botao-principal"
                type="submit"
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : registroEditando !== null
                    ? "Salvar alterações"
                    : `Cadastrar ${singular}`}
              </button>

              <button
                className="botao botao-secundario"
                type="button"
                onClick={fecharFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="cartao">
        <div className="cartao-topo">
          <div>
            <h2>{titulo} cadastrados</h2>
            <p className="cartao-descricao">
              {carregando
                ? "Carregando registros..."
                : `Exibindo ${registrosFiltrados.length} de ${registros.length} registro(s).`}
            </p>
          </div>
        </div>

        <div className="filtros">
          <label className="campo-filtro">
            <span>Filtrar por</span>
            <select
              value={campoFiltro}
              onChange={(evento) => setCampoFiltro(evento.target.value)}
            >
              <option value={idField}>Código</option>
              <option value="nome">Nome</option>
              <option value="cpf">CPF</option>
              <option value="email">E-mail</option>
              <option value="data_nascimento">Data de nascimento</option>
              <option value="telefone">Telefone</option>
              <option value="cidade">Cidade</option>
            </select>
          </label>

          <label className="campo-filtro campo-busca">
            <span>Texto para buscar</span>
            <input
              type="text"
              value={textoFiltro}
              onChange={(evento) => setTextoFiltro(evento.target.value)}
              placeholder="Digite o que deseja encontrar"
            />
          </label>

          <button
            type="button"
            className="botao botao-secundario"
            onClick={() => setTextoFiltro((texto) => texto.trim())}
          >
            Filtrar
          </button>

          <button
            type="button"
            className="botao botao-fantasma"
            onClick={() => {
              setCampoFiltro("nome");
              setTextoFiltro("");
            }}
          >
            Limpar
          </button>
        </div>

        {carregando ? (
          <div className="estado-carregando">
            <span className="spinner" aria-hidden="true" />
            Carregando registros...
          </div>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>E-mail</th>
                  <th>Data de nascimento</th>
                  <th>Telefone</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {registrosFiltrados.map((registro) => (
                  <tr key={registro[idField]}>
                    <td>{registro[idField]}</td>
                    <td>{registro.nome}</td>
                    <td>{registro.cpf}</td>
                    <td>{registro.email}</td>
                    <td>{String(registro.data_nascimento).slice(0, 10)}</td>
                    <td>{registro.telefone}</td>
                    <td>{registro.cidade}</td>
                    <td>
                      <div className="acoes-tabela">
                        <button
                          type="button"
                          className="botao-acao botao-acao-editar"
                          onClick={() => prepararEdicao(registro)}
                        >
                          Alterar
                        </button>

                        <button
                          type="button"
                          className="botao-acao botao-acao-excluir"
                          onClick={() => removerRegistro(registro[idField])}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {registrosFiltrados.length === 0 && (
                  <tr>
                    <td className="tabela-vazia" colSpan="8">
                      {registros.length === 0
                        ? `Nenhum registro de ${singular} cadastrado.`
                        : "Nenhum registro encontrado para esse filtro."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}

export default PessoaPage;
