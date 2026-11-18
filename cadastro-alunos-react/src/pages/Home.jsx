import { Link } from "react-router-dom";

function Home() {
  const modulos = [
    {
      titulo: "Alunos",
      descricao: "Consulte os alunos cadastrados.",
      rota: "/alunos",
      icone: "🎓",
    },
    {
      titulo: "Professores",
      descricao: "Consulte os professores cadastrados.",
      rota: "/professores",
      icone: "👨‍🏫",
    },
    {
      titulo: "Funcionários",
      descricao: "Consulte os funcionários cadastrados.",
      rota: "/funcionarios",
      icone: "👔",
    },
  ];

  return (
    <main className="home">
      <h1>Sistema de Gestão Escolar</h1>
      <p className="subtitulo">
        Gerencie alunos, professores e funcionários de forma simples e organizada.
      </p>

      <section className="cards">
        {modulos.map((modulo) => (
          <article className="card" key={modulo.titulo}>
            <div className="icone">{modulo.icone}</div>
            <h2>{modulo.titulo}</h2>
            <p>{modulo.descricao}</p>
            <Link className="botao botao-principal" to={modulo.rota}>
              Ver {modulo.titulo.toLowerCase()}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;
