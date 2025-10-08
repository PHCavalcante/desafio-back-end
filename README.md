## Desafio Estágio - Backend (Node + Express + Prisma + PostgreSQL)

API REST simples com usuários e tarefas, usando Express, Prisma e PostgreSQL. Inclui testes de integração com Vitest/Supertest.

### Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+
- PostgreSQL acessível (local ou remoto)

### Configuração do ambiente
1) Crie o arquivo `.env` na raiz do projeto com sua conexão do Postgres:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
```

2) Instale as dependências:
```bash
npm install
```

3) Execute as migrações e gere o client do Prisma:
```bash
npm run migrate
# opcional: prisma generate é executado automaticamente nas migrações
# npx prisma generate
```

Observações Prisma:
- O client gerado fica em `generated/prisma` (ver `prisma/schema.prisma`).
- O datasource usa `provider = "postgresql"` e lê `DATABASE_URL` do `.env`.

### Executando o servidor
Desenvolvimento (com reload):
```bash
npm run dev
```

Por padrão a API sobe em `http://localhost:3000`.

Healthcheck rápido:
```bash
curl http://localhost:3000/ping
# esperado: "pong!"
```

### Testes
Rodar a suíte:
```bash
npm test
```

Assistido:
```bash
npm run test:watch
```

Cobertura:
```bash
npm run test:cov
```

Notas sobre testes:
- Os testes de integração usam `supertest` no `app` (sem dar listen).
- O acesso ao banco via Prisma é mockado nos testes, então não é necessário Postgres para rodar os testes.

### Estrutura do projeto
```
src/
  app.ts               # configura o Express e aplica rotas
  index.ts             # bootstrap do servidor (listen)
  libs/prisma.ts       # singleton do Prisma Client
  routes/routes.ts     # definição de rotas
  controllers/         # controllers HTTP (users/tasks)
  useCases/            # regras de negócio (users/tasks)
  validators/          # schemas Zod de entrada
prisma/
  schema.prisma        # schema de modelos (User, Task)
test/
  *.integration.test.ts# testes de integração com mocks do Prisma
  mocks/prisma.ts      # mock do Prisma
```

### Endpoints
Base URL: `http://localhost:3000`

- `GET /ping` → 200 "pong!"

Usuários
- `POST /users` → cria usuário
- `GET /users` → lista usuários
- `GET /users/:id` → busca por id
- `PUT /users/:id` → atualiza usuário
- `DELETE /users/:id` → remove usuário

Tarefas
- `POST /tasks` → cria tarefa
- `GET /tasks` → lista tarefas
- `GET /tasks/:id` → busca por id
- `PUT /tasks/:id` → atualiza tarefa
- `DELETE /tasks/:id` → remove tarefa

### Validações (Zod)
- Users `POST/PUT` usam `name` (string) e `email` (email válido).
- Tasks `POST` exige `title`, `description`, `userId` (UUID). `status` default `pending`.

### Dicas comuns de troubleshooting
- "Cannot GET /ping": verifique se o servidor está rodando (porta 3000) e se o `app` aplica `routes` em `src/app.ts`.
- Erros do Prisma ao subir: confirme `DATABASE_URL` no `.env` e rode `npm run migrate`.
- Testes falhando por `describe is not defined`: execute via `npm test` (Vitest com `globals: true` em `vitest.config.ts`).

### Scripts úteis (package.json)
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "migrate": "prisma migrate dev",
    "migrate:deploy": "prisma migrate deploy",
    "postinstall": "prisma generate",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:cov": "vitest run --coverage"
  }
}
```
