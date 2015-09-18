import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');
var api = require("../utils/api");

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [] };
    var processDataCallback = function(data) {
      this.setState({todos: data.todos});
    };

    api.getTasks(processDataCallback.bind(this));
  }

  handleDone (idToBeMarkedAsDone) {
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.id === idToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    var processDataCallback = function(data) {
      this.setState({todos: data.todos});
    };

    var markTaskDoneCallback = function(data){
      data.success ? api.getTasks(processDataCallback.bind(this)) : console.log("Failed to mark task as done/undone");
    };

    api.markTaskDone(todo, markTaskDoneCallback.bind(this));
  }

  handleDelete (idToBeDeleted) {
    var processDataCallback = function(data) {
      this.setState({todos: data.todos});
    };

    var deleteTaskCallback = function(data){
      data.success ? api.getTasks(processDataCallback.bind(this)) : console.log("Failed to delete task");
    };

    api.deleteTask(idToBeDeleted, deleteTaskCallback.bind(this));
  }

  handleSubmit (event) {
    event.preventDefault();

    var newTodo = { title: this.state.title, done: false };

    var processDataCallback = function(data) {
      this.setState({title: '', todos: data.todos});
    };

    var addTaskCallback = function(data){
      data.success ? api.getTasks(processDataCallback.bind(this)) : console.log("Failed to add task");
    };

    api.addTask(newTodo, addTaskCallback.bind(this));
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
