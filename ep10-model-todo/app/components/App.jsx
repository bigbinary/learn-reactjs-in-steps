import React from 'react';
import DisplayList from './DisplayList';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { text: '', items: ['eggs', 'banana', 'bread'] };
  }

  handleDelete (itemToBeDeleted) {
    console.log(itemToBeDeleted);
    var newItems = this.state.items.filter( (_item) => {
      return _item != itemToBeDeleted
    } )

    this.setState({ items: newItems });
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log("form was submitted");

    var text = this.state.text;
    var newItems = this.state.items.concat(text);

    console.log("submitted form has value ", text);
    this.setState({ text: '', items: newItems });
  }

  handleChange (event) {
    var text = event.target.value;
    console.log(text);
    this.setState({ text: text });
  }

  render () {
    return  <div>
              <p> TODO </p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input onChange={this.handleChange.bind(this)} value={this.state.text} />
                <button> Submit </button>
              </form>

              <p>
                Number of total tasks: { this.state.items.length }
              </p>
              <p>
                Number of total tasks done: { this.state.items.filter((item) => { item.done }).length }
              </p>

              <DisplayList
                handleDelete={this.handleDelete.bind(this)}
                items={this.state.items}  />
            </div>;
  }
}
