describe('Footer', () => {
  beforeEach(() => {
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
          if (
            link.prop('href').includes('localhost') &&
            link.prop('href') !== 'http://localhost:3000/'  // don't try to visit page we're already on, or else Cypress will throw cross-origin iframe error because it tries to go back
          ) {
            cy.visit(link.prop('href')) // verify it's not a 404
            cy.url().should('eq', link.prop('href'))  // wait for page to load
            cy.go('back')
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
