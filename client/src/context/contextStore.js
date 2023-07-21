import React from 'react';

export const DirTreeHolder = React.createContext();

export const ProjectsContext = React.createContext({
  projects: [],
  setProjects: (projects) => {},
  activeProject: {},
  setActiveProject: (project) => {},
});

export const SettingsContext = React.createContext({
  theme: {
    primaryColor: '#164B60',
    secondaryColor: '#1B6B93',
    tertiaryColor: '#4FC0D0',
    quaternaryColor: '#A2FF86',
    fontMainColor: 'f6fff5',
  },
});
