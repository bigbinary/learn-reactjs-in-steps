var Constants = require("./constants");
var $ = require('jquery');

var api = {
  getTasks (processDataCallback) {
    var url = Constants.BASE_URL + 'todos';
    this.makeAjaxCall(url, 'GET', {}, processDataCallback)
  },

  addTask (todo, processDataCallback) {
    var url = Constants.BASE_URL + 'todos';
    this.makeAjaxCall(url, 'POST', todo, processDataCallback)
  },

  markTaskDone (todo, processDataCallback) {
    var url = Constants.BASE_URL + 'todos/' + todo.id;
    var params = { done: todo.done };
    this.makeAjaxCall(url, 'PUT', params, processDataCallback)
  },

  deleteTask (idToBeDeleted, processDataCallback) {
    var url = Constants.BASE_URL + 'todos/' + idToBeDeleted;
    this.makeAjaxCall(url, 'DELETE', {}, processDataCallback)
  },

  makeAjaxCall (url, type, params, processDataCallback) {
    $.ajax({
      type: type,
      url: url,
      data: {
        api_key: Constants.API_KEY,
        todo: params
      },
      dataType: 'json',
      success: function(data) {
        console.log(data);
        processDataCallback(data);
      },
      error: function() {
        console.log("An error has occurred");
      }
    });
  }
};

module.exports = api;
