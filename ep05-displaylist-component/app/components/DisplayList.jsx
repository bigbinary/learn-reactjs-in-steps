import React from 'react';

export default class DisplayList extends React.Component {

  render () {
    return  <ul>
              { this.props.items.map((item, i) => {
                return <li> { item } </li>;
              }) }
            </ul>;
  }

}

