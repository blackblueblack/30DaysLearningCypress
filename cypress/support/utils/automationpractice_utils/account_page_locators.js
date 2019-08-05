/// <reference types="Cypress" />

//LOCATORS
const SIGN_IN_LINK = '.login';
const LOGIN_EMAIL_INPUT_FIELD = '#email';
const LOGIN_PASSWORD_INPUT_FIELD = '#passwd';
const SUBMIT_LOGIN_BUTTON = '#SubmitLogin';
const MY_WISH_LIST_LINK = '.lnk_wishlist';
const MY_ORDERS_LINK_IKON = '.icon-list-ol'


//METHODS TO GET LOCATORS
const signInLink = () => cy.get(SIGN_IN_LINK);
const loginEmailInputField = () => cy.get(LOGIN_EMAIL_INPUT_FIELD);
const loginPasswordInputField = () => cy.get(LOGIN_PASSWORD_INPUT_FIELD);
const submitLoginButton = () => cy.get(SUBMIT_LOGIN_BUTTON); 
const myAccountWishList = () => cy.get(MY_WISH_LIST_LINK);
const myOrdersLinkIkon = () => cy.get(MY_ORDERS_LINK_IKON)



//EXPORT METHODS 
module.exports = { signInLink, loginEmailInputField, loginPasswordInputField, submitLoginButton, myAccountWishList, myOrdersLinkIkon
  }