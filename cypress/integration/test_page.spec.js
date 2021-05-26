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

  describe('Headings', () => {
    beforeEach(() => {
      cy.get('h1').contains('Headings').scrollIntoView();
    });

    it('Snapshot', () => {
      cy.percySnapshot('Headings');
    });
  });

  describe('Text Styles', () => {
    beforeEach(() => {
      cy.get('h1').contains('Text Styles').scrollIntoView();
    });

    it('Snapshot', () => {
      cy.percySnapshot('Paragraph');
    });
  });

  describe('Code', () => {
    it('Scrolls horizontally for long lines', () => {
      cy.get('pre code').first().scrollIntoView();
      cy.percySnapshot('Code block - horizontal scroll');
    });
  });

  describe('Blockquotes', () => {
    beforeEach(() => {
      cy.get('h1').contains('Blockquotes').scrollIntoView();
    });

    it('Snapshot', () => {
      cy.percySnapshot('Blockquotes');
    });
  });

  describe('Callouts', () => {
    beforeEach(() => {
      cy.get('h1').contains('Callouts').scrollIntoView();
    });

    it('Snapshot', () => {
      cy.percySnapshot('Callouts');
    });
  });

  describe('Lists', () => {
    beforeEach(() => {
      cy.get('h1').contains('Lists').scrollIntoView();
    });

    it('Snapshot', () => {
      cy.percySnapshot('Lists');
    });
  });
});
