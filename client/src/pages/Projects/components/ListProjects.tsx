import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {getProjects} from '../../../ipcRenderer';
import ProjectListCard from './ProjectListCard';

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
  const [projects, setProjects] = useState<projectObject[]>([]);
  const navigate = useNavigate();

  const projectComponents = projects.map((project) => {
    return <ProjectListCard project={project} />;
  });

  useEffect(() => {
    async function loadProjects() {
      const storedProjects = await getProjects();
      setProjects(storedProjects);
    }
    loadProjects();
  }, []);

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
