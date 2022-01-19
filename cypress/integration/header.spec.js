describe('Header', () => {
  beforeEach(() => {
    cy.visit('/asdf', { failOnStatusCode: false }) // use a 404 page since it's the least likely to have visual diffs
  })

  it('renders the header', () => {
    cy.viewport('macbook-15')
    cy.percySnapshot()
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
      cy.get('[data-reach-dialog-overlay]').should('have.css', 'opacity', '1')
      cy.get('[role="dialog"] a').should('be.visible')
    })

    describe('Open', () => {
      beforeEach(() => {
        cy.get('header [role="button"]').click()
        cy.get('[data-reach-dialog-overlay]').should('have.css', 'opacity', '1')
      })

      it('opens the mobile nav when the hamburger is clicked', () => {
        cy.percySnapshot('Header - Mobile Nav - Open')
      })

      it('can clik a menu item', () => {
        cy.get('[role="dialog"] a').first().click()
        cy.url().should('equal', 'http://localhost:3000/')
      })
    })
  })
})
