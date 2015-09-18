var Constants = require("./constants");
var $ = require('jquery');

var api = {
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
