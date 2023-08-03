import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ProjectListCard from './ProjectListCard';
import { ProjectsContext } from '../../../context/contextStore';
import { v4 as uuid } from 'uuid';

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
  const { projects } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const projectComponents = projects.map((project) => {
    return <ProjectListCard key={uuid()} project={project} />;
  });

  function navigateElsewhere() {
    navigate('/diagram');
  }

  return (
    <div>
      <h1 className='project-header'>Projects</h1>
      {projectComponents}
      <button className='projPageButtons' onClick={navigateElsewhere}>
        Clear Project List
      </button>
    </div>
  );
}

export default ListProjects;
