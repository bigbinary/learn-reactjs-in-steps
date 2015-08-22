import React from 'react';
import DisplayItem from './DisplayItem';

export default class DisplayList extends React.Component {

  render () {
    return <ul>
            { this.props.items.map((item, i) => {
              return <DisplayItem
                        item={item}
                        handleDelete={this.props.handleDelete.bind(null, item)} />;
            }) }
           </ul>
  }

}
