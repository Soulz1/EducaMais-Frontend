# EducaMais-Frontend

Repositório oficial do front-end do projeto EducaMais, uma plataforma colaborativa de educação voltada para a troca de conhecimentos entre docentes e alunos, construída com Next.js (App Router), integração com Better Auth e consumo da API do backend via Axios.

[Acesse o Repositório do Backend](https://github.com/fiap-time-4/EducaMais-Backend)

## Arquitetura

- Páginas (App Router): rotas em `src/app` com server/client components.
- Componentes (UI): ShadCN UI + Tailwind.
- Serviços: consumo de API (Axios) e autenticação (Better Auth).
- Estilos: Tailwind CSS e fontes.
- Docker: desenvolvimento e produção.

## Tecnologias:
- Next.js 14 + TypeScript
- Tailwind CSS + ShadCN UI
- Axios
- Better Auth
- Docker

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/en)
- [Docker Desktop](https://www.docker.com/) (opcional)
- [Git](https://git-scm.com/)

## Configuração de Ambiente

Crie `.env` baseado em `.env.example`:
- `NEXT_PUBLIC_API_URL=http://localhost:3333`

Para cookies com credenciais, o backend deve configurar CORS com `origin` explícito e `credentials: true`.

## Instalação e Execução

- Desenvolvimento: 
```bash
npm install
``` 
Baixa e instala todas as bibliotecas e dependências listadas no projeto, criando a pasta node_modules.

```bash
npm run dev (http://localhost:3000)
```
Inicia o servidor de desenvolvimento com Fast Refresh. O projeto fica disponível em http://localhost:3000 e as alterações no código são refletidas em tempo real.

- Build: 
```bash
npm run build
```
Compila e otimiza o código para produção, gerando uma versão de alta performance na pasta .next.

- Produção local:
```bash
npm start
```
Inicia o servidor de produção utilizando os arquivos gerados pelo comando de build (ideal para testar o comportamento final antes do deploy).

## Docker

- Dev (hot reload):
```bash
docker compose -f docker-compose.local.yml up --build -d
```
Sobe o container de desenvolvimento utilizando um arquivo de configuração específico (local.yml) que permite ver as alterações de código sem precisar reiniciar o container.

- Produção : 
```bash
docker compose up --build -d
```
Cria a imagem otimizada de produção e sobe o serviço em modo detached (segundo plano), simulando o ambiente real de deploy.

## Integração com Backend

Endpoints:
- GET `/posts?page=&limit=`
- GET `/posts/:id`
- POST `/posts` (autenticado)
- PUT `/posts/:id` (autenticado)
- DELETE `/posts/:id` (autenticado)

Tipos:
- `Author.id`: string
- `Post.autorId`: string

## Estrutura

- `src/app`: páginas, layouts e estilos globais
- `src/app/components`: UI e formulários
- `src/app/services`: `apiClient`, `authClient`, `postService`
- `public`: assets
- `.github/workflows/deploy.yml`: pipeline de deploy

## CORS e Cookies

- Backend: `origin` explícito (ex.: `http://localhost:3000`) e `credentials: true`
- Frontend: Axios com `withCredentials: true`
- Better Auth: `trustedOrigins` configurados no backend

## Deploy

Workflow usa `appleboy/ssh-action`:
- Secrets: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `SERVER_PATH`, `ENV_PROD_B64`
- Faz pull, grava `.env` e sobe containers via `docker compose`.

## Scripts

- `npm run dev`, `npm run build`, `npm start`
- `docker compose -f docker-compose.local.yml up --build -d`
- `docker compose up --build -d`
