import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');
var api = require("../utils/api");

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [] };
    var processData = function(data) {
      this.setState({todos: data.todos});
    };
    api.getTasks(processData.bind(this));
  }

  handleDone (idToBeMarkedAsDone) {
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.id === idToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    var processData = function(data) {
      this.setState({todos: data.todos});
    };

    var markTaskDoneCallback = function(data){
      if(data.success){
        api.getTasks(processData.bind(this));
      } else {
        console.log("Failed to mark task as done/undone")
      }
    };

    api.markTaskDone(markTaskDoneCallback.bind(this), todo);
  }

  handleDelete (idToBeDeleted) {
    var processData = function(data) {
      this.setState({todos: data.todos});
    };

    var markTaskDeleteCallback = function(data){
      if(data.success){
        api.getTasks(processData.bind(this));
      } else {
        console.log("Failed to delete task")
      }
    };

    api.deleteTask(markTaskDeleteCallback.bind(this), idToBeDeleted);
  }

  handleSubmit (event) {
    event.preventDefault();

    var title = this.state.title;
    var newTodos = this.state.todos.concat({  title: title,
                                              id: rand.generate(),
                                              done: false });

    this.setState({ title: '', todos: newTodos });
  }

  handleChange (event) {
    var title = event.target.value;
    this.setState({ title: title });
  }

  handleClearCompleted (event) {
    var newTodos = this.state.todos.filter((todo) => { return !todo.done});
    this.setState({ todos: newTodos });
  }

  render () {
    return  <div>
              <h1> TODO </h1>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input  type="text"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.title} />
              </form>

              <DisplayList
                handleDone={this.handleDone.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                todos={this.state.todos}  />

              <footer>
                All: ({ this.state.todos.length }) |
                Completed: ({ this.state.todos.filter((todo) => { return todo.done }).length }) |
                Pending: ({ this.state.todos.filter((todo) => { return !todo.done }).length }) |
                <a href='#' onClick={this.handleClearCompleted.bind(this)}>Clear Completed</a>
              </footer>
            </div>;
  }
}
