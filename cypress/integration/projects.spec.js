describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/projects');
    cy.viewport('ipad-2'); // a tall viewport since some  of these pages are long
  });

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Projects | Ryan Rishi';
      cy.title().should('eq', title);
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title);
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
        cy.get('h1').first().then(($title) => {
          cy.percySnapshot($title.text());
        });
        cy.go('back');
      }
    });
  });
});
