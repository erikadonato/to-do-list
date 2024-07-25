# To-Do List API

Uma API simples para gerenciar uma lista de tarefas usando Node.js, Express, TypeORM e SQLite.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/erikadonato/to-do-list
   cd to-do-list-api

2. Instale as dependências
   ```bash
   $ yarn install

## Configuração

A configuração do banco de dados está no arquivo src/database/database.js. A API utiliza SQLite como banco de dados.


## Execução

- Para iniciar o servidor:

   ```bash
   $ yarn start

O servidor estará rodando em http://localhost:3000.

## Endpoints

# Adicionar uma nova atividade
- URL: /activity/save
    Método: POST
    Body:
    json
    {
        "title": "Test",
        "subtitle": "Test subtitle",
        "pending": true
    }

# Buscar uma atividade por ID
- URL: /activity/search
    Método: GET
    Query Params: id (number)
    Atualizar uma atividade
    URL: /activity/update
    Método: PATCH
    Body:
    json
    {
        "id": 1,
        "title": "Updated",
        "subtitle": "Updated subtitle",
        "pending": false
    }

# Deletar uma atividade
- URL: /activity/delete
    Método: DELETE
    Query Params: id (number)

## Testes

- Para executar os testes:
    ```bash
   $ yarn teste

## Documentação JSDoc

- Para gerar a documentação JSDoc:
    ```bash
   $ yarn docs
