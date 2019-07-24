/// <reference types="Cypress" />

context('TODO app tests', () => {

  describe('Requests mocking', () => {

    it('Mocking GET response', () => {
 
      //Array which stores mocked payload. 
      let tasksToAdd = []
      //Variable which stores number of tasks to mock
      let numberOfTasksToAdd = 10

      let taskNumber=0
      //Loops which creates expected number of tasks. 
      while (taskNumber < numberOfTasksToAdd) {
        //Variable which stores randomly generated boolean. 
        //This boolean will be used as value for key "completed". 
        //Since it is random, mocked taska will have different values for key "completed"
        let completedValue = Cypress._.sample([true, false])
        //Increase task number
        taskNumber += 1;
        //Variable which stores single task
        let task = {"text": "mocking backend" + taskNumber, "completed": completedValue, "id": taskNumber};
        //Adding task to the array. 
        tasksToAdd.push(task);
      }
  
      cy.server();
      //cy.route mock GET request and its response stored in the variable.
      //Route is aliased so that we can wait for it. 
      cy.route('http://localhost:3000/api/todos', tasksToAdd)
      .as('expandedTodoList')

      cy.visit('http://localhost:5000/')
      //Waiting for route to load. 
      cy.wait('@expandedTodoList')
      //Assert if list of tasks contains expected number of mocked elements. 
      cy.get('.todo-list').children().should('have.length', numberOfTasksToAdd)
    })
  })
})