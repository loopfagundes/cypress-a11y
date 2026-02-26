import { checkA11yWithLogs } from '../support/a11y';

describe('POC Acessibilidade - BugBank', () => {
  it('Home - não deve ter violações critical/serious', () => {
    cy.visit('/');
    checkA11yWithLogs();
  });

  it('Cadastro - não deve ter violações critical/serious', () => {
    cy.visit('/');
    cy.openRegister();
    checkA11yWithLogs();
  });

  it('Após login - não deve ter violações critical/serious', () => {
    cy.visit('/');

    const email = `qa_${Date.now()}@teste.com`;
    const senha = '12345@';
    const nome = 'QA Cypress';

    cy.registerUser({ nome, email, senha });
    cy.login({ email, senha });

    cy.extrato();

    checkA11yWithLogs();
  });

  after(() => {
    cy.task('a11yReport');
  });
});