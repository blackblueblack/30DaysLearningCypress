// <reference types="Cypress" />

//LOCATORS
const MESSAGE_FIELD = '#message';
const SUBJECT_SELECTION = '#id_contact';
const EMAIL_INPUT_FIELD = '#email';
const ORDER_ID_INPUT_FIELD = '#id_order';
const FILE_UPLOAD_INPUT_FIELD = '.filename';
const SUBMIT_FORM_BUTTON = '#submitMessage';
const ALERT_AFTER_SUBMIT  = '.alert'

//METHODS TO GET LOCATORS
const messageField = () => cy.get(MESSAGE_FIELD);
const subjectSelection = () => cy.get(SUBJECT_SELECTION);
const emailInputField = () => cy.get(EMAIL_INPUT_FIELD);
const orderIdInputField = () => cy.get(ORDER_ID_INPUT_FIELD);
const fileUploadInputField = () => cy.get(FILE_UPLOAD_INPUT_FIELD); 
const submitFormButton = () => cy.get(SUBMIT_FORM_BUTTON);
const alertAfterSubmit = () => cy.get(ALERT_AFTER_SUBMIT)



//EXPORT METHODS 
module.exports = { 
  messageField, subjectSelection, emailInputField, orderIdInputField, fileUploadInputField, submitFormButton, alertAfterSubmit
  
 }
