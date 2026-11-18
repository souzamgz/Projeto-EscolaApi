import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
        setMensagem(`${rotulo} alterado com sucesso!`);
      } else {
        await cadastrarRecurso(recurso, formulario);
        setMensagem(`${rotulo} cadastrado com sucesso!`);
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
      setMensagem(`${rotulo} excluído com sucesso!`);
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
    <main className="pagina">
      <div className="topo-pagina">
        <div>
          <h1>{titulo}</h1>
          <p>
            Consulte os registros de {titulo.toLowerCase()} ou realize um novo
            cadastro.
          </p>
        </div>

        <Link className="botao botao-secundario" to="/">
          Voltar ao início
        </Link>
      </div>

      {!mostrarFormulario && (
        <button className="botao botao-principal" onClick={abrirFormulario}>
          Cadastrar {singular}
        </button>
      )}

      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}

      {mostrarFormulario && (
        <section className="formulario">
          <h2>
            {registroEditando !== null
              ? `Alterar ${singular}`
              : `Novo ${singular}`}
          </h2>

          <form onSubmit={salvarRegistro}>
            <div className="campos">
              <label>
                Nome
                <input
                  name="nome"
                  value={formulario.nome}
                  onChange={atualizarCampo}
                  maxLength={100}
                  required
                />
              </label>

              <label>
                CPF
                <input
                  name="cpf"
                  value={formulario.cpf}
                  onChange={atualizarCampo}
                  maxLength={14}
                  required
                />
              </label>

              <label>
                E-mail
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
                Data de nascimento
                <input
                  name="data_nascimento"
                  type="date"
                  value={formulario.data_nascimento}
                  onChange={atualizarCampo}
                  required
                />
              </label>

              <label>
                Telefone
                <input
                  name="telefone"
                  value={formulario.telefone}
                  onChange={atualizarCampo}
                  maxLength={20}
                  required
                />
              </label>

              <label>
                Cidade
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
                className="botao botao-cancelar"
                type="button"
                onClick={fecharFormulario}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="filtros">
        <label>
          Filtrar por
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

        <label>
          Texto para buscar
          <input
            type="text"
            value={textoFiltro}
            onChange={(evento) => setTextoFiltro(evento.target.value)}
            placeholder="Digite o que deseja encontrar"
          />
        </label>

        <button
          type="button"
          className="botao botao-principal"
          onClick={() => setTextoFiltro((texto) => texto.trim())}
        >
          Filtrar
        </button>

        <button
          type="button"
          className="botao botao-secundario"
          onClick={() => {
            setCampoFiltro("nome");
            setTextoFiltro("");
          }}
        >
          Limpar
        </button>
      </section>

      <h2>{titulo} cadastrados</h2>

      {carregando ? (
        <p>Carregando registros...</p>
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
                  <td className="acoes-tabela">
                    <button
                      type="button"
                      className="botao botao-editar"
                      onClick={() => prepararEdicao(registro)}
                    >
                      Alterar
                    </button>

                    <button
                      type="button"
                      className="botao botao-excluir"
                      onClick={() => removerRegistro(registro[idField])}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {registrosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="8">
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
    </main>
  );
}

export default PessoaPage;
