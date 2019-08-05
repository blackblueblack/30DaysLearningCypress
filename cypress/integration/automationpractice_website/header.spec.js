/// <reference types="Cypress" />

//Headers locators.
const { categoriesMenu, categoriesMenuMobile, cartOnhoverBlock, cartOnhoverBlockCheckoutButton, searchProductInputField, autocompleteListForSearchProduct, cartProductsQuantity } = require('../../support/utils/automationpractice_utils/header_locators');

//Main page locators. 
const { productAddToCartButton } = require('../../support/utils/automationpractice_utils/main_page_locators');

//Product page locators. 
const { closeModalProductAdded, addToCart, continueShoppingButton} = require('../../support/utils/automationpractice_utils/product_page_locators');

//Search result page locators.
const { alertAfterSearchSubmit } = require('../../support/utils/automationpractice_utils/search_result_page_locators');

context("automationpractice website tests", () => {
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
      it('Header: "View my shopping cart" drop-down is displayed on hover and "Check out" button can be clicked', () => {
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

      it('Header: Autocomplete drop-down list for search input field is selectable', () => {
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

      it('Header: State of the Cart is kept', () => {
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
})
