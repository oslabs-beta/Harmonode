import React, {useState} from 'react';
import AddProject from './components/AddProject';
import ListProjects from './components/ListProjects';
const {ipcRenderer} = window.require('electron');

function ProjectsPage() {
  const [showNew, setShowNew] = useState(false);
  return (
    <>
      <button onClick={() => setShowNew(true)}>Add new project</button>
      {showNew && <AddProject />}
      <ListProjects />
    </>
  );
}

export default ProjectsPage;
