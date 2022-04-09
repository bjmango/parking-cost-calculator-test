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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
Cypress.Commands.add('setDateTime', (type, dateStr, timeStr, meridiem) => {
  let typeStr = null;
  if (type === 'starting') {
    typeStr = 'Starting'
  } else if (type === 'leaving') {
    typeStr = "Leaving"
  }
  cy.get(`input[name="${typeStr}Date"]`).clear().type(dateStr)
  cy.get(`input[name="${typeStr}Time"]`).clear().type(timeStr)
  if (meridiem.toLowerCase() === 'am') {
    cy.get(`input[name="${typeStr}TimeAMPM"]`).first().click()   // AM
  } else if (meridiem === 'pm') {
    cy.get(`input[name="${typeStr}TimeAMPM"]`).last().click()   // PM}
  }
})
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
