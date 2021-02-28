describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Ryan Rishi';
      cy.title().should('eq', title);
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title);
    });

    it('author', () => {
      cy.get('head meta[name="author"]').should('have.attr', 'content', 'Ryan Rishi');
    });
  });

  it('renders the home page', () => {
    cy.get('h1').contains("Hi, I'm Ryan");
    cy.percySnapshot();
  });
});
