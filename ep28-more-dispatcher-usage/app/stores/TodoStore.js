var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require("../utils/constants");

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case Constants.TODO_DONE:
      TodoStore.markTodoDone(action.todo);
      break;

    case Constants.TODO_UNDONE:
      TodoStore.markTodoUnDone(action.todo);
      break;

    case Constants.TODO_DELETE:
      TodoStore.deleteTodo(action.todo);
      break;

    case Constants.TODO_ADD:
      TodoStore.getTodos();
      break;
  }

});

var _todos = {};
var _callback;

var TodoStore = {

  deleteTodo: (todo) => {
    var newTodos = _todos.filter( (t) => {
      return t.id != todo.id
    } )
    _todos = newTodos;
    _callback(_todos);
  },

  markTodoDone: (todo) => {
   var _todo = _todos.filter((t) => {
      return t.id === todo.id;
    })[0];

    _todo.done = true;
    _callback(_todos);
  },

  markTodoUnDone: (todo) => {
   var _todo = _todos.filter((t) => {
      return t.id === todo.id;
    })[0];

    _todo.done = false;
    _callback(_todos);
  },

  setTodos: (todos) => {
    _todos = todos;
    console.log("TodoStore", TodoStore.getTodos());
    _callback(todos);
  },

  getTodos: () => {
    return _todos;
    _callback(todos);
  },

  addChangeListener: function (callback) {
    console.log("registering callback for changelistener");
    _callback = callback;
  }
}

module.exports = TodoStore;
