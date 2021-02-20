describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/projects');
    cy.viewport('ipad-2'); // a tall viewport since some  of these pages are long
  });

  it('renders the project page', () => {
    cy.title().should('eq', 'Projects | Ryan Rishi');
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
