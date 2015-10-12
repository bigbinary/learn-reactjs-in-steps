var AppDispatcher = require('../dispatcher/AppDispatcher');

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'TODO_DONE':
      console.log("Handling TODO_DONE using dispatcher in store");
      TodoStore.markTodoDone(action.todo);
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
  },

  addChangeListener: function (callback) {
    console.log("registering callback for changelistener");
    _callback = callback;
  }
}

module.exports = TodoStore;
