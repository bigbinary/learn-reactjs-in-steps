import React from 'react';

export default class DisplayList extends React.Component {

  render () {
    return  <ul>
              { this.props.items.map((item, i) => {
                return <li key={item}> { item } </li>;
              }) }
            </ul>;
  }

}

