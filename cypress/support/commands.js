import '@percy/cypress'
import 'cypress-wait-until'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForLogoAnimations', () => {
  // wait for 4th (3-1) leg of logo to finish animating
  cy.waitUntil(() => {
    for (let i = 0; i < 4; i++) {
      cy.get('nav svg path')
        .eq(i)
        .invoke('attr', 'stroke-dasharray')
        .should((val) => {
          // CI (Chromium) sometimes reports this without units: "1 1" vs "1px 1px"
          const normalized = String(val || '').replaceAll('px', '').trim()
          expect(normalized).to.eq('1 1')
        })
    }

    return true
  })
})

Cypress.Commands.add('waitForImagesLoaded', (options = {}) => {
  const timeout = options.timeout || 60000

  cy.waitUntil(() => {
    return cy.get('body').then($body => {
      const $images = $body.find('img')

      // If no images exist, consider them "loaded"
      if ($images.length === 0) {
        return true
      }

      // Check if all images have loaded
      const allLoaded = Array.from($images).every(img => {
        return img.complete && img.naturalHeight !== 0
      })
      return allLoaded
    })
  }, {
    timeout,
    interval: 500,
    errorMsg: `Images did not finish loading within ${timeout}ms`,
  })
})

// Wait for mobile nav list items to finish Framer Motion animations
// Consider settled when opacity is 1 and transform is identity
Cypress.Commands.add('waitForMobileNavSettled', () => {
  // Menu items settled
  cy.get('[role="dialog"] li').should(($lis) => {
    expect($lis.length, 'nav item count').to.eq(5)
    $lis.each((_, li) => {
      const win = li.ownerDocument && li.ownerDocument.defaultView
      const style = win ? win.getComputedStyle(li) : null
      expect(style, 'computed style present').to.not.be.null
      if (!style) return
      expect(style.opacity, 'opacity').to.eq('1')
      const tf = style.transform
      const settled = tf === 'none' || tf === 'matrix(1, 0, 0, 1, 0, 0)'
      expect(settled, `transform settled exactly: ${tf}`).to.be.true
    })
  })

  // Social icons container settled (this element animates opacity and translateY)
  cy.get('[role="dialog"] [aria-label="GitHub"]').parent().should(($container) => {
    expect($container.length, 'social container').to.eq(1)
    const el = $container[0]
    const win = el.ownerDocument && el.ownerDocument.defaultView
    const style = win ? win.getComputedStyle(el) : null
    expect(style, 'computed style present').to.not.be.null
    if (!style) return
    expect(style.opacity, 'opacity').to.eq('1')
    const tf = style.transform
    const settled = tf === 'none' || tf === 'matrix(1, 0, 0, 1, 0, 0)'
    expect(settled, `social transform settled exactly: ${tf}`).to.be.true
  })
})

// Percy snapshot helper for consistent mobile widths
Cypress.Commands.add('percyMobileSnapshot', (name, options = {}) => {
  cy.percySnapshot(name, { widths: [375], ...options })
})
