import React from 'react';

export default class App extends React.Component {

  handleSubmit (event) {
    event.preventDefault();
    console.log("form was submitted");

  }

  render () {
    return  <div>
              <p> TODO </p>
              <form onSubmit={this.handleSubmit}>
                <input />
                <button> Submit </button>
              </form>
            </div>;
  }
}
