import {useEffect, useState} from 'react';
import {ProjectsContext} from './context/contextStore.js';
import {getProjects, setProjects} from '../ipcRenderer';

function projectsReducer(state, {type, payload}) {
  switch (type) {
    case 'add':
      const newState = [...state, payload];
      setProjects(newState);
      return [...state, payload];
    case 'delete':
      return state.filter((project) => project.name !== payload.name);
    case 'update':
      return state;
    case 'load':
      return state;
    default:
      return state;
  }
}

export default function ProjectsProvider() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState({});

  useEffect(() => {
    async function getStoredProjects() {
      setProjects(await getProjects());
    }

    getStoredProjects();
  }, []);
}
