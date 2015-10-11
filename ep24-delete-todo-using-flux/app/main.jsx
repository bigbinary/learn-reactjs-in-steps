import './stylesheets/main.css';

import React from 'react';
import App from './components/App';

main();

function main() {
  var div = document.createElement('div');
  div.setAttribute("id", "todoapp");
  document.body.appendChild(div);

  React.render(<App />, div);
}
