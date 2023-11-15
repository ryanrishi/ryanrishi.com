describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForLogoAnimations()
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })

    it('author', () => {
      cy.get('head meta[name="author"]').should('have.attr', 'content', 'Ryan Rishi')
    })
  })

  it('renders the home page', () => {
    ['Ryan Rishi', 'Blog', 'Projects'].forEach((sectionTitle) => {
      cy.get('h1').contains(sectionTitle).scrollIntoView()
      cy.percySnapshot(`Home - ${sectionTitle}`)
    })
  })
})
