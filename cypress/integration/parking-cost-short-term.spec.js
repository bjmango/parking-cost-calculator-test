/// <reference types="cypress"/>

describe('short term parking cost', () => {
  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })

  it("Short term parking cost - ", () => {
    cy.get('select[name="ParkingLot"]').select('Short')
  })

})