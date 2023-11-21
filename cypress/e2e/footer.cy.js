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
      for (let i = 0; i < links.length; i++) {
        cy.get('footer a').eq(i).then((link) => {
          if (link.prop('href').includes('localhost')) {
            cy.visit(link.prop('href')) // verify it's not a 404
            cy.url().should('eq', link.prop('href'))  // wait for page to load
            cy.go('back', { failOnStatusCode: false })
          }
          else {
            // external links are annoying, like LinkedIn returning 999
            // I'll ignore these for now
          }
        })
      }
    })
  })

  it('has a copyright', () => {
    cy.get('footer').then((footer) => {
      expect(footer.text()).to.match(/© Copyright\s\d{4}\sRyan Rishi/)
      expect(footer.text()).to.contain(new Date().getFullYear())
    })
  })
})
