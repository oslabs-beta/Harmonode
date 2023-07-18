import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';

// Component to list all of the projects that have been saved previously
function ListProjects() {
  const [projects, setProjects] = useState<string[]>([]);
  const navigate = useNavigate();

  const projectComponents = projects.map((project) => {
    return <h5>{project}</h5>;
  });

  function addProject() {
    const newProjects = [...projects]; // 0x000123 -> new Array [] -> new address 0x000124
    newProjects.push('New Project'); // newProjects = 0x000123 ...
    console.log(projects);
    setProjects(newProjects);
  }

  function navigateElsewhere() {
    navigate('/diagram');
  }

  return (
    <div>
      <h1>Projects :</h1> {projectComponents}
      <button onClick={addProject}>Add Project</button>
      <button onClick={navigateElsewhere}>Navigate Elsewhere</button>
    </div>
  );
}

export default ListProjects;
