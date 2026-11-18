import { Link } from "react-router-dom";

function Professores() {
  return (
    <main className="pagina">
      <Link to="/">← Voltar ao início</Link>
      <h1>Professores</h1>
      <p>Atividade: implementar a listagem de professores.</p>
    </main>
  );
}

export default Professores;
