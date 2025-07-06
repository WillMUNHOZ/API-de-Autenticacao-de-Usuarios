# API de Autenticação de Usuários

Esta é uma API para autenticação de usuários, permitindo o registro, login, e gerenciamento de informações de usuário.

## Funcionalidades

- Registro de novos usuários
- Login de usuários com autenticação JWT
- Obter informações do usuário autenticado
- Obter lista de todos os usuários
- Atualizar informações do usuário autenticado
- Excluir usuário autenticado

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Zod

## Rotas da API

| Método | Rota                | Descrição                                     | Autenticação |
|--------|---------------------|-----------------------------------------------|--------------|
| POST   | /register           | Registra um novo usuário.                       | Não          |
| POST   | /login              | Autentica um usuário e retorna um token JWT.    | Não          |
| GET    | /users              | Retorna uma lista de todos os usuários.         | Sim          |
| GET    | /users/auth         | Retorna os dados do usuário autenticado.      | Sim          |
| PUT    | /users/auth         | Atualiza os dados do usuário autenticado.     | Sim          |
| DELETE | /users/auth         | Exclui o usuário autenticado.                 | Sim          |

### Corpo da Requisição para `/register`

```json
{
  "name": "Seu Nome",
  "email": "seuemail@exemplo.com",
  "password": "suasenha"
}
```

### Corpo da Requisição para `/login`

```json
{
  "email": "seuemail@exemplo.com",
  "password": "suasenha"
}
```

### Corpo da Requisição para `/users/auth` (PUT)

```json
{
  "name": "Novo Nome",
  "email": "novoemail@exemplo.com",
  "password": "novasenha"
}
```

## Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/WillMUNHOZ/API-de-Autenticacao-de-Usuarios.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:**
   ```
   MONGO_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=seu_segredo_jwt
   PORT=3000
   ```
4. **Inicie o servidor:**
   ```bash
   npm start
   ```

O servidor estará rodando em `http://localhost:3000`.
