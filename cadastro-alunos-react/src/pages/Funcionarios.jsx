import PessoaPage from "./PessoaPage";

function Funcionarios() {
  return (
    <PessoaPage
      recurso="funcionarios"
      titulo="Funcionários"
      singular="funcionário"
      rotulo="Funcionário"
      idField="codFunc"
    />
  );
}

export default Funcionarios;
