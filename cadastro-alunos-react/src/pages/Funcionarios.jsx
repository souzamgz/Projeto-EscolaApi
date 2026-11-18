import { Link } from "react-router-dom";

function Funcionarios() {
  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Funcionários</h1>
      <p>Atividade: implementar a listagem de funcionários.</p>
    </main>
  );
}

export default Funcionarios;
