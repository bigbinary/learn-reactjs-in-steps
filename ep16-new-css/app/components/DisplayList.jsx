import React from 'react';
import DisplayItem from './DisplayItem';

export default class DisplayList extends React.Component {

  render () {
    return <ul>
            { this.props.todos.map((todo, i) => {
              return  <section id="main">
                        <DisplayItem
                          key={todo.title}
                          todo={todo}
                          handleDone={this.props.handleDone}
                          handleDelete={this.props.handleDelete} />;
                      </section>
            }) }
           </ul>
  }

}

DisplayList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  handleDone: React.PropTypes.func.isRequired,
  handleDelete: React.PropTypes.func.isRequired
}
