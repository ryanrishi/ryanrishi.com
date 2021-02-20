describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the footer', () => {
    cy.get('footer').scrollIntoView();
    cy.get('footer').then((footer) => {
      expect(footer.text()).to.match(/^© Copyright\s\d{4}\sRyan Rishi/);
      expect(footer.text()).to.contain(new Date().getFullYear());
    });

    cy.percySnapshot();
  });
});
