# Sistema de Gestão Escolar — FastAPI + MySQL + React

Projeto desenvolvido acompanhando o livro **“Livro Prático de Desenvolvimento de APIs REST com Python e FastAPI”** (repositório do professor `pedroAmalfi/livro-api-python-fastapi`).

A aplicação é um CRUD de alunos, professores e funcionários, com API em FastAPI, banco MySQL/MariaDB e duas interfaces: uma em HTML/CSS/JavaScript (capítulos 01–05) e outra em React (capítulos 07–12).

---

## Estrutura do projeto

```text
escola-api/
├── cadastro-alunos/              # Backend FastAPI + frontend HTML/JS
│   ├── backend/
│   │   ├── main.py               # Rotas da API
│   │   ├── schemas.py            # Modelos Pydantic
│   │   └── database.py           # Conexão com o banco
│   ├── frontend/                 # Telas em HTML/CSS/JS
│   ├── fatec.sql                 # Script do banco de dados
│   ├── requirements.txt
│   └── .env                      # Configuração local (não versionado)
├── cadastro-alunos-react/        # Frontend React (Vite)
│   ├── src/
│   │   ├── components/           # Layout e cabeçalho das páginas
│   │   ├── pages/                # Home, Alunos, Professores, Funcionários e 404
│   │   ├── services/api.js       # Comunicação com o FastAPI
│   │   ├── App.jsx               # Rotas
│   │   └── App.css
│   └── package.json
└── setup-db.sql                  # Cria o banco e o usuário da aplicação
```

---

## Tecnologias

- Python 3 + FastAPI + Uvicorn
- Pydantic e `email-validator`
- MySQL / MariaDB (`mysql-connector-python`)
- SQLAlchemy? Não — o projeto do livro usa `mysql-connector` diretamente
- `python-dotenv`
- Node.js + Vite + React + React Router

---

## Pré-requisitos

- Python 3.10 ou superior
- Node.js 20 ou superior (com npm)
- MySQL 8 ou MariaDB 10.4 ou superior

No Arch/CachyOS:

```bash
sudo pacman -S --needed mariadb mariadb-clients nodejs npm
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable --now mariadb
```

No Windows, utilize o XAMPP/MySQL e o instalador LTS do Node.js.

---

## 1. Configurar o banco de dados

```bash
# cria o banco `fatec`, o usuário `escola` e as permissões
sudo mariadb < setup-db.sql

# importa as tabelas e os dados de exemplo
sudo mariadb fatec < cadastro-alunos/fatec.sql
```

> O arquivo `setup-db.sql` usa a senha de exemplo `escola123`. Em um ambiente real, troque essa senha.

---

## 2. Configurar o backend

Crie o arquivo `cadastro-alunos/.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=fatec
DB_USER=escola
DB_PASSWORD=escola123
```

Crie o ambiente virtual e instale as dependências:

```bash
cd cadastro-alunos
python -m venv .venv

# Linux/macOS
source .venv/bin/activate
# Windows (PowerShell)
# .venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

---

## 3. Executar a API

```bash
cd cadastro-alunos
source .venv/bin/activate
python -m uvicorn backend.main:app --reload
```

- API: <http://127.0.0.1:8000>
- Frontend HTML/JS: <http://127.0.0.1:8000>
- Documentação Swagger: <http://127.0.0.1:8000/docs>

---

## 4. Executar o frontend React

Em outro terminal:

```bash
cd cadastro-alunos-react
npm install
npm run dev
```

Acesse <http://localhost:5173>.

> O backend precisa estar rodando e o CORS já está configurado para as origens `http://localhost:5173` e `http://127.0.0.1:5173`.

---

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/alunos` | Lista os alunos |
| POST | `/alunos` | Cadastra um aluno |
| PUT | `/alunos/{codAluno}` | Altera um aluno |
| DELETE | `/alunos/{codAluno}` | Exclui um aluno |
| GET | `/professores` | Lista os professores |
| POST | `/professores` | Cadastra um professor |
| PUT | `/professores/{codProf}` | Altera um professor |
| DELETE | `/professores/{codProf}` | Exclui um professor |
| GET | `/funcionarios` | Lista os funcionários |
| POST | `/funcionarios` | Cadastra um funcionário |
| PUT | `/funcionarios/{codFunc}` | Altera um funcionário |
| DELETE | `/funcionarios/{codFunc}` | Exclui um funcionário |

---

## Etapas do livro

| Capítulo | Implementação |
|---|---|
| 00 | Ambiente, dependências, `.env` e script do banco |
| 01 | Cadastro de alunos (API + frontend) |
| 02 | Listagem de alunos |
| 03 | Filtro de alunos |
| 04 | Alteração de alunos |
| 05 | Exclusão de alunos |
| 06 | Projeto React com Vite + teste de `useState` |
| 07 | Integração React + FastAPI, rotas e listagem |
| 08 | Cadastro de alunos no React |
| 09 | Filtro de alunos no React |
| 10 | Alteração de alunos no React |
| 11 | Exclusão de alunos no React |
| 12 | Revisão final, README e CRUD de professores/funcionários (exercício) |

O histórico do Git foi organizado por funcionalidade, agrupando as etapas acima em commits como `feat: cadastro de alunos`, `feat: filtro de alunos no React`, `feat: CRUD de professores e funcionários no React` e `style: aprimora interface e remove comentários`.

---

## Testes rápidos com `curl`

```bash
# listar
curl http://127.0.0.1:8000/alunos

# cadastrar
curl -X POST http://127.0.0.1:8000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Aluno Teste","cpf":"123","email":"aluno@escola.com","data_nascimento":"2005-05-10","telefone":"19999999999","ra":"123456","cidade":"Mogi Mirim"}'

# alterar (troque 1 pelo código retornado)
curl -X PUT http://127.0.0.1:8000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Aluno Alterado","cpf":"123","email":"aluno@escola.com","data_nascimento":"2005-05-10","telefone":"19999999999","ra":"123456","cidade":"Mogi Mirim"}'

# excluir
curl -X DELETE http://127.0.0.1:8000/alunos/1
```

---

## Observações

- O arquivo `.env` não é versionado (está no `.gitignore`).
- As credenciais em `setup-db.sql` e `.env` são apenas para desenvolvimento.
- O frontend HTML/JS usa caminhos relativos (`/alunos`), por isso deve ser acessado pelo próprio FastAPI em `http://127.0.0.1:8000`.
- O frontend React consome a API em `http://127.0.0.1:8000`.
