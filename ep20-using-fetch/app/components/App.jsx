import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');
var api = require("../utils/api");

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [] };

    api.getTasks()
      .then( (responseData) => this.setState({todos: responseData.todos} ))
      .catch( (error) => console.log('Failed to get tasks: ', error) );
  }

  handleDone (idToBeMarkedAsDone) {
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.id === idToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    api.markTaskDone(todo)
      .then( () => { return api.getTasks() })
      .then( (responseData) => this.setState({todos: responseData.todos} ))
      .catch( (error) => console.log('Failed to mark task as done/undone: ', error) );
  }

  handleDelete (idToBeDeleted) {
    api.deleteTask(idToBeDeleted)
      .then( () => { return api.getTasks() })
      .then( (responseData) => this.setState({todos: responseData.todos} ))
      .catch( (error) => console.log('Failed to delete task: ', error) );
  }

  handleSubmit (event) {
    event.preventDefault();

    var newTodo = { title: this.state.title, done: false };

    api.addTask(newTodo)
      .then( () => { return api.getTasks() })
      .then( (responseData) => this.setState({title: '', todos: responseData.todos} ))
      .catch( (error) => console.log('Failed to add task: ', error) );
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
