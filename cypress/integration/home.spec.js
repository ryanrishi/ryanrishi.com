describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('renders the home page', () => {
    cy.title().should('eq', 'Ryan Rishi')
    cy.get('h1').contains("Hi, I'm Ryan");
    cy.percySnapshot();
  });
});
