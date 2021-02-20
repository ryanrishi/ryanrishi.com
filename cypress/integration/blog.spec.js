describe('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog');
    cy.viewport('ipad-2'); // a tall viewport since some  of these pages are long
  });

  it('renders blog index', () => {
    cy.title().should('eq', 'Blog | Ryan Rishi');
    cy.percySnapshot();
  });

  it('each blog post', () => {
    // see https://stackoverflow.com/a/61130646/5699147
    cy.get('.post').then((posts) => {
      for (let i = 0; i < posts.length; i++) {
        cy.get('h2').eq(i).scrollIntoView();
        cy.get('h2').should('not.be.empty');

        cy.get('.post-meta').eq(i).then((meta) => {
          expect(meta).to.not.be.empty; // eslint-disable-line no-unused-expressions
          expect(meta.text()).to.match(/([A-Za-z]{3,9})\s\d{1,2},\s\d{4}/g);
        });

        // see https://github.com/cypress-io/cypress/issues/4856#issuecomment-594906798
        cy.get('h2 a').eq(i).click({ force: true });
        cy.url().should('match', /\/blog\/\d{4}-\d{2}-\d{2}-[a-z-]*$/);
        cy.get('h1').first().scrollIntoView();
        cy.percySnapshot();
        cy.go('back');
      }
    });
  });
});
