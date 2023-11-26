describe('Tags', () => {
  beforeEach(() => {
    cy.visit('/tags')
    cy.viewport('ipad-2') // a tall viewport since some  of these pages are long
    cy.waitForLogoAnimations()
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Tags | Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })
  })

  it('renders the tags page', () => {
    cy.get('h1').contains('Tags')

    cy.percySnapshot('Projects')
  })

  it('each tag', () => {
    cy.get('[data-test-id="tags"] div').then((tags) => {
      for (let i = 0; i < tags.length; i++) {
        cy.get('[data-test-id="tags"] div').eq(i).click()
        cy.url().should('match', /\/tags\/[a-z-]+/)
        cy.waitForLogoAnimations()
        cy.url().then((url) => {
          const tag = url.split('/').pop()
          cy.title().should('contain', tag)
          cy.get('head meta[property="og:title"]').should('have.attr', 'content').should('include', tag)
        })
        cy.get('h1').scrollIntoView()
        cy.title().then((title) => {
          cy.percySnapshot(`Tagged: ${title}`)
        })
        cy.go('back')
        cy.title().should('include', 'Tags')
      }
    })
  })
})
