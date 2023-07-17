import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
