/// <reference types="Cypress" />

//LOCATORS
const PRODUCT_ON_MAIN_PAGE = '.ajax_add_to_cart_button';
const CATEGORIES_MENU = '.sf-menu';
const CATEGORIES_MENU_MOBILE = '.cat-title';
const SEARCH_PRODUCT_INPUT_FIELD = '#search_query_top';
const AUTOCOMPLETE_LIST_FOR_SEARCH_PRODUCT = '.ac_results';
const CART_PRODUCTS_QUANTITY = '.ajax_cart_quantity';
const CONTACT_LINK = '#contact-link';


//Cart hover over block 
const CART_ONHOVER_BLOCK = '.cart_block';
const CART_ONHOVER_BLOCK_CHECKOUT_BUTTON = '#button_order_cart';

//METHODS TO GET LOCATORS
const productOnMainPage = () => cy.get(PRODUCT_ON_MAIN_PAGE);
const categoriesMenu = () => cy.get(CATEGORIES_MENU);
const categoriesMenuMobile = () => cy.get(CATEGORIES_MENU_MOBILE);
const cartOnhoverBlock = () => cy.get(CART_ONHOVER_BLOCK);
const cartOnhoverBlockCheckoutButton = () => cy.get(CART_ONHOVER_BLOCK_CHECKOUT_BUTTON);
const searchProductInputField = () => cy.get(SEARCH_PRODUCT_INPUT_FIELD);
const autocompleteListForSearchProduct = () => cy.get(AUTOCOMPLETE_LIST_FOR_SEARCH_PRODUCT);
const cartProductsQuantity = () => cy.get(CART_PRODUCTS_QUANTITY)
const contactLink = () => cy.get(CONTACT_LINK);


//EXPORT METHODS 
module.exports = {
  productOnMainPage, categoriesMenu, categoriesMenuMobile, cartOnhoverBlock, cartOnhoverBlockCheckoutButton, searchProductInputField, autocompleteListForSearchProduct, cartProductsQuantity, contactLink}


