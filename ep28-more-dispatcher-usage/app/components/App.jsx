import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');
var api = require("../utils/api");
var TodoActions = require("../actions/TodoActions");
var TodoStore = require("../stores/TodoStore");

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [] };
    this.getAllTodos();
  }

  componentDidMount () {
    var storeIsTellingUsThatDataHasChanged = (todos) => {
      console.log("Store is telling us that data has change");
      this.setState({todos: todos});
    }
    TodoStore.addChangeListener(storeIsTellingUsThatDataHasChanged);
  }

  getAllTodos () {
    api.getTodos()
      .then( (responseData) => {
        var todos = responseData.todos;
        this.setState({todos: todos });
        TodoStore.setTodos(todos);
      })
  }

  handleSubmit (event) {
    event.preventDefault();

    var newTodo = { title: this.state.title, done: false };

    TodoActions.addTodo(newTodo);
    this.setState({ title: '' });
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
