var api = require("../utils/api");
var TodoStore = require("../stores/TodoStore");
var AppDispatcher = require('../dispatcher/AppDispatcher');

var TodoActions = {

  addTodo: (todo) => {
    console.log("adding TODO");
    api.addTodo(todo)
       .then( () => {
          api.getTodos()
             .then( (responseData) => {
               var todos = responseData.todos;
               console.log("All todos", todos);
               TodoStore.setTodos(todos);
             })
       })
       .then( () => {
         console.log("Added TODO successfully");
         AppDispatcher.dispatch({
          actionType: 'TODO_ADD'
         });
       })
  },

  deleteTodo: (todo) => {
    console.log("Deleting TODO");
    api.deleteTodo(todo.id)
       .then( () => {
         console.log("Deleted TODO successfully");
         AppDispatcher.dispatch({
          actionType: 'TODO_DELETE',
          todo: todo
        });
       })
  },

  markTodoDone: (todo) => {
    console.log("Marking TODO as done");
    api.markTodoDone(todo)
       .then( () => {
         console.log("marked TODO as done successfully");
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
         AppDispatcher.dispatch({
          actionType: 'TODO_UNDONE',
          todo: todo
        });
       })
  },




}

module.exports = TodoActions;
