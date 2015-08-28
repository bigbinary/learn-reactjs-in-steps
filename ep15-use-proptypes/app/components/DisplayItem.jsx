import React from 'react';

export default class DisplayItem extends React.Component {

  render () {
    var todo = this.props.todo;

    return <li>
              <input
                checked={todo.done}
                onChange={this.props.handleDone.bind(null, todo.id)}
                type="checkbox"
                style={{ fontSize: 'x-large' }} />

              { todo.title }
              <a href='#' onClick={ this.props.handleDelete.bind(null, todo.id) }>
                [x]
              </a>
           </li>;
  }

}

DisplayItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  handleDone: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired
}
