const API_URL = "http://127.0.0.1:8000";

export async function listarAlunos() {
  const resposta = await fetch(`${API_URL}/alunos`);

  if (!resposta.ok) {
    throw new Error("Não foi possível listar os alunos.");
  }

  return resposta.json();
}
