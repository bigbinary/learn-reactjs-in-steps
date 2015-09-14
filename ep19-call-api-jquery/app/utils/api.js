var Constants = require("./constants");
var $ = require('jquery');

var api = {
  getTasks (processData) {
    var url = Constants.BASE_URL + 'todos';
    this.makeAjaxCall(url, 'GET', processData)
  },

  markTaskDone (processData, todo) {
    var url = Constants.BASE_URL + 'todos/' + todo.id;
    var params = {
      id: todo.id,
      done: todo.done
    };
    this.makeAjaxCall(url, 'PUT', processData, params)
  },

  makeAjaxCall (url, type, processDataCallback, params) {
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
