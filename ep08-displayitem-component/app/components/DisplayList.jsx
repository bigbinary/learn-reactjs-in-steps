import React from 'react';

export default class DisplayList extends React.Component {

  constructor () {
    super();
    this.state = { done: false };
  }

  handleOnChange (event) {
    var _done = !this.state.done;
    this.setState({ done: _done });
  }

  render () {
    return  <ul>
              { this.props.items.map((item, i) => {
                return <li key={item}>
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
              }) }
            </ul>;
  }

}

