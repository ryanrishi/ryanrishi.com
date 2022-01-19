describe('Test Page', () => {
  beforeEach(() => {
    cy.visit('/_test')
  })

  describe('meta tags', () => {
    it('title', () => {
      const title = 'test | Ryan Rishi'
      cy.title().should('eq', title)
      cy.get('head meta[property="og:title"]').should('have.attr', 'content', title)
    })

    it('description', () => {
      const description = 'this is only a test'
      cy.get('head meta[property="og:description"]').should('have.attr', 'content', description)
    })

    it('image', () => {
      cy.get('head meta[property="og:image"]').should('have.attr', 'content', 'https://ryanrishi.com/img/nope.png')
    })

    it('tags', () => {
      const tags = ['test', 'second tag']
      tags.forEach((tag, index) => {
        cy.get('head meta[property="article:tag"]').eq(index).should('have.attr', 'content', tag)
      })
    })
  })

  // TODO get this working in CI
  // works headless + headful (?) on my laptop
  // fails in Github Actions on Chrome and Electron
  describe.skip('Dark Mode 🌚', () => {
    before(() => {
      cy.visit('/_test', {
        onBeforeLoad(win) {
          console.log('onBeforeLoad')
          cy.stub(win, 'matchMedia')
            .withArgs('(prefers-color-scheme: dark)')
            .returns({
              matches: true,
              addEventListener: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
            })
        },
      })
    })

    it('shows dark mode if `prefers-color-scheme: dark`', () => {
      cy.get('html').should('have.class', 'dark')
      cy.percySnapshot('Dark Mode - with `prefers-color-scheme: dark`')
    })

    it('toggles between light and dark mode', () => {
      cy.get('button[aria-label="Dark mode toggle"]:visible').click()
      cy.get('html').should('not.have.class', 'dark')
      cy.percySnapshot('Dark Mode - after toggling to light')

      cy.get('button[aria-label="Dark mode toggle"]:visible').click()
      cy.get('html').should('have.class', 'dark')
      cy.percySnapshot('Dark Mode - after toggling back to dark mode')
    })

    describe('Dark mode styles', () => {
      it('Headings', () => {
        cy.get('h1').contains('Headings').scrollIntoView()
        cy.percySnapshot('Dark mode - Headings')
      })

      it('Text Styles', () => {
        cy.get('h1').contains('Text Styles').scrollIntoView()
        cy.percySnapshot('Dark mode - Text Styles')
      })

      // skipping code since it's the same in dark mode

      it('Blockquotes', () => {
        cy.get('h1').contains('Blockquotes').scrollIntoView()
        cy.percySnapshot('Dark mode - Blockquotes')
      })

      it('Callouts', () => {
        cy.get('h1').contains('Callouts').scrollIntoView()
        cy.percySnapshot('Dark mode - Callouts')
      })

      it('Lists', () => {
        cy.get('h1').contains('Lists').scrollIntoView()
        cy.percySnapshot('Dark mode - Lists')
      })
    })
  })

  describe('Headings', () => {
    beforeEach(() => {
      cy.get('h1').contains('Headings').scrollIntoView()
    })

    it('Snapshot', () => {
      cy.percySnapshot('Headings')
    })

    // TODO get this working in CI
    // Cypress recording looks like it's working on laptop, but not in CI (headless Electron)
    describe('Anchors', () => {
      const quickBrownFox = 'The quick brown fox'

      it('clicking a heading adds the anchor to the url and scrolls to that anchor', () => {
        cy.contains('h1', quickBrownFox).click()
        cy.url().should('contain', '#the-quick-brown-fox')
        cy.contains('h1', quickBrownFox).then(([h1]) => h1.getBoundingClientRect()).should('have.property', 'top', 0)
      })

      it.skip('shows octothorpe before heading on hover', () => {
        for (let i = 1; i <= 6; i++) {
          cy.get(`h${i}`).contains(quickBrownFox).then((heading) => {
            cy.get(heading).realHover()
            cy.percySnapshot(`Test - Headings - h${i} - hover`)
          })
        }
      })
    })
  })

  describe('Text Styles', () => {
    beforeEach(() => {
      cy.get('h1').contains('Text Styles').scrollIntoView()
    })

    it('Snapshot', () => {
      cy.percySnapshot('Paragraph')
    })
  })

  describe('Code', () => {
    it('Scrolls horizontally for long lines', () => {
      cy.get('pre code').first().scrollIntoView()
      cy.percySnapshot('Code block - horizontal scroll')
    })
  })

  describe('Blockquotes', () => {
    beforeEach(() => {
      cy.get('h1').contains('Blockquotes').scrollIntoView()
    })

    it('Snapshot', () => {
      cy.percySnapshot('Blockquotes')
    })
  })

  describe('Callouts', () => {
    beforeEach(() => {
      cy.get('h1').contains('Callouts').scrollIntoView()
    })

    it('Snapshot', () => {
      cy.percySnapshot('Callouts')
    })
  })

  describe('Lists', () => {
    beforeEach(() => {
      cy.get('h1').contains('Lists').scrollIntoView()
    })

    it('Snapshot', () => {
      cy.percySnapshot('Lists')
    })
  })
})
