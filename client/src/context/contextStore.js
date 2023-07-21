import React from 'react';

export const DirTreeHolder = React.createContext();

export const ProjectsContext = React.createContext({
  projects: [],
  dispatchProjects: (projects) => {},
  activeProject: {},
  setActiveProject: (project) => {},
});

export const SettingsContext = React.createContext({
  theme: {},
});
