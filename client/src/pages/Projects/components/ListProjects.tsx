import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {getProjects} from '../../../ipcRenderer';
import ProjectListCard from './ProjectListCard';
import {ProjectsContext} from '../../../context/contextStore';

interface projectObject {
  name: string;
  server: string;
  folder: string;
  ignore: string[];
  extensions: string[];
  ast: object[];
}
// Component to list all of the projects that have been saved previously
function ListProjects() {
  const {projects, dispatchProjects} = useContext(ProjectsContext);
  const navigate = useNavigate();
  console.log(projects);
  const projectComponents = projects.map((project) => {
    return <ProjectListCard project={project} />;
  });

  function navigateElsewhere() {
    navigate('/diagram');
  }

  return (
    <div>
      <h1>Projects :</h1>
      {projectComponents}
      <button onClick={navigateElsewhere}>Clear Project List</button>
    </div>
  );
}

export default ListProjects;
