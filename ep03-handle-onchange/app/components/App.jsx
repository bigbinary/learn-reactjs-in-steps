import React from 'react';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = { text: '' };
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log("form was submitted");
    var text = this.state.text;
    console.log("submitted form has value ", text);
    this.setState({ text: '' });
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
            </div>;
  }
}
