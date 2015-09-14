var Constants = require("./constants");
var $ = require('jquery');

var api = {
  getTasks (processData) {
    var url = Constants.BASE_URL + 'todos';
    this.makeAjaxCall(url, 'GET', processData)
  },

  makeAjaxCall (url, type, processDataCallback) {
    $.ajax({
      type: type,
      url: url,
      data: {
        api_key: Constants.API_KEY
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
