import React, {useContext} from 'react';
import {ProjectsContext} from '../context/contextStore';

function Topbar() {
  const {activeProject} = useContext(ProjectsContext);
  console.log(activeProject);
  return (
    <div
      style={{
        backgroundColor: 'black',
        margin: '0',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {activeProject.name ? (
        <p style={{color: 'white'}}>Active Project: {activeProject.name}</p>
      ) : (
        <p style={{color: 'white'}}>No Active Project </p>
      )}
    </div>
  );
}

export default Topbar;
