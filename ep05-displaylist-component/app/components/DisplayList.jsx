import React from 'react';

export default class DisplayList extends React.Component {
  render () {
    return  <div>
              { this.props.items.toString() }
            </div>;
  }
}

