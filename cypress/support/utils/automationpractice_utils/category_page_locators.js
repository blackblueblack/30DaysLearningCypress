// <reference types="Cypress" />

//LOCATORS
const ALL_FILTERS_CHECKBOXES = '.checkbox';

//METHODS TO GET LOCATORS
const allFiltersCheckboxes = () => cy.get(ALL_FILTERS_CHECKBOXES);


//EXPORT METHODS 
module.exports = { 
allFiltersCheckboxes }