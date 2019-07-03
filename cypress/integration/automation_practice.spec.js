/// <reference types="Cypress" />


context("automationpractice website testing", () => {

  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })


  describe('Main page tests', () => {

    it('Main page - verify if "View my shopping cart" drop-down is displayed on hover and "Check out" button can be clicked', () => {

      //Get all "Add to cart buttons" from main page
      //and click on firts button to add product to cart.
      cy.get('.ajax_add_to_cart_button').first().click();

      //Close modal which confirms that product has been added.
      cy.get('.cross').click();

      //Get drop-down cart block and verify if by default it is hidden. 
      //Force the drop-down block to be visible by invoke('show').
      cy.get('.cart_block').should('be.hidden').invoke('show');

      //Click on check out button. 
      cy.get('#button_order_cart').click();

      //Assert redirection to new url.
      cy.url().should('include', 'controller=order');

    })
  })

  describe('Product searching', () => {

    it('Product searching - valid and invalid input', () => {

      //List which stores inputs and expected results 
      const inputs = [
        { product: 'dress', returned_info: 'Sort by' },
        { product: 'xxxTT^&LL', returned_info: 'No results' },
        { product: ' ', returned_info: 'No results' }]

      //Loop which iterates over list of inputs
      //Submits each input 
      //And verifies expected string visibility 
      inputs.forEach(input => {
        const { product, returned_info } = input;
        cy.get('#search_query_top').type(product);
        cy.get('#searchbox > .btn').click();
        cy.url().should('include', 'submit_search=');
        cy.contains(returned_info).should('be.visible');
        cy.get('.search_query').clear();
      })

      //Click search when there is no input 
      cy.get('#searchbox > .btn').click();
      cy.contains('Please enter a search keyword');
    })

    it('Product searching - verify if autocomplete drop-down list for search input field is selectable', () => {

      //Get product search input field
      cy.get('#search_query_top').type('dress');

      //Get whole autocomplete drop-down list element
      //And find all <li> tags within it
      //Check if there is <li> tag which contains "Dress" text
      //Click on the returned element
      cy.get('.ac_results').find('li').contains('Dress').click();

      //Assert url to verify if click on drop-down element redirects to expeted page
      cy.url().should('include', 'controller=product');

    })

  })
  describe('Product page tests', () => {

    it('Product page - verify if size input field has pre-selected option', () => {

      //Click first product form home page products list
      cy.get(".replace-2x.img-responsive").first().click()

      //Get select size input field and
      //Find its option with title "S" 
      //Verify if "S" option has attribute "selected"
      cy.get("#group_1").find("[title=S]").should("have.attr", "selected")

    })

  })
})

