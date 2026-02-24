Cypress.Commands.add('openRegisterModal', () => {
  cy.contains('button', 'Registrar').click();
});

Cypress.Commands.add('registerUser', ({ nome, email, senha }) => {
  cy.openRegisterModal();

  cy.get('input[placeholder="Informe seu e-mail"]').eq(1).type(email, { force: true });
  cy.get('input[placeholder="Informe seu Nome"]').type(nome, { force: true });
  cy.get('input[placeholder="Informe sua senha"]').eq(1).type(senha, { force: true });
  cy.get('input[placeholder="Informe a confirmação da senha"]').type(senha, { force: true });

  cy.get('#toggleAddBalance')
    .then(($el) => $el[0].click());

  cy.contains('button', 'Cadastrar').click({ force: true });

  cy.get('#btnCloseModal').click();
});

Cypress.Commands.add('login', ({ email, senha }) => {
  cy.get('input[placeholder="Informe seu e-mail"]:visible').first().type(email);
  cy.get('input[placeholder="Informe sua senha"]:visible').type(senha);
  cy.contains('button', 'Acessar').click({ force: true });
});