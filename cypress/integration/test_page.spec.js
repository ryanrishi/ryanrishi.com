describe('Test Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/_test');
  });

  describe('Title + Date', () => {
    it('Title + Date', () => {
      cy.get('h1').contains('test').next().should('have.text', 'February 2, 2021');
      cy.percySnapshot();
    });
  });

  describe('Viewport Tests', () => {
    beforeEach(() => {
      cy.get('h1').contains('Screen Sizes').scrollIntoView();
    });

    it('viewport - < sm', () => {
      cy.viewport(575, 1000);
      cy.get('.sm\\:hidden').should('be.visible');
      cy.get('.md\\:hidden').should('be.visible');
      cy.get('.lg\\:hidden').should('be.visible');
      cy.get('.xl\\:hidden').should('be.visible');
      cy.percySnapshot();
    });

    it('viewport - sm to md', () => {
      cy.viewport(767, 1000);
      cy.get('.sm\\:hidden').should('not.be.visible');
      cy.get('.md\\:hidden').should('be.visible');
      cy.get('.lg\\:hidden').should('be.visible');
      cy.get('.xl\\:hidden').should('be.visible');
      cy.percySnapshot();
    });

    it('viewport - md to lg', () => {
      cy.viewport(991, 1000);
      cy.get('.sm\\:hidden').should('not.be.visible');
      cy.get('.md\\:hidden').should('not.be.visible');
      cy.get('.lg\\:hidden').should('be.visible');
      cy.get('.xl\\:hidden').should('be.visible');
      cy.percySnapshot();
    });

    it('viewport - lg to xl', () => {
      cy.viewport(1199, 1000);
      cy.get('.sm\\:hidden').should('not.be.visible');
      cy.get('.md\\:hidden').should('not.be.visible');
      cy.get('.lg\\:hidden').should('not.be.visible');
      cy.get('.xl\\:hidden').should('be.visible');
      cy.percySnapshot();
    });

    it('viewport - > xl', () => {
      cy.viewport(1200, 1000);
      cy.get('.sm\\:hidden').should('not.be.visible');
      cy.get('.md\\:hidden').should('not.be.visible');
      cy.get('.lg\\:hidden').should('not.be.visible');
      cy.get('.xl\\:hidden').should('not.be.visible');
      cy.percySnapshot();
    });
  });
});
