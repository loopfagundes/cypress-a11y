import { checkA11yWithLogs } from "../support/a11y";

describe("POC Acessibilidade - BugBank", () => {
    it("Home - não deve ter violações critical/serious", () => {
        cy.visit("/");
        checkA11yWithLogs();
    });

    it("Modal de cadastro - não deve ter violações critical/serious", () => {
        cy.visit("/");

        cy.contains("button", "Registrar").click();

        checkA11yWithLogs();
    });

    it("Após login - não deve ter violações critical/serious", () => {
        cy.visit("/");
        cy.contains("button", "Registrar").click();

        const email = `qa_${Date.now()}@teste.com`;
        const senha = "12345@";
        const nome = "QA Cypress";

        cy.get('input[placeholder="Informe seu e-mail"]').eq(1).type(email, { force: true });
        cy.get('input[placeholder="Informe seu Nome"]').type(nome, { force: true });
        cy.get('input[placeholder="Informe sua senha"]').eq(1).type(senha, { force: true });
        cy.get('input[placeholder="Informe a confirmação da senha"]').type(senha, { force: true });
        cy.get('#toggleAddBalance').then(($el) => { $el[0].click(); });

        cy.get('[class="style__ContainerButton-sc-1wsixal-0 CMabB button__child"]').click({ force: true });
        cy.get('#btnCloseModal').click();

        cy.get('input[placeholder="Informe seu e-mail"]:visible').type(email);
        cy.get('input[placeholder="Informe sua senha"]:visible').type(senha);
        cy.contains("button", "Acessar").click({ force: true });

        checkA11yWithLogs();
    });

    after(() => {
        cy.task("a11yReport");
    });
});