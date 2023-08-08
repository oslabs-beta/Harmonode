import React, { useContext } from 'react';
import { ProjectsContext } from '../context/contextStore';

function Topbar() {
  const { activeProject } = useContext(ProjectsContext);
  console.log(activeProject);
  return (
    <div className={`topbar ${!activeProject.name && 'topbar-inactive'}`}>
      {activeProject.name ? (
        <p style={{ color: 'var(--font-main-color)' }}>
          Active Project: <b>{activeProject.name}</b> ({activeProject.folder})
        </p>
      ) : (
        <p style={{ color: 'var(--font-main-color)' }}>No Active Project </p>
      )}
    </div>
  );
}

export default Topbar;
