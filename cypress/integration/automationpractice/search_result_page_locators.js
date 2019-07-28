// <reference types="Cypress" />


//LOCATORS
const ALERT_AFTER_SEARCH_SUBMIT  = '.alert'

//METHODS TO GET LOCATORS
const alertAfterSearchSubmit = () => cy.get(ALERT_AFTER_SEARCH_SUBMIT);


//EXPORT METHODS 
module.exports = { 
  alertAfterSearchSubmit }