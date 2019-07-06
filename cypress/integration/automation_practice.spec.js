/// <reference types="Cypress" />


context("automationpractice website testing", () => {

  beforeEach(() => {

    cy.visit('http://automationpractice.com/index.php');


  })

  describe('Website Header tests', () => {

    //HEADER - MOBILE TESTS 
    context('Header - mobile', () => {

      beforeEach(() => {

        cy.viewport('iphone-6')
      })

      it(`Should display mobile menu on mobile resolution`, () => {

        cy.get('.sf-menu').should('not.be.visible');
        cy.get('.cat-title').click();
        cy.get('.sf-menu').should('be.visible');

      })

    })


    //HEADER - DESKTOP TESTS 
    context('Header - desktop', () => {

      it('Header: Verify if "View my shopping cart" drop-down is displayed on hover and "Check out" button can be clicked', () => {

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

      it('Header: Product searching - valid and invalid input', () => {

        //List which stores inputs and expected results 
        const inputs = [
          { product: 'dress', returned_info: 'Sort by' },
          { product: 'xxxTT^&LL', returned_info: 'No results' },
          { product: ' ', returned_info: 'No results' }]

        //Loop which iterates over list of inputs, 
        //submits each input 
        //and verifies expected string visibility 
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

      it('Header: Verify if autocomplete drop-down list for search input field is selectable', () => {

        //Get product search input field
        cy.get('#search_query_top').type('dress');

        //Get whole autocomplete drop-down list element
        //and find all <li> tags within it. 
        //Check if there is <li> tag which contains "Dress" text.
        //Click on the returned element.
        cy.get('.ac_results').find('li').contains('Dress').click();

        //Assert url to verify if click on drop-down element redirects to expeted page
        cy.url().should('include', 'controller=product');

      })


    })

  })

  describe('Product Page tests', () => {

    it('Product Page: Verify if size input field has pre-selected option', () => {

      //Click first product form home page products list
      cy.get(".replace-2x.img-responsive").first().click()

      //Get select size input field.
      //Find its option with title "S". 
      //Verify if "S" option has attribute "selected".
      cy.get("#group_1").find("[title=S]").should("have.attr", "selected")

    })

  })

  describe('Category Page tests', () => {

    it('Category Page: Verify if all filters checkboxes can be checked and unchecked', () => {

      //Click first category from menu on main page.
      cy.get('.sf-with-ul').first().click();

      //Verify if User was redirected to the new page.
      cy.url().should('include', 'controller=category');

      //Get all filters checkkoxes.
      //Check all checkboxes. 
      //Get parent of each checkbox. 
      //Verify if parent of each checkbox has class 'checked' which is added when element is checked.
      cy.get('.checkbox').check().parent().should('have.class', 'checked');


      //Get all filters checkkoxes.
      //Uncheck all checkboxes. 
      //Get parent of each checkbox. 
      //Verify if parent of each checkbox doesn't have class 'checked' which is removed when element is unchecked.
      cy.get('.checkbox').uncheck().parent().should('not.have.class', 'checked');

    })

    it('Category Page: Random checkbox checking and unchecking', () => {

      //Function to generate random number 
      const randomGenerator = (number) => {
        return Math.round(Math.random() * (number - 1))
      }

      //Click first category from menu on main pagep
      cy.get('.sf-with-ul').first().click();

      //Verify if User was redirected to the new page
      cy.url().should('include', 'controller=category');


      //Get lenght of all checkboxes, 
      cy.get('.checkbox').debug().its('length').then(($lenght) => {


        //Create variable with generated random naumber. 
        //Random number is generated for range from 0 to checkboxes list length - 1
        const listElementNumber = randomGenerator($lenght);


        //From list of checkboxes select 1 random checkbox. 
        //Check it and assert if its parent has 'checked' class. 
        //Use callback function to store its 
        cy.get('.checkbox').eq(listElementNumber).check()
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






