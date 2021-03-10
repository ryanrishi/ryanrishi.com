describe('Test Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/_test');
  });

  describe('meta tags', () => {
    it('title', () => {
      const title = 'test | Ryan Rishi';
      cy.title().should('eq', title);
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title);
    });

    it('description', () => {
      const description = 'this is only a test';
      cy.get('head meta[property="og:description"]').should('have.attr', 'content', description);
    });

    it('image', () => {
      cy.get('head meta[property="og:image"]').should('have.attr', 'content', 'https://ryanrishi.com/img/nope.png');
    });

    it('tags', () => {
      const tags = ['test', 'second tag'];
      tags.forEach((tag, index) => {
        cy.get('head meta[property="article:tag"]').eq(index).should('have.attr', 'content', tag);
      });
    });
  });

  describe('Title + Date', () => {
    it('Title + Date', () => {
      cy.get('h1').contains('test').next().should('have.text', 'February 3, 2021');
      cy.percySnapshot();
    });
  });

  describe('Code', () => {
    it('Scrolls horizontally for long lines', () => {
      cy.get('pre code').first().scrollIntoView();
      cy.percySnapshot('Code block - horizontal scroll');
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
