/// <reference types="Cypress" />

//Category page locators. 
const { allFiltersCheckboxes } = require('../../support/utils/automationpractice_utils/category_page_locators');


context("automationpractice website tests", () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })

  describe('Category Page tests', () => {
    it('Category Page: Verify if all filters checkboxes can be checked and unchecked', () => {
      //Custom command 
      cy.clickRandomCategory();
      //Get all filters checkkoxes.
      //Check all checkboxes. 
      //Get parent of each checkbox. 
      //Verify if parent of each checkbox has class 'checked' which is added when element is checked.
      allFiltersCheckboxes().check().parent().should('have.class', 'checked');
      //Get all filters checkkoxes.
      //Uncheck all checkboxes. 
      //Get parent of each checkbox. 
      //Verify if parent of each checkbox doesn't have class 'checked' which is removed when element is unchecked.
      allFiltersCheckboxes().uncheck().parent().should('not.have.class', 'checked');
    })

    it('Category Page: Random checkbox checking and unchecking', () => {
      //Custom command 
      cy.clickRandomCategory();
      //Get lenght of all checkboxes, 
      allFiltersCheckboxes().its('length').then(($lenght) => {
        //Create variable with generated random naumber. 
        //Random number is generated for range from 0 to checkboxes list length - 1
        const randomNumber = Cypress._.random(0, $lenght);

        //From list of checkboxes select 1 random checkbox. 
        //Check it and assert if its parent has 'checked' class. 
        //Use callback function to store parent
        allFiltersCheckboxes().eq(randomNumber).check()
          .parent().should('have.class', 'checked').then(($checkbox) => {
            //Since '$checkbox" stores parent of tested checbox,
            //we need to find descendent checkbox again, 
            //uncheck it and assert if it no longer contain 'checked' class. 
            cy.get($checkbox).find('.checkbox').
              uncheck().should('not.have.class', 'checked');
          })
      })
    })
  })
})

