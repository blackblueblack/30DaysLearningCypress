/// <reference types="Cypress" />

//Account page locators. 
const { myAccountWishList, myOrdersLinkIkon } = require('../../support/utils/automationpractice_utils/account_page_locators');

context('automationpractice website tests', () => {

  const userData = Cypress.env('automationPracticeUser');
  const loginCookie = Cypress.env('loginCookiAutomationPractice');

  describe("Log in on different resolutions", () => {

    beforeEach( () => {
      cy.clearCookiesCustom();
    })

    const sizesPhones = ['iphone-6', 'iphone-5', 'ipad-mini', 'ipad-2']
    sizesPhones.forEach((size) => {
  
      it(`Can log in on different devices: ${size}`, () => {
        cy.visit('http://automationpractice.com/index.php');
        cy.viewport(size);
        cy.login(userData.userEmail, userData.userPassword);
      })
    })
  })
  
  describe('My account page - logged user can access its account tabs', () => {
    before(() => {
      cy.clearCookiesCustom();
      cy.login(userData.userEmail, userData.userPassword);
    })

    beforeEach(() => {
      //Keep cookies so that User is logged in during all tests. 
      Cypress.Cookies.preserveOnce(loginCookie)
      cy.visit('http://automationpractice.com/index.php?controller=my-account');
    })

    //Verify if you can access 'my vish' tab. 
    it('My wish list - is accessible when User is logged in', () => {
      myAccountWishList().click();
      cy.url().should('include', 'controller=mywishlist')
    })

    //Verify if you can access 'my orders' tab. 
    it('My orders list - is accessible when User is logged in', () => {
      myOrdersLinkIkon().click();
      cy.url().should('include', 'controller=history')
    })
  })
})




