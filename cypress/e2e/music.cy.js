describe('Music', () => {
  beforeEach(() => {
    // This page includes third-party embeds (e.g. YouTube) which can delay the window load event in CI.
    cy.visit('http://localhost:3000/music', { timeout: 120000 })
    cy.waitForLogoAnimations()
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Music | Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })
  })

  it('renders the music page', () => {
    cy.get('h1').contains('Music').scrollIntoView()
    cy.percySnapshot('Music')
  })

  it('Senior Recital', () => {
    cy.get('h1').contains('Senior Recital').scrollIntoView()
  })

  it('Percussion Covers', () => {
    cy.get('h1').contains('Percussion Covers').scrollIntoView()
  })

  it('Recording', () => {
    cy.get('h1').contains('Recording').scrollIntoView()
  })
})
