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
    cy.get('li').then((projects) => {
      for (let i = 0; i < projects.length; i++) {
        cy.get('li').eq(i).should('have.css', 'opacity', '1'); // wait for transitions
      }
    });

    cy.percySnapshot();
  });

  it('each project', () => {
    // see https://stackoverflow.com/a/61130646/5699147
    cy.get('li').then((projects) => {
      for (let i = 0; i < projects.length; i++) {
        if (i % 2 === 0) {
          // both project image and project title are clickable; skip over clicking the image to avoid duplicate tests
          continue; // eslint-disable-line no-continue
        }

        cy.get('li a').eq(i).click();
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
