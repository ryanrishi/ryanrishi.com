describe('404', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/this-page-does-not-exist', { failOnStatusCode: false })
    cy.waitForLogoAnimations()
  })

  it('meta', () => {
    const title = '404 | Ryan Rishi'
    cy.title().should('eq', title)
  })

  it('renders 404 page', () => {
    cy.get('h1').contains('404')
    cy.get('a').contains('Return home')
    cy.percySnapshot('404')
  })

  it('clicking the "return home" link returns to home', () => {
    cy.get('a').contains('Return home').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
