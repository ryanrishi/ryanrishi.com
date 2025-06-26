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
    cy.get('li').then((projects) => {
      for (let i = 0; i < projects.length; i++) {
        cy.get('li').eq(i).should('have.css', 'opacity', '1') // wait for transitions
      }
    })
    // Use custom command to wait for all images to load reliably
    // Projects page has many large images, so use longer timeout
    cy.waitForImagesLoaded({ timeout: 60000 })
    cy.percySnapshot('Projects')
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
          const title = $title.text()

          // Wait for images to load reliably
          cy.waitForImagesLoaded({ timeout: 30000 })

          cy.percySnapshot(title)
        })
        cy.go('back')
        cy.title().should('include', 'Projects') // wait for router to finish transition to projects index
      }
    })
  })
})
