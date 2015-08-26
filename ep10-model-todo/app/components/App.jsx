import React from 'react';
import DisplayList from './DisplayList';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { title: '', items: ['eggs', 'banana', 'bread'] };
  }

  handleDelete (titleToBeDeleted) {
    var newItems = this.state.items.filter( (_title) => {
      return _title != titleToBeDeleted
    } )

    this.setState({ items: newItems });
  }

  handleSubmit (event) {
    event.preventDefault();

    var title = this.state.title;
    var newItems = this.state.items.concat(title);

    this.setState({ title: '', items: newItems });
  }

  handleChange (event) {
    var title = event.target.value;
    this.setState({ title: title });
  }

  render () {
    return  <div>
              <p> TODO </p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input onChange={this.handleChange.bind(this)} value={this.state.title} />
                <button> Submit </button>
              </form>

              <p>
                Number of total tasks: { this.state.items.length }
              </p>
              <p>
                Number of total tasks done: { this.state.items.filter((title) => { title.done }).length }
              </p>

              <DisplayList
                handleDelete={this.handleDelete.bind(this)}
                items={this.state.items}  />
            </div>;
  }
}
