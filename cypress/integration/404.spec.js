/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/this-page-does-not-exist', { failOnStatusCode: false });
  });

  it('percy', () => {
    const title = cy.get('h1').contains('404');
    const returnHomeLink = title.next().get('a:not(".header-link")')
    returnHomeLink.should('have.text', 'Return home');
    cy.percySnapshot();
  });
});
