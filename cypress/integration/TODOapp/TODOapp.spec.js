/// <reference types="Cypress" />

context('TODO app tests', () => {
  describe('Requests stubbing', () => {
    beforeEach(() => {
      cy.server();
      cy.visit('http://localhost:5000/');
    })

    it('GET /todos - tasks getting request stubbing', () => {
      //Array which stores mocked payload. 
      let tasksToAdd = []
      //Variable which stores number of tasks to mock.
      let numberOfTasksToAdd = 10
      let taskNumber = 0
      //Loops which creates expected number of tasks. 
      while (taskNumber < numberOfTasksToAdd) {
        //Variable which stores randomly generated boolean. 
        //This boolean will be used as value for key "completed". 
        //Since it is random, mocked taska will have different values for key "completed".
        let completedValue = Cypress._.sample([true, false])
        //Increase task number
        taskNumber += 1;
        //Variable which stores single task.
        let task = { "text": "mocking backend" + taskNumber, "completed": completedValue, "id": taskNumber };
        //Adding task to the array. 
        tasksToAdd.push(task);
      }
      //cy.route mocks GET request and its response stored in the variable.
      //Route is aliased so that we can wait for it. 
      cy.route('http://localhost:3000/api/todos', tasksToAdd)
        .as('expandedTodoList')

      cy.visit('http://localhost:5000/')
      //Waiting for route to load. 
      cy.wait('@expandedTodoList')
      //Assert if list of tasks contains expected number of mocked elements. 
      cy.get('.todo-list').children().should('have.length', numberOfTasksToAdd)
    })

    it('POST /todos -  task adding request stubbing', () => {
      //Variable to store new task text. 
      const newTodo = 'Stubbing crazy POST';
      //Variable to store new task id.
      const newTodoId = 100;
      
      //cy.route to manage POST request and its response content.
      cy.route({
        method: 'POST',
        url: '/api/todos',
        response: { id: newTodoId, name: newTodo, isComplete: false }
      }).as('postNewTodo');

      //Get app UI element to add/type new task. Send 'enter'.
      cy.get('.new-todo').type(newTodo).type('{enter}');
      //Wait for stubbed POST response.
      cy.wait('@postNewTodo');
    })

    it('PUT /todos - task update request stubbing', () => {
      //Variable to store updated task name. 
      const updatedTODO = 'updated crazy todo'
      
      //cy.route to manage PUT request and its response content.
      cy.route({
        method: 'PUT',
        url: 'api/todos/1',
        response: { id: 1, name: updatedTODO, isComplete: false }
      }).as('todoUpdate')
      //Get first task availabe and double click.
      cy.get('.view').first().find('label').dblclick()
      //Get task in 'edit' state, clear current text and enter new text. 
      cy.get('.edit').clear().type(updatedTODO).type('{enter}')
      //Wait for stubbed PUT response. 
      cy.wait('@todoUpdate')
    })

    it('DELETE /todos - task deleting request stubbing', () => {
      //cy.route to manage DELETE request and its response content.
      cy.route({
        method: 'DELETE',
        url: 'api/todos/1',
        response: {}
      }).as('todoDeletion')
      
      //Get UI elements - task and its destroy button and click it. 
      cy.get('.view').first().find('button').click({ force: true })
      //Wait for stubbed DELETE response. 
      cy.wait('@todoDeletion')
    })

  })
})