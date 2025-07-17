describe('Header', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (e) => {
      // Next throws this error on 404
      if (e.message.match(/NEXT_NOT_FOUND/)) {
        return false
      }

      // else, bubble up error to Cypress so it fails the test
    })

    cy.visit('/asdf', { failOnStatusCode: false }) // use a 404 page since it's the least likely to have visual diffs
    cy.waitForLogoAnimations()
  })

  it('renders the header', () => {
    cy.viewport('macbook-15')
    cy.percySnapshot('Header')
  })

})
