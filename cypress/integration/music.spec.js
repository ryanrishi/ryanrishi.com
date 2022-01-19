describe('Music', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/music')
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
    cy.get('h3').contains('Senior Recital').scrollIntoView()
    cy.percySnapshot('Music - Senior Recital')
  })

  it('Percussion Covers', () => {
    cy.get('h3').contains('Percussion Covers').scrollIntoView()
    cy.percySnapshot('Music - Percussion Covers')
  })

  it('Recording', () => {
    cy.get('h3').contains('Recording').scrollIntoView()
    cy.percySnapshot('Music - Recording')
  })
})
