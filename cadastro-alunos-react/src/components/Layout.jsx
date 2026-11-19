import { Link, NavLink, Outlet } from "react-router-dom";

function classeMenu({ isActive }) {
  return isActive ? "ativo" : undefined;
}

function Layout() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="container topbar-conteudo">
          <Link className="marca" to="/">
            <span className="marca-icone">GE</span>
            <span className="marca-texto">
              <strong>Gestão Escolar</strong>
              <small>FastAPI + React</small>
            </span>
          </Link>

          <nav className="menu" aria-label="Navegação principal">
            <NavLink to="/" end className={classeMenu}>
              Início
            </NavLink>
            <NavLink to="/alunos" className={classeMenu}>
              Alunos
            </NavLink>
            <NavLink to="/professores" className={classeMenu}>
              Professores
            </NavLink>
            <NavLink to="/funcionarios" className={classeMenu}>
              Funcionários
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container conteudo">
        <Outlet />
      </main>

      <footer className="rodape">
        <div className="container rodape-conteudo">
          <span>Sistema de Gestão Escolar</span>
          <span>Python · FastAPI · MySQL · React</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
