import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const htmlRoot = ReactDOM.createRoot(document.getElementById('root'));

htmlRoot.render(
  <Router>
    <App />
  </Router>
);
