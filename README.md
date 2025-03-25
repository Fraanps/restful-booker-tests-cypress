# Projeto de Testes de API - Restful Booker com Cypress

Este projeto contém testes automatizados para a API [Restful Booker](https://restful-booker.herokuapp.com) utilizando Cypress.

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework de testes

[//]: # (- [Mocha]&#40;https://mochajs.org/&#41; - Estrutura de testes)
[//]: # (- [Chai]&#40;https://www.chaijs.com/&#41; - Biblioteca de asserções)

## 📌 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 📥 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/projeto-api-tests.git
   ```

2. Acesse a pasta do projeto:
   ```sh
   cd projeto-api-tests
   ```

3. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

## 🛠️ Estrutura do Projeto

```
📂 projeto-api-tests
├── 📂 cypress
│   ├── 📂 e2e
│   │   ├── gets_booking.cy.js    # Testes para reservas
│   │   ├── auth.cy.js       # Testes de autenticação
│   ├── 📂 support
│   │   ├── commands.js      # Comandos customizados
│   ├── cypress.config.js    # Configuração do Cypress
├── 📜 package.json          # Dependências e scripts
├── 📜 README.md             # Documentação do projeto
```

## 🚀 Executando os Testes

Para rodar os testes em modo **headless**:
```sh
npm run cy:run
# ou
yarn cy:run
```

Para abrir o Cypress e rodar os testes no modo **interativo**:
```sh
npm run cy:open
# ou
yarn cy:open
```

## 🔹 Comandos Customizados

O projeto possui alguns comandos customizados para facilitar os testes. Eles estão definidos em `cypress/support/commands.js`.

Exemplo de comando para criar uma reserva:
```javascript
Cypress.Commands.add('postBooking', (bookingData) => {
  return cy.request({
    method: 'POST',
    url: '/booking',
    body: bookingData
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body.bookingid;
  });
});
```

## ✅ Testes Implementados

- [x] Criar uma reserva (`POST /booking`)
- [x] Buscar uma reserva (`GET /booking/{id}`)
- [x] Atualizar uma reserva (`PUT /booking/{id}`)
- [x] Excluir uma reserva (`DELETE /booking/{id}`)
- [x] Autenticação (`POST /auth`)

## 📜 Licença

Este projeto é de uso pessoal e aberto para contribuições. Sinta-se à vontade para melhorá-lo! 😊

