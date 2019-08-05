/// <reference types="Cypress" />

//Product page locators. 
const { sizeSelectField } = require('../../support/utils/automationpractice_utils/product_page_locators');

context("automationpractice website - tests with unauthorized user", () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })
 
  describe('Product Page tests', () => {
    it('Product Page: Verify if size input field has pre-selected option', () => {
      cy.clickRandomProduct()
      //Get select size input field.
      //Find its option with title "S". 
      //Verify if "S" option has attribute "selected".
      sizeSelectField().find("[title=S]").should("have.attr", "selected");
    })
  })
})

