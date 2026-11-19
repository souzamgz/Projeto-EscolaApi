import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <div className="nao-encontrado">
      <h1>404</h1>
      <p>A página que você procura não existe.</p>
      <Link className="botao botao-principal" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}

export default NaoEncontrado;
