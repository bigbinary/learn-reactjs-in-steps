var _todos = {};
var _callback;

var TodoStore = {

  markTodoDone: (todo) => {
   var _todo = _todos.filter((t) => {
      return t.id === todo.id;
    })[0];

    _todo.done = true;
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
