import React from 'react';
import DisplayList from './DisplayList';
import DisplayItem from './DisplayItem';

var TodoActions = require('../actions/TodoActions');

export default class TodoForm extends React.Component {

  constructor () {
    super();
    this.state = { editing: false }
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

  render () {
    return  <div>
              <h1> TODO </h1>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input  type="text"
                        onChange={this.handleChange.bind(this)}
                        value={this.state.title} />
              </form>
            </div>;
  }

}
