/// <reference types="Cypress" />

import '@percy/cypress'

context('Visual testing with Percy', () => {

  beforeEach( () => {

    cy.visit('http://localhost:5000/');
  })

  it('Add new task', () => {

    cy.percySnapshot();
    cy.get('.new-todo').type('New TODO').type('{enter}')
    cy.percySnapshot('Add new task - after');

  })

  it('Edit task', () => {

    cy.percySnapshot();
    cy.get('.view').first().find('label').dblclick();
    cy.get('.edit').clear().type('crazy3').type('{enter}')
    cy.percySnapshot('Edit task - after');
  })
})