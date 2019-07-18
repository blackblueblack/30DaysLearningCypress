/// <reference types="Cypress" />

context("Test simple Flask app API", () => {

  it("Test GET method and perform assertion on the response - single product", () => {
    cy.request('https://flask-rest-api-demo.herokuapp.com/product/motorbike').then((res) => {
      //Assert product 'price' property
      expect(res.body.product[0]).has.property('price', 599.99);
    })
  })

  it("Test GET method and perform assertion on the response - array of users", () => {
    cy.request('https://flask-rest-api-demo.herokuapp.com/users').then((res) => {
      //Assert array length 
      expect(res.body.users).has.length(5);
      //Assert if the first element of the response array has property 'username' equal 'test_1'
      expect(res.body.users[0]).has.property('username', 'test_1');
      //Assert if the first element of the response array doesn't have property 'price'
      expect(res.body.users[0]).not.have.property('price');
    })
  })

  it("Create and delete User - assert messages", () => {
    const username = 'Test_A'
    const password = '123'

    //Create a new User and assert if expected message is returned
    cy.request({
      url: 'https://flask-rest-api-demo.herokuapp.com/register',
      method: 'POST',
      body: {
        "username": username,
        "password": password
      }
    }).then((res) => {
      expect(res.body.message).eq('User successfully added to the database!')
    })

    //Delete User and assert if expected message is returned
    cy.request({
      url: `https://flask-rest-api-demo.herokuapp.com/users/${username}`,
      method: 'DELETE'
    }).then((res) => {
      expect(res.body.message).eq(`User ${username} was successfully deleted from database!`)
    })
  })
})