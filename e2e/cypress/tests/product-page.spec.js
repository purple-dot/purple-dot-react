describe('@purple-dot/purple-dot-js', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      console.error(err);
    });
    Cypress.on('window:before:load', (win) => {
      cy.spy(win.console, 'error');
      cy.spy(win.console, 'warn');
    });
  });

  it('loads the Purple Dot SDK without warnings or errors', () => {
    cy.visit('http://localhost:8080/#/product');

    cy.window().then((win) => {
      expect(win.console.error).to.have.callCount(0);
      expect(win.console.warn).to.have.callCount(0);
    });
  });

  it('disables the button if no variant is selected', () => {
    cy.get('#pre-order-btn').should('be.disabled');
    cy.get('#pre-order-btn').should('contain', 'Add to cart');
  });

  it('enables the button if a variant is selected', () => {
    cy.get('#variant-select').select('39361930657924');

    cy.get('#pre-order-btn').should('not.be.disabled');
  });

  it('shows the ship dates, branding and pre-order button if a pre-order variant is selected', () => {
    cy.get('#variant-select').select('39361930657924');

    cy.get('#pre-order-btn').should('contain', 'Pre-order');
    cy.get('#pd-dispatch-dates').should('be.visible');
    cy.get('#pd-branding').should('be.visible');
  });
});
