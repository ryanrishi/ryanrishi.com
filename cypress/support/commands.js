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
      cy.get('nav svg path').eq(i).invoke('attr', 'stroke-dasharray').should('eq', '1px 1px')
    }

    return true
  })
})
