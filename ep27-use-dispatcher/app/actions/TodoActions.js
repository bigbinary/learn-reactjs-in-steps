var api = require("../utils/api");
var TodoStore = require("../stores/TodoStore");
var AppDispatcher = require('../dispatcher/AppDispatcher');

var TodoActions = {

  addTodo: (todo) => {
    console.log("adding TODO");
    api.addTodo(todo)
       .then( () => {
         console.log("Added TODO successfully");
         TodoActions.getAllTodosAndUpdateStore();
       })
  },

  deleteTodo: (todo) => {
    console.log("Deleting TODO");
    api.deleteTodo(todo.id)
       .then( () => {
         console.log("Deleted TODO successfully");
         TodoStore.deleteTodo(todo);
       })
  },

  markTodoDone: (todo) => {
    console.log("Marking TODO as done");
    api.markTodoDone(todo)
       .then( () => {
         console.log("marked TODO as done successfully");
         //TodoStore.markTodoDone(todo);
         AppDispatcher.dispatch({
          actionType: 'TODO_DONE',
          todo: todo
        });

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

  getAllTodosAndUpdateStore: () => {
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
