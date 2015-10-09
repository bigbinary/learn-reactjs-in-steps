require('whatwg-fetch');
var Constants = require("./constants");
var HEADER = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

var api = {
  generateUrlWithApiKey(endpoint) {
    return Constants.BASE_URL + endpoint + '?api_key=' + Constants.API_KEY;
  },

  getTodos () {
    var url = this.generateUrlWithApiKey('todos');
    return fetch(url)
             .then((res) => res.json());
  },

  addTodo (todo) {
    var url = this.generateUrlWithApiKey('todos');
    var options = {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify({todo: todo})
    };
    return fetch(url, options)
             .then((res) => res.json());
  },

  markTodoDone (todo) {
    var url = this.generateUrlWithApiKey('todos/' + todo.id);
    var options = {
      method: 'PUT',
      headers: HEADER,
      body: JSON.stringify({done: todo.done})
    };
    return fetch(url, options)
             .then((res) => res.json());
  },

  deleteTodo (idToBeDeleted, processDataCallback) {
    var url = this.generateUrlWithApiKey('todos/' + idToBeDeleted);
    return fetch(url, { method: 'DELETE' })
      .then((res) => res.json());
  },

};

module.exports = api;
