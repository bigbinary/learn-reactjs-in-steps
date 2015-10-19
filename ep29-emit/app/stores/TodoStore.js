var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'TODO_DONE':
      console.log("Handling TODO_DONE using dispatcher in store");
      TodoStore.markTodoDone(action.todo);
      break;

    case 'TODO_UNDONE':
      console.log("Handling TODO_UNDONE using dispatcher in store");
      TodoStore.markTodoUnDone(action.todo);
      break;

    case 'TODO_DELETE':
      console.log("Handling TODO_DELETE using dispatcher in store");
      TodoStore.deleteTodo(action.todo);
      break;

    case 'TODO_ADD':
      console.log("Handling TODO_ADD using dispatcher in store");
      TodoStore.getTodos();
      break;
  }

});

var _todos = {};
var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {

  deleteTodo: (todo) => {
    var newTodos = _todos.filter( (t) => {
      return t.id != todo.id
    } )
    _todos = newTodos;
    TodoStore.emitChange();
  },

  markTodoDone: (todo) => {
   var _todo = _todos.filter((t) => {
      return t.id === todo.id;
    })[0];

    _todo.done = true;
    TodoStore.emitChange();
  },

  markTodoUnDone: (todo) => {
   var _todo = _todos.filter((t) => {
      return t.id === todo.id;
    })[0];

    _todo.done = false;
    TodoStore.emitChange();
  },

  setTodos: (todos) => {
    _todos = todos;
    TodoStore.emitChange();
  },

  getTodos: () => {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    console.log("registering callback for changelistener");
    this.on(CHANGE_EVENT, callback);
  }
})

module.exports = TodoStore;
