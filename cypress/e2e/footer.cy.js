describe('Footer', () => {
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

  it('renders the footer', () => {
    cy.get('footer').scrollIntoView()

    cy.percySnapshot('Footer')
  })

  it('has valid links', () => {
    cy.get('footer a').then((links) => {
      const localHrefs = []
      links.each((_, link) => {
        const href = link.href
        if (href.includes('localhost')) {
          localHrefs.push(href)
        }
      })

      localHrefs.forEach((href) => {
        cy.visit(href)
        cy.url().should('eq', href)
      })
    })
  })

  it('has a copyright', () => {
    cy.get('footer').then((footer) => {
      expect(footer.text()).to.match(/© Copyright\s\d{4}\sRyan Rishi/)
      expect(footer.text()).to.contain(new Date().getFullYear())
    })
  })
})
