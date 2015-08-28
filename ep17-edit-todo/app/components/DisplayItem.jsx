import React from 'react';

export default class DisplayItem extends React.Component {

  constructor () {
    super();
    this.state = { editing: false }
  }

  render () {
    var todo = this.props.todo;

    var viewStyle = {};
    var editStyle = {};

    if (this.state.editing) {
      viewStyle.display = 'none';
    } else {
      editStyle.display = 'none';
    }

    return <li className={ todo.done ? 'done' : '' }>
              <div style={viewStyle}>
                <input
                  checked={todo.done}
                  onChange={this.props.handleDone.bind(null, todo.id)}
                  type="checkbox"
                  style={{ fontSize: 'x-large' }} />

                <label>
                  { todo.title }
                </label>

                <a  href='#'
                    className="destroy"
                    onClick={ this.props.handleDelete.bind(null, todo.id) }>
                  [x]
                </a>
              </div>

              <input  type="text"
                      style={editStyle}
                      value={todo.title} />
           </li>
  }

}

DisplayItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  handleDone: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired
}
