import { Given, And, Then, When } from "cypress-cucumber-preprocessor/steps";

const url = 'http://automationpractice.com/index.php';

Given('I open practiceautomation site', () => {
  cy.visit(url)
})

When('I type product name in search input field', () => {
  cy.get('#search_query_top').type('dress');

})

Then('I can click element on autocomplete drop-down', () => {
  cy.get('.ac_results').find('li').contains('Dress').click()
})

And('I am redirected to procut site', () => {
  cy.url().should('include', 'controller=product');
})





