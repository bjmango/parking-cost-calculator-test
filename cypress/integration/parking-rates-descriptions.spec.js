/// <reference types="cypress" />

import parkingRatesDescription from '../fixtures/constants.json'


describe('Parking Rates Descriptions', () => {
  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })

  it("Application name displays correct", () => {
    const appName = parkingRatesDescription.appName
    cy.get('.PageTitle').should('have.text', appName)
  })

  it("parking rates descriptions should follow requirements", () => {
    const { parkingRates, valetParking, shortTermParking, longTermGarageParking, longTermSurfaceParking, economyLotParking
    } = parkingRatesDescription
    Cypress.$('p[class="BodyCopy"]').each((index, $el, $list) => {
      switch (index) {
        case 0:
          expect($el.innerText).to.eq(parkingRates)
          break;
        case 1:  // Valet Parking
          console.log($el)
          cy.wrap($el).should('have.text', valetParking)
          break;
        case 2:  // Short-Term(hourly) Parking
          console.log($el)
          cy.wrap($el).should('have.text', shortTermParking)
          break;
        case 3:  // Long-Term Garage Parking
          console.log($el)
          cy.wrap($el).should('have.text', longTermGarageParking)
          break;
        case 4:  // Long-Term Surface Parking
          console.log($el)
          cy.wrap($el).should('have.text', longTermSurfaceParking)
          break;
        case 5:  // Economy Lot Parking
          console.log($el)
          cy.wrap($el).should('have.text', economyLotParking)
          break;
      }
    })

    // cy.get('strong').each(elm => {
    //   console.log(elm)
    //   // if (elm.innerText === valetName) {
    //   //   console.log(elm)
    //   // }
    // })

  })
})
