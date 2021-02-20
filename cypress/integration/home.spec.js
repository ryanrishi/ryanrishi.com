/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('percy', () => {
    cy.percySnapshot();
  });

  it('should find the title of the homepage', () => {
    cy.get('h1').contains("Hi, I'm Ryan");
  });
});
