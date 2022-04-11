/// <reference types="cypress" />

import textResources from '../fixtures/constants.json'

// todo: text styling verification

describe('GUI elements display and status', () => {
  beforeEach(() => {
    cy.visit('https://www.shino.de/parkcalc/index.php')
  })


  it('Application name should be "Parking cost calculator"', () => {
    const appName = textResources.appName
    cy.get('.PageTitle').should('have.text', appName)
  })

  it('descriptions in the table should follow the requirements', () => {
    const labels = textResources.tableRows.labels
    cy.get('td[class="BodyCopy"]').each(($elm, index, collection) => {
      switch (index) {
        case 0:
          expect($elm.text().trim()).to.eq(labels[0])
          break;
        case 2:
          expect($elm.text().trim()).to.eq(labels[1])
          break;
        case 4:
          expect($elm.text().trim()).to.eq(labels[2])
          break;
        case 6:
          expect($elm.text().trim().toUpperCase()).to.eq(labels[3])
          break;
      }
    })
  })

  it('should have 5 types of parking lots options in the drop-down', () => {
    const parkingLotOptions = textResources.tableRows.chooseParkingLot.options
    cy.get('select[name="ParkingLot"]').children().should('have.length', 5)
      .each((option, index, collection) => {
        const elm = cy.wrap(option)
        switch (index) {
          case 0:
            elm.should('have.text', parkingLotOptions[0])
            break;
          case 1:
            elm.should('have.text', parkingLotOptions[1])
            break;
          case 2:
            elm.should('have.text', parkingLotOptions[2])
            break;
          case 3:
            elm.should('have.text', parkingLotOptions[3])
            break;
          case 4:
            elm.should('have.text', parkingLotOptions[4])
            break;
        }

      })

  })

  it('date inputs value should default to "MM/DD/YYYY"', () => {
    cy.get('input[name="StartingDate"]').should('have.value', 'MM/DD/YYYY').and('be.enabled')
    cy.get('input[name="LeavingDate"]').should('have.value', 'MM/DD/YYYY').and('be.enabled')
  })

  it('time inputs value should default to "12:00" and "AM"', () => {
    cy.get('input[name="StartingTime"]').should('have.value', '12:00').and('be.enabled')
    cy.get('input[name="LeavingTime"]').should('have.value', '12:00').and('be.enabled')
    cy.get('input[name="StartingTimeAMPM"]').first().should('have.value', 'AM').and('be.enabled').and("be.checked")
    cy.get('input[name="StartingTimeAMPM"]').last().should('have.value', 'PM').and('be.enabled').and("not.be.checked")
    cy.get('input[name="LeavingTimeAMPM"]').first().should('have.value', 'AM').and('be.enabled').and("be.checked")
    cy.get('input[name="LeavingTimeAMPM"]').last().should('have.value', 'PM').and('be.enabled').and("not.be.checked")
  })

  it("should have two date pickers and are enabled", () => {
    const hrefStarting = textResources.tableRows.entryDate.href
    const hrefLeaving = textResources.tableRows.leavingDate.href
    cy.get('tr').each(($row, index, collection) => {
      const row = cy.wrap($row)
      switch (index) {
        case 1:
          row.children().each(($child, index, collection) => {
            if (index === 1) {
              cy.wrap($child).within($cell => {
                cy.get('a').should('have.attr', 'href').and('include', hrefStarting)
              })
            }
          })
          break;
        case 2:
          row.children().each(($child, index, collection) => {
            if (index === 1) {
              cy.wrap($child).within($cell => {
                cy.get('a').should('have.attr', 'href').and('include', hrefLeaving)
              })
            }
          })
          break;
      }
    })
  })

  it("the estimated parking cost should default to $0", () => {
    cy.get('td[class="SubHead"]').should('have.text', '$ 0')
  })

  it('the "Calculate" button should be enabled by default', () => {
    const btnText = textResources.button
    cy.get('input[type="submit"]').should("have.value", btnText).and("be.enabled")
  })
})