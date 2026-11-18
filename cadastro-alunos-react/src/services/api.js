const API_URL = "http://127.0.0.1:8000";

async function lerResposta(resposta, mensagemPadrao) {
  let dados = null;

  try {
    dados = await resposta.json();
  } catch {
    dados = null;
  }

  if (!resposta.ok) {
    throw new Error(
      dados && typeof dados.detail === "string" ? dados.detail : mensagemPadrao
    );
  }

  return dados;
}

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

  return lerResposta(
    resposta,
    "Não foi possível cadastrar o aluno. Confira os dados informados."
  );
}

export async function alterarAluno(codAluno, aluno) {
  const resposta = await fetch(`${API_URL}/alunos/${codAluno}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  return lerResposta(resposta, "Não foi possível alterar o aluno.");
}

export async function excluirAluno(codAluno) {
  const resposta = await fetch(`${API_URL}/alunos/${codAluno}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    let mensagem = "Não foi possível excluir o aluno.";

    try {
      const dados = await resposta.json();

      if (typeof dados.detail === "string") {
        mensagem = dados.detail;
      }
    } catch {
      // A API pode responder sem um corpo JSON.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}

export async function listarRecurso(recurso) {
  const resposta = await fetch(`${API_URL}/${recurso}`);

  if (!resposta.ok) {
    throw new Error(`Não foi possível listar os registros de ${recurso}.`);
  }

  return resposta.json();
}

export async function cadastrarRecurso(recurso, dados) {
  const resposta = await fetch(`${API_URL}/${recurso}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return lerResposta(
    resposta,
    "Não foi possível cadastrar o registro. Confira os dados informados."
  );
}

export async function alterarRecurso(recurso, id, dados) {
  const resposta = await fetch(`${API_URL}/${recurso}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return lerResposta(resposta, "Não foi possível alterar o registro.");
}

export async function excluirRecurso(recurso, id) {
  const resposta = await fetch(`${API_URL}/${recurso}/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    let mensagem = "Não foi possível excluir o registro.";

    try {
      const dados = await resposta.json();

      if (typeof dados.detail === "string") {
        mensagem = dados.detail;
      }
    } catch {
      // A API pode responder sem um corpo JSON.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return;
  }

  return resposta.json();
}
