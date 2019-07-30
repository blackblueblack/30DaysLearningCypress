/// <reference types="Cypress" />

context("Test simple Flask app API", () => {

  //TODO - change url so that it can work without baseUrl in cypress json 
  //const baseUrl = 'https://flask-rest-api-demo.herokuapp.com'

  const initialUsers = [{
    "username": "intialUser1",
    "password": "initialPassword1"
  }, {
    "username": "intialUser2",
    "password": "initialPassword2"
  }]


const addInitialUsers = () => {
    initialUsers.forEach(addUser)
  }

  const getUsers = () =>
    cy.request({ url: '/users' }).its('body.users');

  const addUser = user =>
    cy.request({
      url: '/register',
      method: 'POST',
      body: user,
    })

  const deleteUser = user =>
    cy.request({
      url: `/users/${user.username}`,
      method: 'DELETE'
    }).then((res) => {
      expect(res.status).to.eq(200)
    })

  const deleteAllUsers = () => {
    getUsers().each(deleteUser)
  }

  const reset = () => {
    deleteAllUsers();
    addInitialUsers();
    
    
  }

  //after and before hooks
  beforeEach(reset)
  //afterEach(reset)

  it('Initial 2 Users are loaded', () => {
    getUsers().should('have.length', 2)
  })

  it('Each user has expected properties', () => {
    getUsers().each(value =>
      expect(value).to.have.all.keys('id', 'username', 'password'))
  })

  it('Returns JSON', () => {
    cy.request('/users').its('headers').its('content-type').should('include', 'application/json')
  })

  //Test which adds a new User and deletes it. 
  it('Adds User and deletes the same User', () => {

    const randomNumber = Cypress._.random(0, 10000);
    const user = { "username": "user" + randomNumber, "password": "1234" + randomNumber };

    addUser(user);
    getUsers().then((res) => {
      //Assert Users array length to verify if new User was added
      expect(res).have.length(3);
      //Assert property of the last User (username) in the array, 
      //to verify if it is in accordance with the new user property. 
      expect(res.slice(-1)[0]).have.property('username', user.username)
    })

    deleteUser(user);
    getUsers().then((res) => {
      //Assert Users array length to verify if new User was removed
      expect(res).have.length(2);
       //Assert property of the last User (username) in the array, 
      //to verify if it is't in acchoradnce with the new user property. 
      expect(res.slice(-1)[0]).not.have.property('username', user.username)
    })
  })

  it("Doesn't accept duplicated Users", () => {

    const user = { "username": "user", "password": "1234" };

    addUser(user);
    //Add the same user (user) again and assert if request failes (status code:400)
    cy.request({
      url: '/register',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    }).then((res => {
      expect(res.status).to.eq(400)
    }))
    //Asserts length of the array of users to verify
    //if duplicated user wasn't added
    getUsers().then((res => {
      expect(res).have.length(3);
    }))
  })
})
