import React from 'react';
import ReactDOM from 'react-dom/client';
import './variables.css';
import './styles.css';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import ProjectsProvider from './context/ProjectsProvider';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const htmlRoot = ReactDOM.createRoot(document.getElementById('root'));

htmlRoot.render(
  <Router>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </Router>
);
