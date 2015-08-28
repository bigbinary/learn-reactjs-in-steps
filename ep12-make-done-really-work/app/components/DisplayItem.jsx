import React from 'react';

export default class DisplayItem extends React.Component {

  render () {
    var todo = this.props.todo;
    var title = todo.title;

    return <li>
              <input
                checked={todo.done}
                onChange={this.props.handleDone.bind(null, title)}
                type="checkbox"
                style={{ fontSize: 'x-large' }} />

              { title }
              <a href='#' onClick={ this.props.handleDelete.bind(null, title) }>
                [x]
              </a>
           </li>;
  }

}

