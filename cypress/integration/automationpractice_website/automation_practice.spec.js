/// <reference types="Cypress" />

//Headers locators.
const {categoriesMenu, categoriesMenuMobile, cartOnhoverBlock, cartOnhoverBlockCheckoutButton, searchProductInputField, autocompleteListForSearchProduct, cartProductsQuantity, contactLink} = require ('../../support/utils/automationpractice_utils/header_locators');

//Main page locators. 
const {productAddToCartButton} = require ('../../support/utils/automationpractice_utils/main_page_locators');

//Product page locators. 
const {closeModalProductAdded, addToCart, continueShoppingButton, sizeSelectField} = require ('../../support/utils/automationpractice_utils/product_page_locators');

//Category page locators. 
const {allFiltersCheckboxes} = require ('../../support/utils/automationpractice_utils/category_page_locators');

//Contact page locators.
const {messageField, subjectSelection, emailInputField, orderIdInputField, fileUploadInputField, submitFormButton, alertAfterSubmit} = require ('../../support/utils/automationpractice_utils/contact_page_locators');

//Search result page locators.
const {alertAfterSearchSubmit} = require ('../../support/utils/automationpractice_utils/search_result_page_locators');


context("automationpractice website testing", () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
    cy.fixture("input_data").as("inputData");
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
          categoriesMenu().should('not.be.visible');
          //Click on "Categories" block
          categoriesMenuMobile().click();
          //Verify if list of categories is presented
          //by clicking on first category. 
          categoriesMenu().find('li').first().click();
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
          categoriesMenu().should('be.visible');
          //Verify if categories list is visible 
          //by clicking on its firts element.
          categoriesMenu().children().first().click();
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
        productAddToCartButton().first().click();
        //Close modal which confirms that product has been added.
        closeModalProductAdded().click();
        //Get drop-down cart block and verify if by default it is hidden. 
        //Force the drop-down block to be visible by invoke('show').
        cartOnhoverBlock().should('be.hidden').invoke('show');
        //Click on check out button. 
        cartOnhoverBlockCheckoutButton().click();
        //Assert redirection to new url.
        cy.url().should('include', 'controller=order');
      })

      it('Header: Product searching - valid and invalid input', () => {
        //Getting input data from aliased fixture file
        //and using then() with callback to work with data from this file
        cy.get("@inputData").then((inputData) => {

          //Variable which stores product input data. 
          //Data is taken from fixture file
          const input = inputData.products;

          //Loop which iterates over array of inputs, submits each input
          //and verifies expected string visibility.
          input.forEach(input => {
            const { product, returned_info } = input;
            //Custom command
            cy.searchProduct(product);
            cy.contains(returned_info).should('be.visible')
            searchProductInputField().clear();
          })
        })
        //Click search when there is no input 
        searchProductInputField().type('{enter}');
        //Assert if alert with expected text is visible. 
        alertAfterSearchSubmit().should('contain', 'Please enter a search keyword');
      })

      it('Header: Verify if autocomplete drop-down list for search input field is selectable', () => {
        //Get product search input field
        searchProductInputField().type('dress');
        //Get whole autocomplete drop-down list element
        //and find all <li> tags within it. 
        //Check if there is <li> tag which contains "Dress" text.
        //Click on the returned element.
        autocompleteListForSearchProduct().find('li').contains('Dress').click();
        //Assert url to verify if click on drop-down element redirects to expeted page.
        cy.url().should('include', 'controller=product');
      })

      it('Header: Verify if state of the Cart is kept', () => {
        //Function which asserts state of the Cart containing 1 product.
        const testCartState = () => {
          cy.url().should('include', 'controller=product')
          cartProductsQuantity().first().invoke('text').should('equal', '1')
        }
        //Invoke custom command which navigates to random product page.
        cy.clickRandomProduct();
        //Add selected product to cart
        addToCart().click();
        //Select 'to continue shopping' on modal.
        //Assert state of cart (if it presents correct number).
        continueShoppingButton().click().then(testCartState);
        //Reload page 
        //and assert the Cart's state (should keep previous number of products).
        cy.reload().then(testCartState)
      }) 

    })
  })

  describe('Product Page tests', () => {
    it('Product Page: Verify if size input field has pre-selected option', () => {
      cy.clickRandomProduct()
      //Get select size input field.
      //Find its option with title "S". 
      //Verify if "S" option has attribute "selected".
      sizeSelectField().find("[title=S]").should("have.attr", "selected");
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

  describe('Contact Form Page tests', () => {
    it("Send message with file uploaded", () => {
      //Navigate from Main Page to Contact Form Page.
      contactLink().click();
      //Check redirection by asserting url. 
      cy.url().should('include', 'controller=contact')
      //Fill in all fields. 
      messageField().type('messsssage');
      subjectSelection().select('Webmaster');
      emailInputField().type('test@test.pl');
      orderIdInputField().type('xxxx');
      //Before uploading file assert empty input filed text placeholder. 
      fileUploadInputField().should('contain', 'No file selected');
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
      submitFormButton().click();
      //Assert if url is the same 
      cy.url().should('include', 'controller=contact')
      //Assert alert text 
      alertAfterSubmit().should('contain', 'Your message has been successfully sent to our team.');
    })
  })
})