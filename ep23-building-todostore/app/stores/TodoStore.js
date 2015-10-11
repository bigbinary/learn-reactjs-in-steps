var _todos = {};

var TodoStore = {

  setTodos: (todos) => {
    _todos = todos;
    console.log("TodoStore", TodoStore.getTodos());
  },

  getTodos: () => {
    return _todos;
  }

}

module.exports = TodoStore;
