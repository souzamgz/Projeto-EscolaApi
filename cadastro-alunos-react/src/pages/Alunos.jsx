import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarAlunos } from "../services/api";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarAlunos() {
      try {
        const dados = await listarAlunos();
        setAlunos(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarAlunos();
  }, []);

  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Alunos cadastrados</h1>

      {carregando && <p>Carregando alunos...</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}

      {!carregando && !erro && (
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
                <th>RA</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.codAluno}>
                  <td>{aluno.codAluno}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.cpf}</td>
                  <td>{aluno.email}</td>
                  <td>{String(aluno.data_nascimento).slice(0, 10)}</td>
                  <td>{aluno.telefone}</td>
                  <td>{aluno.ra}</td>
                  <td>{aluno.cidade}</td>
                </tr>
              ))}

              {alunos.length === 0 && (
                <tr>
                  <td colSpan="8">Nenhum aluno cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Alunos;
