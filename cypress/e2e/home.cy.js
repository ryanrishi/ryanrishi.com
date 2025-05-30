describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForLogoAnimations()
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })

    it('author', () => {
      cy.get('head meta[name="author"]').should('have.attr', 'content', 'Ryan Rishi')
    })
  })

  it('renders the home page', () => {
    ['Ryan Rishi', 'Blog', 'Projects'].forEach((sectionTitle) => {
      cy.get('h1').contains(sectionTitle).scrollIntoView()
      cy.percySnapshot(`Home - ${sectionTitle}`)
    })
  })

  it('navigates to each blog post', () => {
    cy.get('h1').contains('Blog').scrollIntoView()
    cy.get('h1').contains('Blog').parent().parent().find('a[href^="/blog/"]').not(':contains("Read all posts")').then((links) => {
      for (let i = 0; i < links.length; i++) {
        cy.get('h1').contains('Blog').parent().parent().find('a[href^="/blog/"]').not(':contains("Read all posts")').eq(i).click()
        cy.url().should('match', /\/blog\/.+$/)
        cy.go('back')
      }
    })
  })

  it('navigates to each project', () => {
    cy.get('h1').contains('Projects').scrollIntoView()
    cy.get('h1').contains('Projects').parent().parent().find('a[href^="/projects/"]').not(':contains("See all projects")').then((links) => {
      for (let i = 0; i < links.length; i++) {
        cy.get('h1').contains('Projects').parent().parent().find('a[href^="/projects/"]').not(':contains("See all projects")').eq(i).click()
        cy.url().should('match', /\/projects\/.+$/)
        cy.go('back')
      }
    })
  })
})
