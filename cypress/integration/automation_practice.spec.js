/// <reference types="Cypress" />

context("automationpractice website testing", () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })

  describe('Website Header tests', () => {
    //HEADER - MOBILE TESTS 
    context('Header - mobile', () => {

      const sizesPhones = ['iphone-6', 'iphone-5']

      sizesPhones.forEach((size) => {
        it(`Should display mobile menu on screen size: ${size}`, () => {
          //Change screen size according value from the array. 
          cy.viewport(size);
          //Check if categories list in menu is not visible 
          cy.get('.sf-menu').should('not.be.visible');
          //Click on "Categories" block
          cy.get('.cat-title').click();
          //Verify if list of categories is presented
          //by clicking on first category. 
          cy.get('.sf-menu').find('li').first().click();
          //Assert new url. 
          cy.url().should('include', 'controller=category');
        })
      })

      const sizesTablets = ['ipad-mini', 'ipad-2']

      sizesTablets.forEach((size) => {
        it(`Shouldn't display mobile menu on screen size: ${size}`, () => {
          //Change screen size according value from the array. 
          cy.viewport(size);
          //Check if categories block menu is not visible 
          cy.get('.cat-title').should('not.be.visible');
          //Verify if categories list is visible 
          //by clicking on its firts element.
          cy.get('.sf-with-ul').first().click();
          //Assert new url. 
          cy.url().should('include', 'controller=category');
        })
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
          //Custom command
          cy.searchProduct(product);
          cy.contains(returned_info).should('be.visible')
          cy.get('.search_query').clear();
        })
        //Click search when there is no input 
        cy.get('#searchbox > .btn').click();
        cy.get('.alert').should('contain', 'Please enter a search keyword');
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
      cy.clickRandomProduct()
      //Get select size input field.
      //Find its option with title "S". 
      //Verify if "S" option has attribute "selected".
      cy.get("#group_1").find("[title=S]").should("have.attr", "selected");
    })
  })

  describe('Category Page tests', () => {
    it('Category Page: Verify if all filters checkboxes can be checked and unchecked', () => {
      //Custom command 
      cy.clickRandomCategory();
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
      //Custom command 
      cy.clickRandomCategory();
      //Get lenght of all checkboxes, 
      cy.get('.checkbox').its('length').then(($lenght) => {
        //Create variable with generated random naumber. 
        //Random number is generated for range from 0 to checkboxes list length - 1
        const randomNumber = Cypress._.random(0, $lenght);

        //From list of checkboxes select 1 random checkbox. 
        //Check it and assert if its parent has 'checked' class. 
        //Use callback function to store parent
        cy.get('.checkbox').eq(randomNumber).check()
          .parent().should('have.class', 'checked').then(($checkbox) => {
            //Since '$checkbox" stores parent of tested checbox,
            //we need to find descendent checkbox again, 
            //uncheck it and assert if it no longer contain 'checked' class. 
            cy.get($checkbox).find('.checkbox').
              uncheck().should('not.have.class', 'checked');
          })
      })
    })
    //TOD0
    // // it('Slider', () => {
    // //    cy.clickRandomCategory()
    // //    cy.get('.ui-slider-handle').first().invoke('val', 25).trigger('mousemove').trigger('mousedown')
    // })
  })

  describe('Contact Form Page tests', () => {
    it("Send message with file uploaded", () => {
      //Navigate from Main Page to Contact Form Page.
      cy.contains('Contact us').click();
      //Check redirection by asserting url. 
      cy.url().should('include', 'controller=contact')
      //Fill in all fields. 
      cy.get('#message').type('messsssage');
      cy.get('#id_contact').select('Webmaster');
      cy.get('#email').type('test@test.pl');
      cy.get('#id_order').type('xxxx');
      //Before uploading file assert empty input filed text placeholder. 
      cy.get('.filename').should('contain', 'No file selected');
      //Get file to upload from fixture. 
      //Get file upload input field. 
      //Provide its properties. 
      cy.fixture('file_to_upload.txt', 'base64').then(fileContent => {
        cy.get('#fileUpload').upload(
          {
            fileName: 'file_to_upload.txt',
            mimeType: 'text'
          },

          {
            uploadType: 'input'
          });
      })
      //Check if file is uploaded by asserting input filed text. 
      cy.get('.filename').should('contain', 'file_to_upload.txt');
      //Submit form. 
      cy.get("#submitMessage").click();
      //Assert if url is the same 
      cy.url().should('include', 'controller=contact')
      cy.get('.alert').should('contain', 'Your message has been successfully sent to our team.');
    })
  })
})