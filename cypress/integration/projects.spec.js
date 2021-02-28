describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/projects');
    cy.viewport('ipad-2'); // a tall viewport since some  of these pages are long
  });

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Projects | Ryan Rishi';
      cy.title().should('eq', 'Projects | Ryan Rishi');
      cy.get('head meta[name="og:title"]').should('have.attr', 'content', title);
      cy.get('head meta[name="twitter:title"]').should('have.attr', 'content', title);
    });
  });

  it('renders the project page', () => {
    cy.get('h1').contains('Projects');
    cy.percySnapshot();
  });

  it('each project', () => {
    // see https://stackoverflow.com/a/61130646/5699147
    cy.get('li').then((projects) => {
      for (let i = 0; i < projects.length; i++) {
        cy.get('li > a').eq(i).click();
        cy.url().should('include', '/projects/');
        cy.get('h1').scrollIntoView();
        cy.percySnapshot();
        cy.go('back');
      }
    });
  });
});
