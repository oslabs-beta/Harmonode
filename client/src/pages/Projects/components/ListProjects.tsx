import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {getProjects} from '../../../ipcRenderer';

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
    return (
      <>
        <p>{project.name}: </p> <span>{project.folder}</span>
      </>
    );
  });

  useEffect(() => {
    async function loadProjects() {
      const storedProjects = await getProjects();
      setProjects(storedProjects);
    }
    loadProjects();
  }, []);

  // function addProject() {
  //   const newProjects = [...projects]; // 0x000123 -> new Array [] -> new address 0x000124
  //   newProjects.push('New Project'); // newProjects = 0x000123 ...
  //   console.log(projects);
  //   setProjects(newProjects);
  // }

  function navigateElsewhere() {
    navigate('/diagram');
  }

  return (
    <div>
      <h1>Projects :</h1> {projectComponents}
      <button onClick={navigateElsewhere}>Navigate Elsewhere</button>
    </div>
  );
}

export default ListProjects;
