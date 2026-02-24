export function checkA11yWithLogs(context = null, impacts = ['critical', 'serious']) {
  cy.injectAxe();

  cy.checkA11y(context, { includedImpacts: impacts }, (violations) => {
    cy.task('log', `Total violações (${impacts.join(', ')}): ${violations.length}`);

    cy.url().then((url) => {
      cy.task('a11yAdd', {
        testName: Cypress.currentTest.title,
        url,
        violations,
      });
    });

    violations.forEach((v, i) => {
      cy.task('log', `\n[${i + 1}] ${v.id} | Impacto: ${v.impact}`);
      cy.task('log', `Ajuda: ${v.help}`);
      cy.task('log', `Descrição: ${v.description}`);
      cy.task('log', `Nós afetados: ${v.nodes.length}`);
    });
  });
}