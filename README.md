# Projeto_Dispositivos_Moveis

## Backend - Sistema de Controle de Estoque

API desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL**, com funcionalidades de gerenciamento de produtos e movimentações de estoque.

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger

## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env` com a conexão do PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/estoque?schema=public"
```

3. Inicie o banco de dados:

```bash
docker compose up -d
```

4. Execute as migrations:

```bash
npx prisma migrate dev
```

5. Gere o Prisma Client:

```bash
npx prisma generate
```

6. Inicie a aplicação:

```bash
npm run start:dev
```

A API estará disponível em:

`http://localhost:3000`

## Documentação da API

A documentação Swagger está disponível em:

`http://localhost:3000/api`

## Funcionalidades

### Produtos

- Listar produtos com suas categorias.
- Consultar produto por ID.
- Cadastrar produtos.
- Excluir produtos.
- Validar os dados enviados.
- Impedir a exclusão de produtos que possuem movimentações.

### Movimentações

- Listar movimentações, das mais recentes para as mais antigas.
- Registrar entradas de estoque.
- Registrar saídas de estoque.
- Atualizar automaticamente a quantidade do produto.
- Impedir saídas com quantidade superior ao estoque disponível.
- Realizar a atualização do estoque e o registro da movimentação em uma transação.

## Evidências dos testes

Adicione abaixo as capturas de tela dos testes realizados no Swagger ou nas requisições HTTP.

### Produtos

**GET /produtos**

<!-- Inserir print da listagem de produtos -->

**GET /produtos/:id**

<!-- Inserir print da consulta por ID -->

**POST /produtos**

<!-- Inserir print do cadastro -->

**DELETE /produtos/:id**

<!-- Inserir print da exclusão -->

**Erro de validação ou produto não encontrado**

<!-- Inserir print do erro -->

### Movimentações

**GET /movimentacoes**

<!-- Inserir print da listagem de movimentações -->

**POST /movimentacoes - ENTRADA**

<!-- Inserir print da entrada -->

**POST /movimentacoes - SAIDA**

<!-- Inserir print da saída -->

**Erro de estoque insuficiente**

<!-- Inserir print do erro 400 -->

## Observações

O projeto utiliza validação de dados por meio de DTOs e class-validator. As movimentações são realizadas com transações do Prisma para garantir a consistência das informações do estoque.