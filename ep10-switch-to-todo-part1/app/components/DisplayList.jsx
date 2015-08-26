import React from 'react';
import DisplayItem from './DisplayItem';

export default class DisplayList extends React.Component {

  render () {
    return <ul>
            { this.props.todos.map((title, i) => {
              return <DisplayItem
                        key={title}
                        title={title}
                        handleDelete={this.props.handleDelete.bind(null, title)} />;
            }) }
           </ul>
  }

}
