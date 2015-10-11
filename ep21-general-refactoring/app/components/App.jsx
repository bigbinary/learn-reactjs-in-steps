import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');
var api = require("../utils/api");

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [] };

    this.getAllTodos();
  }

  getAllTodos () {
    api.getTodos()
      .then( (responseData) => this.setState({todos: responseData.todos} ))
  }

  toggleDone (idToBeMarkedAsDone) {
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.id === idToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    if (todo.done) {
      this.markTodoDone(todo);
    } else {
      this.markTodoUnDone(todo);
    }
  }

  markTodoDone (todo) {
    api.markTodoDone(todo)
      .then( () => { return api.getTodos() })
      .then( (responseData) => this.setState({todos: responseData.todos} ));
  }

  markTodoUnDone (todo) {
    api.markTodoUnDone(todo)
      .then( () => { return api.getTodos() })
      .then( (responseData) => this.setState({todos: responseData.todos} ));
  }

  handleDelete (idToBeDeleted) {
    api.deleteTodo(idToBeDeleted)
      .then( () => { return api.getTodos() })
      .then( (responseData) => this.setState({todos: responseData.todos} ));
  }

  handleSubmit (event) {
    event.preventDefault();

    var newTodo = { title: this.state.title, done: false };

    this.addTodo(newTodo);
  }

  addTodo (newTodo) {
    api.addTodo(newTodo)
      .then( () => { return api.getTodos() })
      .then( (responseData) => this.setState({title: '', todos: responseData.todos} ));
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
                toggleDone={this.toggleDone.bind(this)}
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
