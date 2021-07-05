describe('Contact', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/contact');
  });

  it('meta', () => {
    const title = 'Contact | Ryan Rishi';
    cy.title().should('eq', title);
  });

  it('renders contact page', () => {
    cy.get('h1').contains('Contact');
    cy.percySnapshot();
  });

  it('form validation', () => {
    const FormSelectors = Object.freeze({
      NAME: 'input[name="name"]',
      EMAIL: 'input[name="email"]',
      MESSAGE: 'textarea[name="message"]',
      SUBMIT: 'button[type="submit"]'
    });

    cy.get(FormSelectors.SUBMIT).click();
    cy.get('input:invalid').should($el => expect($el).to.have.length(2));
    cy.get('textarea:invalid').should($el => expect($el).to.have.length(1));

    cy.get(FormSelectors.NAME).type('this is my name');
    cy.get('input:invalid').should($el => expect($el).to.have.length(1));
    cy.get(FormSelectors.SUBMIT).click();

    cy.get(FormSelectors.EMAIL).type('test@example.com');
    cy.get('input:invalid').should('not.exist');
    cy.get(FormSelectors.SUBMIT).click();

    cy.get(FormSelectors.MESSAGE).type('Hello!');
    cy.get('form:invalid').should('not.exist');

    // don't actually submit the form, since Cypress can't redirect to other origins without disabling Chrome Web Security
  });
});
