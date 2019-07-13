import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'http://automationpractice.com/index.php';

Given('I open automationpractice site', () => {
  cy.visit(url)
})

When('I type product name in search input field', () => {

    cy.get('#search_query_top').type("Dress")
})

Then('I can click element on autocomplete drop-down', () => {
  cy.get('.ac_results').find('li').contains('Dress').click()
})
And('I am redirected to product site', () => {
  cy.url().should('include', 'controller=product');
})

Given('I submit valid or inalid product name', datatable => {

  const table = datatable.hashes();
  table.forEach(row => {
    cy.visit('url');
    cy.get('#search_query_top').type(row.product);
    cy.get('#searchbox > .btn').click();
    cy.get('#search_query_top').clear();
    cy.url().should('include', 'submit_search=');
    cy.get('h1.page-heading').should('contain', 'Search')
  })
})





