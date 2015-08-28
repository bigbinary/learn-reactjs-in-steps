import React from 'react';
import DisplayItem from './DisplayItem';

export default class DisplayList extends React.Component {

  render () {
    return <ul>
            { this.props.todos.map((todo, i) => {
              return <DisplayItem
                        key={todo.title}
                        title={todo.title}
                        handleDelete={this.props.handleDelete.bind(null, todo.title)} />;
            }) }
           </ul>
  }

}
