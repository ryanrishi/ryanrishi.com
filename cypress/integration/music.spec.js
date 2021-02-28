describe('Music', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/music');
  });

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Music | Ryan Rishi';
      cy.title().should('eq', title);
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title);
    });
  });

  it('renders the music page', () => {
    cy.get('h1').contains('Music');
    cy.percySnapshot();
  });

  it('Senior Recital', () => {
    cy.get('h3').contains('Senior Recital').scrollIntoView();
    cy.percySnapshot();
  });

  it('Percussion Covers', () => {
    cy.get('h3').contains('Percussion Covers').scrollIntoView();
    cy.percySnapshot();
  });

  it('Recording', () => {
    cy.get('h3').contains('Recording').scrollIntoView();
    cy.percySnapshot();
  });
});
