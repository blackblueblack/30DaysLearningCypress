/// <reference types="Cypress" />

//Headers locators.
const {contactLink } = require('../../support/utils/automationpractice_utils/header_locators');

//Contact page locators.
const { messageField, subjectSelection, emailInputField, orderIdInputField, fileUploadInputField, submitFormButton, alertAfterSubmit } = require('../../support/utils/automationpractice_utils/contact_page_locators');


context('automationpractice website tests' , () => {
  beforeEach(() => {
    cy.visit('http://automationpractice.com/index.php');
  })

  describe('Contact Page tests', () => {
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
            fileContent,
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

