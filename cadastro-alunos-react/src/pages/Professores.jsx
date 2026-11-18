import PessoaPage from "./PessoaPage";

function Professores() {
  return (
    <PessoaPage
      recurso="professores"
      titulo="Professores"
      singular="professor"
      rotulo="Professor"
      idField="codProf"
    />
  );
}

export default Professores;
