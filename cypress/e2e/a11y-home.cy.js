describe('Acessibilidade - Home', () => {
  it('não deve ter violações críticas ou sérias', () => {
    cy.visit('https://www.youcom.com.br/');

    cy.injectAxe();

    cy.checkA11y(
      null,
      { includedImpacts: ['critical', 'serious'] },
      (violations) => {
        cy.task('log', `Total violações: ${violations.length}`);

        violations.forEach((v, i) => {
          cy.task('log', `\n[${i + 1}] ${v.id} | Impacto: ${v.impact}`);
          cy.task('log', `Ajuda: ${v.help}`);
          cy.task('log', `Descrição: ${v.description}`);
          cy.task('log', `Nós afetados: ${v.nodes.length}`);

          v.nodes.slice(0, 3).forEach((node, j) => {
            cy.task('log', `  - Node ${j + 1}: ${node.target.join(', ')}`);
            if (node.failureSummary) {
              cy.task('log', `    Falha: ${node.failureSummary}`);
            }
          });
        });
      }
    );
  });
});