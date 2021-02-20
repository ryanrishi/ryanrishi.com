describe('404', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/this-page-does-not-exist', { failOnStatusCode: false });
  });

  it('renders 404 page', () => {
    cy.title().should('eq', '404 | Ryan Rishi');
    cy.get('h1').contains('404');
    cy.get('a:not(".header-link")').should('have.text', 'Return home');
    cy.percySnapshot();
  });
});
