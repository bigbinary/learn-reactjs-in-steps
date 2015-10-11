var api = require("../utils/api");

var TodoActions = {

  markTodoDone: (todo) => {
    console.log("Marking TODO as done");
    api.markTodoDone(todo)
       .then( () => { console.log("marked TODO as done successfully"); })
  },

  markTodoUnDone: (todo) => {
    console.log("Marking TODO as undone");
    api.markTodoUnDone(todo)
       .then( () => { console.log("marked TODO as undone successfully"); })
  }

}

module.exports = TodoActions;
