/// <reference types="Cypress" />

//Since tests for different website are mixed in this spec.js,  organization of tests can differ form best practices. The goal of this file is to collect testing excercises for different UI elements and different approach. 

context('Special UI elements testing', () => {

  it('Slider testing', () => {
    cy.visit('https://the-internet.herokuapp.com/horizontal_slider');
    //Get slider and invoke 'val' method on it. 
    //Val method is invoked with integer value which is expected to be selected on slider. 
    //Trigger command triggers event ('change') on slider value.
    cy.get('input[type=range]').invoke('val', 5).trigger('change');
    //Assert text value displayed on slider. 
    cy.get('#range').should('have.text', '5');
  })

  it('Compare DOM options list with required list', () => {
    //Getting data file and aliasing it for later usage (data file contains required list of speed options)
    cy.fixture('demoqa_site_data').as('demoqa_site_data')

    cy.visit('https://demoqa.com/selectmenu/');
    //Gettting aliased data and returning it with then() callback function. 
    cy.get('@demoqa_site_data').then((demoqadata) => {

      //Variable which stores required speed options (taken from fixture file). 
      const requiredSpeedOptions = demoqadata.speedOptionsList;
      //Variable which collects speed options retrieved from DOM list. 
      var availableSpeedOptions = [];
      //Loop which collect option's text and append it to the list. 
      cy.get('#speed>option').each(($elem) => {
        availableSpeedOptions.push($elem.text())
      }).then(() => {
        //Assert if list of DOM speed options is in accordance with required speed list option. 
        expect(availableSpeedOptions).to.be.eql(requiredSpeedOptions)
      })
    })
  })
})




