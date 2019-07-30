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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


import 'cypress-file-upload'

import * as headerLocators from './utils/automationpractice_utils/header_locators'

import * as mainPageLocators from './utils/automationpractice_utils/main_page_locators'

//Click random category on Website Header to navigate to Category Page. 
Cypress.Commands.add("clickRandomCategory", () => {
  headerLocators.categoriesBlockMenu().find('ul').first().children().its('length').then(($lenght) => {
    const randomNumber = Cypress._.random(0, $lenght - 1);
    headerLocators.categoriesBlockMenu().find('ul').first().children().eq(randomNumber).click();
    cy.url().should('include', 'controller=category');
  })
})

//Click random product on Main Page to navigate to Product Page. 
Cypress.Commands.add("clickRandomProduct", () => {
  mainPageLocators.productOnMainPage().children().its('length').then(($lenght) => {
    const randomNumber = Cypress._.random(0, $lenght - 1);
    mainPageLocators.productOnMainPage().children().eq(randomNumber).click();
    cy.url().should('include', 'controller=product');
  })
})

//Search product using 'search' field in Website Header (type productName and submit)
Cypress.Commands.add('searchProduct', (productName) => {
  headerLocators.searchProductInputField().type(productName).type('{enter}')
  //cy.get('#searchbox > .btn').click();
  cy.url().should('include', 'submit_search=');
})


