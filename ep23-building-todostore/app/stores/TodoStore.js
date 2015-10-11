var _todos = {};

var TodoStore = {

  setTodos: (todos) => {
    _todos = todos;
    console.log("TodoStore", TodoStore.getTodos());
  },

  getTodos: () => {
    return _todos;
  },

  addChangeListener: function (callback) {
    console.log("registering callback for changelistener");
  }
}

module.exports = TodoStore;
