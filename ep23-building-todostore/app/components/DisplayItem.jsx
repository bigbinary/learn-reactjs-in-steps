import React from 'react';

var TodoActions = require('../actions/TodoActions');

export default class DisplayItem extends React.Component {

  constructor () {
    super();
    this.state = { editing: false }
  }

  componentDidMount () {
    this.setState({ changedText: this.props.todo.title });
  }

  handleEditing (event) {
    this.setState({ editing: true, changedText: this.props.todo.title });
  }

  handleEditingDone (event) {
    if (event.keyCode === 13 ) { // submit
      this.setState({ editing: false });
    }
  }

  handleEditingChange (event) {
    var _changedText = event.target.value;
    this.setState({ changedText: _changedText });
  }

  toggleDone (todo) {

    if (todo.done) {
      TodoActions.markTodoUnDone(todo);
    } else {
      TodoActions.markTodoDone(todo);
    }

    //this.props.toggleDone(todo.id);
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
              <div style={viewStyle} onDoubleClick={this.handleEditing.bind(this)}>
                <input
                  checked={todo.done}
                  onChange={this.toggleDone.bind(this, todo)}
                  type="checkbox"
                  style={{ fontSize: 'x-large' }} />

                <label>
                  { this.state.changedText }
                </label>

                <a  href='#'
                    className="destroy"
                    onClick={ this.props.handleDelete.bind(null, todo.id) }>
                  [x]
                </a>
              </div>

              <input  type="text"
                      onKeyDown={this.handleEditingDone.bind(this)}
                      onChange={this.handleEditingChange.bind(this)}
                      style={editStyle}
                      value={this.state.changedText} />
           </li>
  }

}

DisplayItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  toggleDone: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired
}
