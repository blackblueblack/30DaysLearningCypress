/// <reference types="Cypress" />

context("Test simple Flask app API", () =>{

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
})