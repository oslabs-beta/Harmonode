import React from 'react';
import {useEffect, useReducer, useState} from 'react';
import {ProjectsContext} from './contextStore.js';
import {getProjects, setProjects} from '../ipcRenderer';

function projectsReducer(state, {type, payload}) {
  switch (type) {
    case 'add':
      const newStateAdd = [...state, payload];
      setProjects(newStateAdd);
      return newStateAdd;
    case 'delete':
      const newStateDelete = state.filter(
        (project) => project.name !== payload.name
      );
      setProjects(newStateDelete);
      return newStateDelete;
    case 'update':
      const newStateUpdate = state.map((project) =>
        project.id === payload.iid ? payload : project
      );
      setProjects(newStateUpdate);
      return newStateUpdate;
    case 'load':
      return payload;
    default:
      return state;
  }
}

async function initProjects() {
  const projects = await getProjects();

  return projects ? projects : [];
}

export default function ProjectsProvider({children}) {
  const [projects, dispatchProjects] = useReducer(projectsReducer, []);
  const [activeProject, setActiveProject] = useState({});

  useEffect(() => {
    async function dispatchStoredProjects() {
      dispatchProjects({type: 'load', payload: await initProjects()});
    }
    dispatchStoredProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{projects, dispatchProjects, activeProject, setActiveProject}}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
