# Documentação do Projeto - Monitoramento de Vícios

## Visão Geral

Este é um projeto desenvolvido com **Node.js**, utilizando **Express**, **MongoDB Atlas**. O projeto oferece uma API para interação com o banco de dados MongoDB.
## Tecnologias Usadas

- **Node.js**: Plataforma para execução de JavaScript no backend.
- **Express**: Framework para Node.js, usado para construir a API.
- **MongoDB**: Banco de dados NoSQL, hospedado no MongoDB Atlas (500MB no plano gratuito).
- **Mongoose**: ODM para interagir com MongoDB de forma mais fácil.
- **Swagger**: Ferramenta para gerar e visualizar a documentação da API.
- **Ngrok**: Serviço para expor localmente servidores para a internet, útil para testes.

## Instalação do Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/davi-martins-sousa/monitoramento_de_vicios
   cd Monitoramento_de_vicios

2. **Instale as dependências do projeto**:
   No diretório do projeto, execute o seguinte comando:
   ```bash
   npm install

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias:
   ```bash
   MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/<nome-do-banco>
   API_URL=http://localhost:3000
   PORT=3000
   JWT_SECRET=seu-segredo-jwt

4. **Inicie o servidor localmente**:
   Para iniciar o servidor, use o comando:
   ```bash
   node server.js

5. **Utilizando o Ngrok**:
   Para expor seu servidor local através de um URL público, você pode usar o Ngrok. Execute o comando:
   ```bash
   ngrok http http://localhost:3000

## Documentação da API

A documentação da API, feita com Swagger, pode ser acessada através da rota /api-doc, ou do link local:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)


&& sudo apt install ngrok

### Teste de unitade
```bash
   npx mocha public/backend/routes/habito.test.js
   npx mocha public/backend/routes/usuario.test.js