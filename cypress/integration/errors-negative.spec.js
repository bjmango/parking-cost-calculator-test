///<reference types="cypress"/>

import textResources from '../fixtures/constants.json'

describe("Error handling and Negative tests", () => {
  // "dateFormatErrorMsg": "ERROR! Enter A Correctly Formatted Date",
  // "dateErrorMsg": "ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time",

  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })

  it('Error - Valet Parking - Should raise leaving time earlier than starting time error when LeavingTime - StartingTime = 1 day', () => {
    const dateErrorMsg = textResources.dateErrorMsg
    cy.setDateTime('starting', '4/11/2022', '1:00', 'pm')
    cy.setDateTime('leaving', '4/10/2022', '1:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateErrorMsg)
  })

  it('Error - Valet Parking - Should raise leaving time earlier than starting time error when LeavingTime - StartingTime = 1 min', () => {
    const dateErrorMsg = textResources.dateErrorMsg
    cy.setDateTime('starting', '4/11/2022', '01:01', 'pm')
    cy.setDateTime('leaving', '4/11/2022', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateErrorMsg)
  })

  it("Error - Valet Parking - Should raise input Date/Time Format error when the input DATE format is wrong MM/DD/YYYY", () => {
    const dateFormatErrorMsg = textResources.dateFormatErrorMsg
    cy.get('input[type="submit"]').click()
    cy.contains(dateFormatErrorMsg)
  })

  it("Error - Valet Parking - Should raise input Date/Time Format error when the input TIME format is wrong 'ABCD'", () => {
    const dateFormatErrorMsg = textResources.dateFormatErrorMsg
    cy.setDateTime('starting', '4/11/2022', 'abcd', 'pm')
    cy.setDateTime('leaving', '4/12/2022', 'defg', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateFormatErrorMsg)
  })

  it('Error - Valet Parking - Should raise input Date/Time Format error when input Date format is wrong "ABCD"', () => {
    const dateFormatErrorMsg = textResources.dateFormatErrorMsg
    cy.setDateTime('starting', 'abcd', '01:00', 'pm')
    cy.setDateTime('leaving', 'efgh', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateFormatErrorMsg)
  })

  it('Error - Valet Parking - should raise input Date/Time Format error when user input Feb.30', () => {
    const dateFormatErrorMsg = textResources.dateFormatErrorMsg
    cy.setDateTime('starting', '02/28/2020', '01:00', 'pm')
    cy.setDateTime('leaving', '02/30/2020', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateFormatErrorMsg)
  })

  it('Error - Valet Parking - should raise input Date/Time Format error when user inputs Feb.29.2022 (regular year 2022 does not have Feb.29)', () => {
    const dateFormatErrorMsg = textResources.dateFormatErrorMsg
    cy.setDateTime('starting', '02/29/2020', '01:00', 'pm')
    cy.setDateTime('leaving', '03/01/2020', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains(dateFormatErrorMsg)
  })

})