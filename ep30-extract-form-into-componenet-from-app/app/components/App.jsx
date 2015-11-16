import React from 'react';
import TodoForm from './TodoForm';
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
    var storeIsTellingUsThatDataHasChanged = () => {
      console.log("Store is telling us that data has change");
      var todos = TodoStore.getTodos();
      console.log("todos is");
      console.log(todos);
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

  handleClearCompleted (event) {
    var newTodos = this.state.todos.filter((todo) => { return !todo.done});
    this.setState({ todos: newTodos });
  }

  render () {
    return <div>
            <TodoForm />
            <DisplayList
                todos={this.state.todos}  />
            <footer>
              All: ({ this.state.todos.length }) |
              Completed: ({ this.state.todos.filter((todo) => { return todo.done }).length }) |
              Pending: ({ this.state.todos.filter((todo) => { return !todo.done }).length }) |
              <a href='#' onClick={this.handleClearCompleted.bind(this)}>Clear Completed</a>
            </footer>
          </div>
  }
}
