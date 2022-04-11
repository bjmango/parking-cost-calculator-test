/// <reference types="cypress"/>

describe("Parking Costs Calculation", () => {
  // Valet Parking
  // $18 per day
  // $12 for five hours or less
  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })

  it('Valet Parking - Should charge $12 when parking 0 minute', () => {
    cy.setDateTime('starting', '04/11/2022', '1:00', 'am')
    cy.setDateTime('leaving', '04/11/2022', '1:00', 'am')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 12.00')
    cy.contains('(0 Days, 0 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $12 when parking 1 minute & cross midnight', () => {
    cy.setDateTime('starting', '4/11/2022', '11:59', 'pm')
    cy.setDateTime('leaving', '4/12/2022', '00:00', 'am')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 12.00')
    cy.contains('(0 Days, 0 Hours, 1 Minutes)')
  })

  it('Valet parking - should charge $12 when parking 1 minute & cross 1999 New Year Eve.', () => {
    cy.setDateTime('starting', '12/31/1999', '11:59', 'pm')
    cy.setDateTime('leaving', '1/01/2000', '00:00', 'am')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 12.00')
    cy.contains('(0 Days, 0 Hours, 1 Minutes)')
  })

  it('Valet parking - should charge $12 when parking 4 hours 59 mins', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/11/2022', '05:59', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 12.00')
    cy.contains('(0 Days, 4 Hours, 59 Minutes)')
  })

  it('Valet parking - should charge $12 when parking 5 hours', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/11/2022', '06:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 12.00')
    cy.contains('(0 Days, 5 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 5 hours 1 min', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/11/2022', '06:01', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 18.00')
    cy.contains('(0 Days, 5 Hours, 1 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 23 hours 59 mins', () => {
    cy.setDateTime('starting', '4/11/2022', '02:00', 'pm')
    cy.setDateTime('leaving', '4/12/2022', '01:59', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 18.00')
    cy.contains('(0 Days, 23 Hours, 59 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 1 day', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/12/2022', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 18.00')
    cy.contains('(1 Days, 0 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $36 when parking 1 day & 1 min', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/12/2022', '01:01', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 36.00')
    cy.contains('(1 Days, 0 Hours, 1 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 1 day & 23 hours & 59 min', () => {
    cy.setDateTime('starting', '4/11/2022', '02:00', 'pm')
    cy.setDateTime('leaving', '4/13/2022', '01:59', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 36.00')
    cy.contains('(1 Days, 23 Hours, 59 Minutes)')
  })

  it('Valet parking - should charge $36 when parking 2 days', () => {
    cy.setDateTime('starting', '4/11/2022', '01:00', 'pm')
    cy.setDateTime('leaving', '4/13/2022', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 36.00')
    cy.contains('(2 Days, 0 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $36 when parking 2 day (leap year Feb.28.2020 - Mar.1.2020)', () => {
    cy.setDateTime('starting', '02/28/2020', '01:00', 'pm')
    cy.setDateTime('leaving', '03/01/2020', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 36.00')
    cy.contains('(2 Days, 0 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 1 day (leap year Feb.29.2020 - Mar.1.2020)', () => {
    cy.setDateTime('starting', '02/29/2020', '01:00', 'pm')
    cy.setDateTime('leaving', '03/01/2020', '01:00', 'pm')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 18.00')
    cy.contains('(1 Days, 0 Hours, 0 Minutes)')
  })

  it('Valet parking - should charge $18 when parking 1 day (regular year Feb.28.2022 - Mar.1.2022)', () => {
    cy.setDateTime('starting', '02/28/2022', '12:00', 'am')
    cy.setDateTime('leaving', '03/01/2022', '12:00', 'am')
    cy.get('input[type="submit"]').click()
    cy.contains('$ 18.00')
    cy.contains('(1 Days, 0 Hours, 0 Minutes)')
  })

})