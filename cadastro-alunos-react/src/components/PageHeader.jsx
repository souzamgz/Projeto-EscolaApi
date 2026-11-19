import { Link } from "react-router-dom";

function PageHeader({ titulo, descricao, acao, voltarPara = "/" }) {
  return (
    <div className="page-header">
      <div>
        <Link className="voltar" to={voltarPara}>
          ← Voltar ao início
        </Link>
        <h1>{titulo}</h1>
        <p>{descricao}</p>
      </div>

      {acao && <div className="page-header-acao">{acao}</div>}
    </div>
  );
}

export default PageHeader;
