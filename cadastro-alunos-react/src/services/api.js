const API_URL = "http://127.0.0.1:8000";

export async function listarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar os alunos.");
  }

  return resposta.json();
}

export async function cadastrarAluno(aluno) {
  const resposta = await fetch(`${API_URL}/alunos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      typeof dados.detail === "string"
        ? dados.detail
        : "Não foi possível cadastrar o aluno. Confira os dados informados."
    );
  }

  return dados;
}

export async function alterarAluno(codAluno, aluno) {
  const resposta = await fetch(`${API_URL}/alunos/${codAluno}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      typeof dados.detail === "string"
        ? dados.detail
        : "Não foi possível alterar o aluno."
    );
  }

  return dados;
}
