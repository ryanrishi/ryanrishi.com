describe('Mobile Navigation', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (e) => {
      // Next throws this error on 404
      if (e.message.match(/NEXT_NOT_FOUND/)) {
        return false
      }
    })

    cy.visit('/')
    cy.viewport('iphone-x') // Mobile viewport to ensure mobile nav is visible
  })

  it('displays hamburger menu on mobile', () => {
    cy.get('[data-testid="hamburger-menu"]').should('be.visible')
    cy.get('nav').should('not.be.visible') // Desktop nav should be hidden
    cy.percySnapshot('Mobile Nav - Closed')
  })

  it('opens mobile nav when hamburger is clicked', () => {
    // Initially mobile nav should be closed
    cy.get('[role="dialog"]').should('not.exist')

    // Click hamburger menu
    cy.get('[data-testid="hamburger-menu"]').click()

    // Mobile nav should be open
    cy.get('[role="dialog"]').should('be.visible')

    // Check that all nav items are present
    cy.get('[role="dialog"]').within(() => {
      cy.contains('Home').should('be.visible')
      cy.contains('Music').should('be.visible')
      cy.contains('Projects').should('be.visible')
      cy.contains('Blog').should('be.visible')
      cy.contains('Contact').should('be.visible')
    })

    // Wait for last social link to be visible (ensures all animations complete)
    cy.get('[aria-label="YouTube"]').should('be.visible')

    // Take Percy screenshot of open mobile nav
    cy.percySnapshot('Mobile Nav - Open')
  })

  it('closes mobile nav when hamburger is clicked again', () => {
    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()
    cy.get('[role="dialog"]').should('be.visible')

    // Close mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()

    // Wait for mobile nav to close
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('closes mobile nav when backdrop is clicked', () => {
    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()
    cy.get('[role="dialog"]').should('be.visible')

    // Click backdrop
    cy.get('[data-testid="mobile-nav-backdrop"]').click()

    // Wait for mobile nav to close
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('navigates to correct page when nav item is clicked', () => {
    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()
    cy.get('[role="dialog"]').should('be.visible')

    // Click on Music link (first nav item)
    cy.get('[role="dialog"]').contains('Music').click()

    // Should be on music page
    cy.url().should('include', '/music')
    cy.get('h1').should('contain', 'Music')

    // Mobile nav should be closed
    cy.get('[role="dialog"]').should('not.exist')
  })

  it('highlights active page in mobile nav', () => {
    // Go to blog page first
    cy.visit('/blog')

    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()
    cy.get('[role="dialog"]').should('be.visible')

    // Blog link should be highlighted (white text)
    cy.get('[role="dialog"]').contains('Blog').should('have.class', 'text-white')

    // Other links should not be highlighted
    cy.get('[role="dialog"]').contains('Home').should('have.class', 'text-slate-100')
    cy.get('[role="dialog"]').contains('Projects').should('have.class', 'text-slate-100')

    // Wait for last social link to be visible (ensures all animations complete)
    cy.get('[aria-label="YouTube"]').should('be.visible')

    // Take Percy screenshot of active state
    cy.percySnapshot('Mobile Nav - Active State (Blog)')
  })

  it('displays social links in mobile nav', () => {
    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()
    cy.get('[role="dialog"]').should('be.visible')

    // Check social links are present
    cy.get('[role="dialog"]').within(() => {
      cy.get('[aria-label="GitHub"]').should('be.visible')
      cy.get('[aria-label="Twitter"]').should('be.visible')
      cy.get('[aria-label="LinkedIn"]').should('be.visible')
      cy.get('[aria-label="SoundCloud"]').should('be.visible')
      cy.get('[aria-label="YouTube"]').should('be.visible')
    })
  })

  it('has proper accessibility attributes', () => {
    // Open mobile nav
    cy.get('[data-testid="hamburger-menu"]').click()

    // Check accessibility attributes
    cy.get('[role="dialog"]').should('have.attr', 'aria-modal', 'true')

    // Check social links have proper labels
    cy.get('[aria-label="GitHub"]').should('exist')
    cy.get('[aria-label="Twitter"]').should('exist')
    cy.get('[aria-label="LinkedIn"]').should('exist')
    cy.get('[aria-label="SoundCloud"]').should('exist')
    cy.get('[aria-label="YouTube"]').should('exist')
  })

})