var api = require("../utils/api");
var TodoStore = require("../stores/TodoStore");

var TodoActions = {

  addTodo: (todo) => {
    console.log("adding TODO");
    api.addTodo(todo)
       .then( () => {
         console.log("Added TODO successfully");
         TodoActions.getAllTodos();
       })
  },

  deleteTodo: (todo) => {
    console.log("Deleting TODO");
    api.deleteTodo(todo.id)
       .then( () => {
         console.log("Deleted TODO successfully");
         TodoActions.getAllTodos();
       })
  },

  markTodoDone: (todo) => {
    console.log("Marking TODO as done");
    api.markTodoDone(todo)
       .then( () => {
         console.log("marked TODO as done successfully");
         TodoStore.markTodoDone(todo);
       })
  },

  markTodoUnDone: (todo) => {
    console.log("Marking TODO as undone");
    api.markTodoUnDone(todo)
       .then( () => {
         console.log("marked TODO as undone successfully");
         TodoStore.markTodoUnDone(todo);
       })
  },

  getAllTodos: () => {
    console.log("Performing getAllTodos");
    api.getTodos()
       .then( (responseData) => {
         var todos = responseData.todos;
         console.log("new todos", todos);
         TodoStore.setTodos(todos);
       })
  }

}

module.exports = TodoActions;
