import React from 'react';
import {useEffect, useReducer, useState} from 'react';
import {ProjectsContext} from './contextStore.js';
import {getProjects, storeProjects} from '../ipcRenderer';

function projectsReducer(state, {type, payload}) {
  switch (type) {
    case 'add':
      const newStateAdd = [...state, payload];
      storeProjects(newStateAdd);
      return newStateAdd;
    case 'delete':
      const newStateDelete = state.filter(
        (project) => project.name !== payload.name
      );
      storeProjects(newStateDelete);
      return newStateDelete;
    case 'update':
      const newStateUpdate = state.map((project) =>
        project.id === payload.id ? payload : project
      );
      storeProjects(newStateUpdate);
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
  // fill out empty stuff for active project so it doesn't throw errors elsewhere when we try
  // to iterate over stuff
  const [activeProject, setActiveProject] = useState({
    ast: {
      fetchFiles: [],
      endPointFiles: [],
      fetches: [],
      endpoints: [],
    },
    fileName: '',
    extensions: [],
    id: '',
    ignore: [],
    name: '',
    server: '',
  });

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
