/// <reference types="Cypress" />

//The goal of this file is to collect testing excercises for different UI elements and different approach. 
//Tests for different website are mixed in this spec.js and their organization can differ form best practices.


context.skip('Special UI elements testing', () => {
  describe('the-internet app tests', () => {

    const baseUrl = 'https://the-internet.herokuapp.com/'

    it('Selecting value on slider', () => {
      cy.visit(`${baseUrl}horizontal_slider`);
      //Get slider and invoke 'val' method on it. 
      //Val method is invoked with integer value which is expected to be selected on slider. 
      //Trigger command triggers event ('change') on slider value.
      cy.get('input[type=range]').invoke('val', 5).trigger('change');
      //Assert text value displayed on slider. 
      cy.get('#range').should('have.text', '5');
    })

    it('Accepting alert', () => {
      cy.visit(`${baseUrl}javascript_alerts`);
      //Click button which invokes alert.
      //window.confirm() is called by app when clicling button. 
      cy.contains('Click for JS Confirm').click();

      //Emit cypress 'window:confirm' event to control alert behaviour. 
      //Cypress event - 'window:confirm' fires event when 'window.confirm()' is called by app. 
      //Returning true accepts alert, false declines. 
      cy.on('window:confirm', (str) => {
        expect(str).to.eq('I am a JS Confirm');
        return true;
      })
    })

    it('Switching context to iFrame', () => {
      cy.visit(`${baseUrl}iframe`)
      //Get iFrame by id and store it with then() callback function to continue work with it. 
      cy.get('#mce_0_ifr').then($iframe => {
        //Variable which stores iFrame body.
        const body = $iframe.contents().find('body')
        //Wrap body and create alias for it. 
        cy.wrap(body).as('iFrame');
        //Assert if iFrame body text contains expected placeholder. 
        cy.get('@iFrame').should('contain', 'Your content goes here.')
      })
    })
  })

  describe('demoqa app tests', () => {

    beforeEach(() => {
      cy.visit('https://demoqa.com/selectmenu/');
      //Getting data file and aliasing it for later usage. 
      //Data file contains required list of speed options. 
      cy.fixture('demoqa_site_data').as('demoqa_site_data');
    })

    it('[Select menu list] contains all expected elements', () => {
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
          expect(availableSpeedOptions).to.be.eql(requiredSpeedOptions);
        })
      })
    })

    it('Can select random element from select menu', () => {
      //Use demoqa site data - return it using then() callbackfunction. 
      cy.get('@demoqa_site_data').then((demoqadata) => {
        //Variable which stores speed value randomly selected from demoqa site data. 
        let randomSpeedValue = Cypress._.sample(demoqadata.speedOptionsList)
        //Click on select menu.    
        cy.get('#speed-button').click()
        //Assert if expanded select menu list is visible. 
        cy.get('#speed-menu').should('be.visible')
        //Click speed value.
        cy.get('li').contains(randomSpeedValue).click().then(() => {
          //Assert if expanded select menu list is not visible. 
          cy.get('#speed-menu').should('not.be.visible')
        })
      })
    })
  })
})




