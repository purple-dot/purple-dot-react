describe('@purple-dot/purple-dot-js', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', (win) => {
      cy.spy(win.console, 'error');
      cy.spy(win.console, 'warn');
    });
  });

  it('Loads the Purple Dot SDK without warnings or errors', () => {
    cy.visit('http://localhost:8080/');
    cy.window().should('have.property', 'PurpleDot');

    // We expect the placement to not load since we're not using a real API key or SKU
    cy.get('[data-purple-dot-placement-type="price"]').should('have.css', 'display', 'none');
    cy.get('[data-purple-dot-placement-type="button"]').should('have.css', 'display', 'none');
    cy.get('[data-purple-dot-placement-type="messaging"]').should('have.css', 'display', 'none');

    cy.window().then((win) => {
      expect(win.console.error).to.have.callCount(0);
      expect(win.console.warn).to.have.callCount(0);
    });
  });
});
