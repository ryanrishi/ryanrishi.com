describe('Projects', () => {
  beforeEach(() => {
    cy.visit('/projects')
    cy.viewport('ipad-2') // a tall viewport since some  of these pages are long
    cy.waitForLogoAnimations()
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Projects | Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })
  })

  it('renders the project page', () => {
    cy.get('h1').contains('Projects')

    // Wait for all project items to be visible and fully rendered
    cy.get('li').should('be.visible')
      .then((projects) => {
        // Instead of checking each item individually, we'll check just the last one
        // This ensures all animations have completed (assuming they happen in sequence)
        if (projects.length > 0) {
          cy.get('li').last().should('have.css', 'opacity', '1', { timeout: 10000 })
        }
      })

    // Add a small delay to ensure everything is settled before snapshot
    cy.wait(1000)
    cy.percySnapshot('Projects', { timeout: 15000 })
  })

  it('each project', () => {
    // see https://stackoverflow.com/a/61130646/5699147
    cy.get('li').then((projects) => {
      for (let i = 0; i < projects.length; i++) {
        cy.get('li a').eq(i).click()
        cy.url().should('include', '/projects/')
        cy.waitForLogoAnimations()
        cy.get('h1').scrollIntoView()
        cy.get('h1').first().then(($title) => {
          // Reduce the arbitrary wait time
          cy.wait(2000)
          // Add timeout to Percy snapshot
          cy.percySnapshot($title.text(), { timeout: 15000 })
        })
        cy.go('back')
        cy.title().should('include', 'Projects') // wait for router to finish transition to projects index
      }
    })
  })
})
