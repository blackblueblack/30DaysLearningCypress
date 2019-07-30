// <reference types="Cypress" />

//LOCATORS
const PRODUCT_ADD_TO_CART_BUTTON = '.ajax_add_to_cart_button';

const PRODUCT_ON_MAIN_PAGE = '.homefeatured'

//METHODS TO GET LOCATORS
const productOnMainPage = () => cy.get(PRODUCT_ON_MAIN_PAGE);
const productAddToCartButton = () => cy.get(PRODUCT_ADD_TO_CART_BUTTON)


//EXPORT METHODS 
module.exports = { 
productOnMainPage, productAddToCartButton }