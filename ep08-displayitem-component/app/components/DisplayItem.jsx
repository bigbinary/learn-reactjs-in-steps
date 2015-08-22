import React from 'react';

export default class DisplayItem extends React.Component {

  constructor () {
    super();
    this.state = { done: false };
  }

  handleOnChange (event) {
    var _done = !this.state.done;
    this.setState({ done: _done });
  }

  render () {
    var item = this.props.item;

    return <li>
              <input
                checked={this.state.done}
                onChange={this.handleOnChange.bind(this)}
                type="checkbox"
                style={{ fontSize: 'x-large' }} />

              { item }
              <a href='#' onClick={ this.props.handleDelete.bind(null, item) }>
                [x]
              </a>
           </li>;
  }

}

