
# Projeto Final de Back-End - API E-commerce (Geração Tech)

## 📖 Sobre o Projeto

Este repositório contém o código-fonte do projeto final de back-end desenvolvido para o curso de Desenvolvimento Web Full Stack da **Digital College**. O objetivo foi construir uma API RESTful robusta para um sistema de e-commerce simples, aplicando as melhores práticas de desenvolvimento, segurança e estrutura de código.

A API permite o gerenciamento de usuários, categorias e produtos, com um sistema de autenticação baseado em JSON Web Tokens (JWT) para proteger rotas sensíveis.

-----

## 🧩 Funcionalidades

  - **Autenticação de Usuários**: Sistema de registro e login com senhas criptografadas.
  - **Autorização com JWT**: Geração de token de acesso no login para proteger rotas de modificação de dados.
  - **CRUD de Categorias**: Funcionalidades completas para Criar, Ler, Atualizar e Deletar categorias de produtos.
  - **CRUD de Produtos**: Funcionalidades completas para Criar, Ler, Atualizar e Deletar produtos, com associação a uma categoria.
  - **Estrutura MVC**: Código organizado seguindo o padrão Model-View-Controller para separação de responsabilidades.
  - **Migrations com Sequelize**: Controle de versionamento do banco de dados de forma segura e organizada.

-----

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

  - **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no lado do servidor.
  - **[Express.js](https://expressjs.com/)**: Framework para construção de APIs e gerenciamento de rotas.
  - **[Dotenv](https://www.npmjs.com/package/dotenv)**: Para gerenciamento de variáveis de ambiente de forma segura.
  - **[Nodemon](https://www.npmjs.com/package/nodemon)**: Para reiniciar o servidor automaticamente durante o desenvolvimento.
  - **[MySQL](https://www.mysql.com/)**: Banco de dados relacional para persistência dos dados.
  - **[Sequelize](https://sequelize.org/)**: ORM (Object-Relational Mapper) para interagir com o banco de dados de forma produtiva e segura.
  - **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Para implementação da autenticação e autorização via tokens JWT.
  - **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Para criptografia segura de senhas de usuários.

-----

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

  - [Node.js](https://nodejs.org/) (versão 14 ou superior)
  - [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
  - Um servidor de banco de dados rodando localmente.

### Passos de Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/RafaelHFSousa/back_end_geracaotech.git
    cd nome-do-seu-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**

      - Acesse seu cliente MySQL.
      - Crie um novo banco de dados para o projeto. Ex: `CREATE DATABASE ecommerce_api;`

4.  **Configure as Variáveis de Ambiente:**

      - Abra o arquivo `.env` e preencha com suas credenciais do banco de dados e um segredo para o JWT.

    <!-- end list -->

    ```env
    # .env

    # Configurações do Servidor
    PORT=3001

    # Configurações do Banco de Dados
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=seu_usuario_mysql
    DB_PASS=sua_senha_mysql
    DB_NAME=ecommerce_api

    # Segredo do JWT
    JWT_SECRET=coloque_um_segredo_aleatorio_e_seguro_aqui
    ```

5.  **Execute as Migrations:**

      - Este comando irá criar todas as tabelas necessárias no seu banco de dados.

    <!-- end list -->

    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **Inicie o Servidor:**

      - Este comando iniciará a aplicação em modo de desenvolvimento com o Nodemon.

    <!-- end list -->

    ```bash
    npm run dev
    ```

      - O servidor estará disponível em `http://localhost:3001`.

-----

## API Endpoints

A seguir, a documentação de todos os endpoints disponíveis na API.

### Autenticação

| Método | Endpoint     | Descrição                                         | Autenticação |
| :----- | :----------- | :------------------------------------------------ | :----------- |
| `POST` | `/sessions`  | Autentica um usuário e retorna um token JWT.        | Pública      |

**Request Body (`/sessions`):**

```json
{
  "email": "usuario@teste.com",
  "password": "senha_do_usuario"
}
```

### Usuários

| Método | Endpoint | Descrição                 | Autenticação |
| :----- | :------- | :------------------------ | :----------- |
| `POST` | `/users` | Registra um novo usuário. | Pública      |

**Request Body (`/users`):**

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@teste.com",
  "password": "senha_do_usuario"
}
```

### Categorias

| Método   | Endpoint         | Descrição                            | Autenticação |
| :------- | :--------------- | :----------------------------------- | :----------- |
| `GET`    | `/categories`    | Lista todas as categorias.           | Pública      |
| `GET`    | `/categories/:id`| Busca uma categoria por ID.          | Pública      |
| `POST`   | `/categories`    | Cria uma nova categoria.             | **Protegida**|
| `PUT`    | `/categories/:id`| Atualiza uma categoria existente.    | **Protegida**|
| `DELETE` | `/categories/:id`| Deleta uma categoria.                | **Protegida**|

**Request Body (`POST` e `PUT` `/categories`):**

```json
{
  "name": "Eletrônicos"
}
```

### Produtos

| Método   | Endpoint      | Descrição                       | Autenticação |
| :------- | :------------ | :------------------------------ | :----------- |
| `GET`    | `/products`   | Lista todos os produtos.        | Pública      |
| `GET`    | `/products/:id`| Busca um produto por ID.       | Pública      |
| `POST`   | `/products`   | Cria um novo produto.           | **Protegida**|
| `PUT`    | `/products/:id`| Atualiza um produto existente.  | **Protegida**|
| `DELETE` | `/products/:id`| Deleta um produto.              | **Protegida**|

**Request Body (`POST` e `PUT` `/products`):**

```json
{
  "name": "Notebook Gamer",
  "description": "Notebook com placa de vídeo dedicada.",
  "price": 5999.90,
  "category_id": 1
}
```

**Observação:** Para acessar as rotas **protegidas**, é necessário enviar o token JWT no cabeçalho da requisição:
`Authorization: Bearer <seu_token_jwt>`

-----

## 👨‍💻 Autor

Feito  por **Rafael Holanda**.

[Linkedin](https://www.linkedin.com/in/rafael-holanda-f-de-sousa-336a27224/)
[GitHub](https://github.com/RafaelHFSousa)

-----
