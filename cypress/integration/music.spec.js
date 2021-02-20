describe('Music', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/music');
  });

  it('should find the title of the music page', () => {
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
