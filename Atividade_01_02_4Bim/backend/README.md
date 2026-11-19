<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# API de Controle de Estoque

## Descrição dos módulos

- **Produtos:** listagem alfabeticamente, consulta por ID, cadastro com categoria e remoção segura.
- **Movimentações:** listagem pela data mais recente, registro de entrada ou saída e atualização transacional do estoque.
- Não há implementação de autenticação, usuários, categorias ou interface neste backend.

## Tecnologias

- NestJS 11 e TypeScript
- Prisma ORM 6
- PostgreSQL 16
- Swagger / OpenAPI
- class-validator e class-transformer
- Docker Compose

## Executando o projeto

Na pasta `backend`, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` (não o envie ao repositório) com:

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/estoque?schema=public"
PORT=3000
```

Na pasta da atividade, inicie o PostgreSQL:

```bash
docker compose up -d
```

Execute as migrations existentes e o seed:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

Para desenvolvimento, a API fica em `http://localhost:3000` e a documentação Swagger em `http://localhost:3000/api`.

## Exemplos de requisições

### Produtos

Listar produtos:

```http
GET /produtos
```

Consultar produto:

```http
GET /produtos/1
```

Cadastrar produto:

```http
POST /produtos
Content-Type: application/json

{
  "nome": "Arroz 5kg",
  "preco": 28.90,
  "quantidade": 10,
  "categoriaId": 1
}
```

Remover produto:

```http
DELETE /produtos/1
```

### Movimentações

Listar movimentações:

```http
GET /movimentacoes
```

Registrar entrada:

```http
POST /movimentacoes
Content-Type: application/json

{
  "produtoId": 1,
  "tipo": "ENTRADA",
  "quantidade": 5
}
```

Registrar saída:

```http
POST /movimentacoes
Content-Type: application/json

{
  "produtoId": 1,
  "tipo": "SAIDA",
  "quantidade": 3
}
```

## Prints para entrega

Insira aqui somente prints reais de execução.

### Produtos

- [ ] Print — `GET /produtos`
- [ ] Print — `GET /produtos/:id`
- [ ] Print — `POST /produtos`
- [ ] Print — `DELETE /produtos/:id`
- [ ] Print — Erro 400 de ID inválido em produtos
- [ ] Print — Erro 404 de produto inexistente
- [ ] Print — Erro 404 de categoria inexistente
- [ ] Print — Erro 409 de produto com movimentações

### Movimentações

- [ ] Print — `GET /movimentacoes`
- [ ] Print — `POST /movimentacoes` com entrada
- [ ] Print — `POST /movimentacoes` com saída
- [ ] Print — Erro 404 de produto inexistente
- [ ] Print — Erro 400 de estoque insuficiente
- [ ] Print — Erro 400 de dados inválidos ou campos extras

### Swagger

- [ ] Print — Interface Swagger em `/api`
````
