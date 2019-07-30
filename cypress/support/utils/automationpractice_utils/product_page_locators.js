/// <reference types="Cypress" />

//LOCATORS
const CLOSE_MODAL_PRODUCT_ADDED = '.cross';
const ADD_TO_CART = '#add_to_cart';
const SIZE_SELECT_FIELD = '#group_1';


//Modal which appears after adding product. 
const CONTINUE_SHOPPING_BUTTON = '.continue';


//METHODS TO GET LOCATORS
const closeModalProductAdded = () => cy.get(CLOSE_MODAL_PRODUCT_ADDED);
const addToCart = () => cy.get(ADD_TO_CART);
const continueShoppingButton = () => cy.get(CONTINUE_SHOPPING_BUTTON);
const sizeSelectField = () => cy.get(SIZE_SELECT_FIELD);


//EXPORT METHODS 
module.exports = {
  closeModalProductAdded, addToCart, continueShoppingButton, sizeSelectField
  }
