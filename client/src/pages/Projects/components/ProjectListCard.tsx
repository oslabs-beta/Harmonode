import React from 'react';

function ProjectListCard({project}) {
  function formatPath(path) {
    const pathCutoff = 50;
    if (path.length > pathCutoff) {
      let newPath =
        path.slice(0, pathCutoff / 2) +
        '...' +
        path.slice(path.length - pathCutoff / 2);
      return newPath;
    }
    return path;
  }
  const formattedPath = formatPath(project.folder);

  return (
    <div className='project-card'>
      <div className='project-card-header'>
        <h2>{project.name}</h2>
        <div className='project-header-btns'>
          <button>Load</button>
          <button>Delete</button>
        </div>
      </div>
      <div className='project-card-body'>
        <div className='project-card-body-row'>
          <p className='project-card-path-label'>File Path:</p>
          <p className='project-card-path'>{formattedPath}</p>
        </div>
        <div className='project-card-body-row'></div>
      </div>
    </div>
  );
}

export default ProjectListCard;
