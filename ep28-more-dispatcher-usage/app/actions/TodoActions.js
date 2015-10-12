var api = require("../utils/api");
var TodoStore = require("../stores/TodoStore");
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require("../utils/constants");

var TodoActions = {

  addTodo: (todo) => {
    api.addTodo(todo)
       .then( () => {
         TodoActions.getAllTodosAndUpdateStore();
       })
  },

  deleteTodo: (todo) => {
    api.deleteTodo(todo.id)
       .then( () => {
         AppDispatcher.dispatch({
          actionType: Constants.TODO_DELETE,
          todo: todo
        });
       })
  },

  markTodoDone: (todo) => {
    api.markTodoDone(todo)
       .then( () => {
         AppDispatcher.dispatch({
          actionType: Constants.TODO_DONE,
          todo: todo
        });

       })
  },

  markTodoUnDone: (todo) => {
    api.markTodoUnDone(todo)
       .then( () => {
         AppDispatcher.dispatch({
          actionType: Constants.TODO_UNDONE,
          todo: todo
        });
       })
  },

  getAllTodosAndUpdateStore: () => {
    api.getTodos()
       .then( (responseData) => {
         var todos = responseData.todos;
         TodoStore.setTodos(todos);
         AppDispatcher.dispatch({
          actionType: Constants.TODO_ADD
        });
       })
  }

}

module.exports = TodoActions;
