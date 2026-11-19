import { Link } from "react-router-dom";

const modulos = [
  {
    tipo: "alunos",
    titulo: "Alunos",
    descricao:
      "Consulte a lista de alunos, cadastre novos registros, altere dados e exclua cadastros.",
    rota: "/alunos",
    cadastro: "/alunos?acao=cadastrar",
    textoCadastro: "Cadastrar aluno",
  },
  {
    tipo: "professores",
    titulo: "Professores",
    descricao:
      "Gerencie os professores da escola com as mesmas operações de cadastro e consulta.",
    rota: "/professores",
    cadastro: "/professores?acao=cadastrar",
    textoCadastro: "Cadastrar professor",
  },
  {
    tipo: "funcionarios",
    titulo: "Funcionários",
    descricao:
      "Mantenha os dados dos funcionários organizados e sempre disponíveis para consulta.",
    rota: "/funcionarios",
    cadastro: "/funcionarios?acao=cadastrar",
    textoCadastro: "Cadastrar funcionário",
  },
];

function IconeModulo({ tipo }) {
  if (tipo === "alunos") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </svg>
    );
  }

  if (tipo === "professores") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

function Home() {
  return (
    <div className="pagina home">
      <section className="hero">
        <div className="hero-conteudo">
          <span className="selo">Sistema de Gestão Escolar</span>
          <h1>Organize a rotina escolar em uma única aplicação.</h1>
          <p>
            Cadastre, consulte, filtre, altere e exclua alunos, professores e
            funcionários com uma API FastAPI e uma interface React simples e
            rápida.
          </p>

          <div className="hero-acoes">
            <Link className="botao botao-principal" to="/alunos">
              Explorar alunos
            </Link>
            <Link className="botao botao-fantasma" to="/alunos?acao=cadastrar">
              Cadastrar aluno
            </Link>
          </div>
        </div>

        <div className="hero-painel" aria-hidden="true">
          <div className="painel-topo">
            <span />
            <span />
            <span />
          </div>

          <div className="painel-linha">
            <span className="avatar">A</span>
            <div>
              <strong>Alunos</strong>
              <small>Cadastro completo</small>
            </div>
            <span className="tag">CRUD</span>
          </div>

          <div className="painel-linha">
            <span className="avatar">P</span>
            <div>
              <strong>Professores</strong>
              <small>Consulta e edição</small>
            </div>
            <span className="tag">CRUD</span>
          </div>

          <div className="painel-linha">
            <span className="avatar">F</span>
            <div>
              <strong>Funcionários</strong>
              <small>Dados organizados</small>
            </div>
            <span className="tag">CRUD</span>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="secao-topo">
          <h2>Módulos do sistema</h2>
          <p>Escolha um módulo para consultar ou cadastrar registros.</p>
        </div>

        <div className="cards">
          {modulos.map((modulo) => (
            <article className="card" key={modulo.titulo}>
              <div className="card-icone">
                <IconeModulo tipo={modulo.tipo} />
              </div>
              <h3>{modulo.titulo}</h3>
              <p>{modulo.descricao}</p>
              <div className="card-acoes">
                <Link className="botao botao-principal" to={modulo.rota}>
                  Ver {modulo.titulo.toLowerCase()}
                </Link>
                <Link className="botao botao-secundario" to={modulo.cadastro}>
                  {modulo.textoCadastro}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="secao-topo">
          <h2>Como o sistema funciona</h2>
          <p>As tecnologias trabalham juntas em camadas bem definidas.</p>
        </div>

        <div className="recursos">
          <div className="recurso">
            <strong>React</strong>
            <span>Interface, formulários e tabelas</span>
          </div>
          <div className="recurso">
            <strong>FastAPI</strong>
            <span>Rotas, validação e regras do backend</span>
          </div>
          <div className="recurso">
            <strong>MySQL</strong>
            <span>Persistência dos dados da escola</span>
          </div>
          <div className="recurso">
            <strong>HTTP + JSON</strong>
            <span>Comunicação entre frontend e API</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
