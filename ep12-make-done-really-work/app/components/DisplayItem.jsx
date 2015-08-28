import React from 'react';

export default class DisplayItem extends React.Component {

  constructor () {
    super();
    this.state = { done: false };
  }

  handleDone (event) {
    var _done = !this.state.done;
    this.setState({ done: _done });
  }

  render () {
    var todo = this.props.todo;
    var title = todo.title;

    return <li>
              <input
                checked={todo.done}
                onChange={this.handleDone.bind(this)}
                type="checkbox"
                style={{ fontSize: 'x-large' }} />

              { title }
              <a href='#' onClick={ this.props.handleDelete.bind(null, title) }>
                [x]
              </a>
           </li>;
  }

}

