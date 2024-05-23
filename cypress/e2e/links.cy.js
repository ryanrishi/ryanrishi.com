describe('Links', () => {
  beforeEach(() => {
    cy.visit('/links')
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })
  })

  it('renders the links page', () => {
    cy.percySnapshot('Links')
  })
})
