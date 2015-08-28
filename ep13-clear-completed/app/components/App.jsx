import React from 'react';
import DisplayList from './DisplayList';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', todos:  [
                                        { title: 'eggs', done: false },
                                        { title: 'banana', done: false },
                                        { title: 'bread', done: false }
                                      ] };
  }

  handleDone (titleToBeMarkedAsDone) {
    console.log(titleToBeMarkedAsDone + " wants to be marked as done");
    var _todos = this.state.todos;
    var todo = _todos.filter((todo) => {
      return todo.title === titleToBeMarkedAsDone;
    })[0];

    todo.done = !todo.done;

    this.setState({ todos: _todos });
  }

  handleDelete (titleToBeDeleted) {
    var newTodos = this.state.todos.filter( (todo) => {
      return todo.title != titleToBeDeleted
    } )

    this.setState({ todos: newTodos});
  }

  handleSubmit (event) {
    event.preventDefault();

    var title = this.state.title;
    var newTodos = this.state.todos.concat({ title: title, done: false });

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
