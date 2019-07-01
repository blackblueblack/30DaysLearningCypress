/// <reference types="Cypress" />

  //DAY 1
  //Testing search field 
  describe("Product searching", () => {

    beforeEach(() =>{
      cy.visit('http://automationpractice.com/index.php');
    })
    
    it("Search products - valid and invalid input", () => {

      //List which stores inputs and expected results 
      const inputs = [ 
      {product: 'dress', returned_info: 'Sort by'}, 
      {product: 'xxxTT^&LL', returned_info: 'No results'}, 
      {product: ' ', returned_info: 'No results'} ]

     //Loop which iterates over list of inputs
     //submits each input 
     //and verifies expected string visibility 
      inputs.forEach(input => {
        const {product, returned_info} = input
        cy.get('#search_query_top').type(product);
        cy.get('#searchbox > .btn').click();
        cy.url().should('include', 'submit_search=')
        cy.contains(returned_info).should('be.visible')
        cy.get('.search_query').clear()
      })

    //Click search when there is no input 
      cy.get('#searchbox > .btn').click();
      cy.contains('Please enter a search keyword')
    })
})
