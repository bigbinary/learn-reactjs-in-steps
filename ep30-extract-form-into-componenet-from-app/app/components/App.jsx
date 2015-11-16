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

    TodoActions.allTodos();
  }

  componentDidMount () {
    var storeIsTellingUsThatDataHasChanged = () => {
      console.log("Store is telling us that data has change");
      var todos = TodoStore.getTodos();
      console.log("todos :", todos);
      this.setState({todos: todos});
    }
    TodoStore.addChangeListener(storeIsTellingUsThatDataHasChanged);
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
