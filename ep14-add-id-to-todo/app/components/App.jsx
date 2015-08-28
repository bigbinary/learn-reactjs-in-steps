import React from 'react';
import DisplayList from './DisplayList';

var rand = require('random-key');

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [
                                        { title: 'eggs', done: false, id: 1 },
                                        { title: 'banana', done: false, id: 2 },
                                        { title: 'bread', done: false, id: 3 }
                                      ] };
  }

  handleDone (idToBeMarkedAsDone) {
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.id === idToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    this.setState({ todos: _todos });
  }

  handleDelete (idToBeDeleted) {
    var newTodos = this.state.todos.filter( (todo) => {
      return todo.id != idToBeDeleted
    } )

    this.setState({ todos: newTodos});
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
              <p> TODO </p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input onChange={this.handleChange.bind(this)} value={this.state.title} />
                <button> Submit </button>
              </form>

              <p>
                All: ({ this.state.todos.length }) |
                Completed: ({ this.state.todos.filter((todo) => { return todo.done }).length }) |
                Pending: ({ this.state.todos.filter((todo) => { return !todo.done }).length }) |
                <a href='#' onClick={this.handleClearCompleted.bind(this)}>Clear Completed</a>
              </p>
              <p>
              </p>

              <DisplayList
                handleDone={this.handleDone.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                todos={this.state.todos}  />
            </div>;
  }
}
