import React, {useState} from 'react';
import AddProject from './components/AddProject';
import ListProjects from './components/ListProjects';
const {ipcRenderer} = window.require('electron');

import './projects.css';

function ProjectsPage() {
  const [showNew, setShowNew] = useState(false);
  return (
    <main className='projects-page'>
      <button onClick={() => setShowNew(true)}>Add new project</button>
      {showNew && <AddProject />}
    </main>
  );
}

export default ProjectsPage;
