/// <reference types="cypress" />

import textResources from '../fixtures/constants.json'


describe('Parking Rates Descriptions', () => {
  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })

  it("Application name displays correct", () => {
    const appName = textResources.appName
    cy.get('.PageTitle').should('have.text', appName)
  })

  it("Parking rates descriptions should follow requirements", () => {
    const { parkingRates, valetParking, shortTermParking, longTermGarageParking, longTermSurfaceParking, economyLotParking
    } = textResources
    Cypress.$('p[class="BodyCopy"]').each((index, $el, $list) => {
      switch (index) {
        case 0:
          expect($el.innerText).to.eq(parkingRates)
          break;
        case 1:  // Valet Parking
          cy.wrap($el).should('have.text', valetParking)
          break;
        case 2:  // Short-Term(hourly) Parking
          cy.wrap($el).should('have.text', shortTermParking)
          break;
        case 3:  // Long-Term Garage Parking
          cy.wrap($el).should('have.text', longTermGarageParking)
          break;
        case 4:  // Long-Term Surface Parking
          cy.wrap($el).should('have.text', longTermSurfaceParking)
          break;
        case 5:  // Economy Lot Parking
          cy.wrap($el).should('have.text', economyLotParking)
          break;
      }
    })
  })

  it('Footer message should follow the requirement', () => {
    const footerMsg = textResources.footerMsg
    cy.get('i').should('have.text', footerMsg)
  })
})
