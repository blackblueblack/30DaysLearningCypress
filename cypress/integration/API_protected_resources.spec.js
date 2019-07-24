/// <reference types="Cypress" />

context('Protected endpoints: role-based testing', () => {

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
  //User credentials are taken from separate file (cypress.env.json).
  const authenticateUser = (userRole) =>
    cy.request({
      url: 'http://localhost:4000/users/authenticate',
      method: 'POST',
      body: Cypress.env(userRole)
    }).its('body')
      .then((res) => {
        user = res
      })

  const getUsers = () =>
    cy.request({
      url: 'http://localhost:4000/users',
      auth: {
        bearer: user.token,
      }
    })
  describe('Role: ADMIN', () => {

    before(() => {
      authenticateUser('admin')
    })
    beforeEach(setUser)

    it("Admin can get /users", () => {
      getUsers().then((res => {
        expect(res.status).to.eq(200)
      }))
    })

    it('/users returns json', () => {
      getUsers().its('headers').its('content-type').then((res) => {
        expect(res).to.contain('application/json')
      })
    })

    it('/users array contains expected number of elements', () => {
      getUsers().its('body').should('have.length', 2)
    })

    it('Each user has expected properties', () => {
      getUsers().its('body').each(value =>
        expect(value).to.have.all.keys('id', 'username', 'firstName', 'lastName', 'role'))
    })

    it('Admin has the role: "admin" ', () => {
      cy.request({
        url: 'http://localhost:4000/users/1',
        auth: {
          bearer: user.token,
        },
      }).its('body').then((res) => {
        expect(res).have.property('role', 'Admin')
      })
    })

    it('Admin user has access to all users data', () => {
      const userIndex = [1, 2]
      userIndex.forEach(element => {
        cy.request({
          url: `http://localhost:4000/users/${element}`,
          auth: {
            bearer: user.token,
          },
        }).then((res => {
          expect(res.status).to.eq(200)
        }))
      })
    })
  })

  describe('Role: NORMAL USER', () => {

    before(() => {
      authenticateUser('normalUser')
    })
    beforeEach(setUser)

    it(" Normal user cannot get /users", () => {

      cy.request({
        url: 'http://localhost:4000/users',
        auth: {
          bearer: user.token,
        },
        failOnStatusCode: false
      }).then((res => {
        expect(res.status).to.eq(401)
      }))
    })

    it('Normal user has the role: "User" ', () => {
      cy.request({
        url: 'http://localhost:4000/users/2',
        auth: {
          bearer: user.token,
        },
      }).its('body').then((res) => {
        expect(res).have.property('role', 'User')
      })
    })


    it('Normal user has access to only its data - users/1', () => {
      const userIndex = [1, 2]
      userIndex.forEach(element => {
        cy.request({
          url: `http://localhost:4000/users/${element}`,
          auth: {
            bearer: user.token,
          },
          failOnStatusCode: false
        }).then((res) => {
          if (element == 2) {
            expect(res.status).to.eq(200)
          } else {
            expect(res.status).to.eq(401)
          }
        })

      })
    })
  })

  describe('Role: UNAUTHORIZED USER', () => {

    it(" Unauthorized user cannot get /users", () => {

      cy.request({
        url: 'http://localhost:4000/users',
        failOnStatusCode: false
      }).then((res => {
        expect(res.status).to.eq(401)
      }))
    })

    it('Unauthorized user does not have access to user data', () => {
      const userIndex = [1, 2]
      userIndex.forEach(element => {
        cy.request({
          url: 'http://localhost:4000/users/${element}',
          failOnStatusCode: false
        }).then((res) => {
          expect(res.status).to.eq(401)
        })
      });
    })
  })
})

