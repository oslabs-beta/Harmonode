import React, { useContext } from 'react';
import { ProjectsContext } from '../../../context/contextStore';
import { loadProject } from '../../../ipcRenderer';
import '../../Projects/projects.css';

function ProjectListCard({ project }) {
  const { dispatchProjects, activeProject, setActiveProject } =
    useContext(ProjectsContext);

  function handleDelete(e) {
    dispatchProjects({ type: 'delete', payload: project });
    if (project.id === activeProject.id) setActiveProject({});
  }

  async function handleLoad(e) {
    const files = await loadProject(project);
    const newProject = {
      folder: project.folder,
      server: project.server,
      ignore: project.ignore,
      extensions: project.extensions,
      id: project.id,
      name: project.name,
      ast: files,
    };

    dispatchProjects({ type: 'update', payload: newProject });
    setActiveProject(newProject);
  }

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
          <button className='loadButton' onClick={handleLoad}>
            Load
          </button>
          <button className='deleteButton' onClick={handleDelete}>
            Delete
          </button>
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
