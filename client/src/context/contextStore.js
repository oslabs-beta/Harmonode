import React from 'react';

export const DirTreeHolder = React.createContext();

export const ProjectsContext = React.createContext({
  projects: [],
  dispatchProjects: (projects) => {},
  activeProject: {},
  setActiveProject: (project) => {},
});

// we will want to kind of mimic what we did above
// have an active theme, a function to set the active theme
// a list of themes (to choose from)

export const SettingsContext = React.createContext({
  activeTheme: {},
});
