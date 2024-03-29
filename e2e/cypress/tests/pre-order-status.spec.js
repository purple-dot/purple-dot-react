describe('@purple-dot/purple-dot-js', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', (win) => {
      cy.spy(win.console, 'error');
      cy.spy(win.console, 'warn');
    });
  });

  it('Loads the Preorder Status Iframe', () => {
    cy.visit('http://localhost:8080/#/manage-pre-orders');
    cy.window().should('have.property', 'PurpleDot');

    // We expect the placement to not load since we're not using a real API key or SKU
    cy.get('[data-purple-dot-placement-type="pre-order-status-placement"]').should('exist');

    cy.window().then((win) => {
      expect(win.console.error).to.have.callCount(0);
      expect(win.console.warn).to.have.callCount(0);
    });
  });
});
