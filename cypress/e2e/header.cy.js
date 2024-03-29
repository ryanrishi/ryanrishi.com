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

  describe('Mobile Nav', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('renders the mobile nav at a small screen size', () => {
      cy.percySnapshot('Header - Mobile Nav - Closed')
    })

    it('opens the mobile nav when the hamburger is clicked', () => {
      cy.get('header [role="button"]').click()
      cy.get('[role="dialog"]').should('have.css', 'opacity', '1')
    })

    describe('Open', () => {
      beforeEach(() => {
        cy.get('header [role="button"]').click()
        cy.get('[role="dialog"]').should('have.css', 'opacity', '1')
        cy.get('[role="dialog"] ul:has(a[href="https://linkedin.com/in/ryanrishi"])').should('have.css', 'opacity', '1')
        // opacity jumps from 0 to 1, so wait for a sec for animations to finish
        // TODO fix this
        cy.wait(2000)
      })

      it('opens the mobile nav when the hamburger is clicked', () => {
        cy.percySnapshot('Header - Mobile Nav - Open')
      })

      it('can click a menu item', () => {
        cy.get('[role="dialog"] a').first().click()
        cy.url().should('equal', 'http://localhost:3000/music')
      })
    })
  })
})
