/// <reference types="Cypress" />

context('Protected endpoints testing', () => {

  let user

  //Method to set the User before visiting the page. 
  //This way app thinks it is already authenticated. 
  const setUser = () => {
    cy.visit('http://localhost:8080', {
      onBeforeLoad(win) {
        // and before the page finishes loading
        // set the user object in local storage
        win.localStorage.setItem('user', JSON.stringify(user))
      },
    })
  }
  //Method  to authenticate User. 
    //User credentials are taken from separate file (cypress.env.json)
    const getAdmin = (userRole) =>
      cy.request({
        url: 'http://localhost:4000/users/authenticate',
        method: 'POST',
        body: Cypress.env(userRole)
      }).its('body')
        .then((res) => {
          user = res
        })

  describe('Admin role testing', () => {

    beforeEach(() => {
      getAdmin('admin')
    })
    beforeEach(setUser)

    it("Admin can get /users", () => {

      cy.request({
        url: 'http://localhost:4000/users',
        auth: {
          bearer: user.token,
        },
      }).then((res => {
        expect(res.status).to.eq(200)
      }))
    })

    it("List of users contains expected number of elements", () => {
      cy.request({
        url: 'http://localhost:4000/users',
        auth: {
          bearer: user.token,
        },
      }).its('body').should('have.length', 2)
    })
  })
})
