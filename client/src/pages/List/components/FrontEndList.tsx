import React, { useContext, } from 'react';
import { ProjectsContext } from '../../../context/contextStore';

function ActiveProjectFrontEnd() {
  const { activeProject } = useContext(ProjectsContext);

  if (!activeProject) {
    return <p>No active project selected.</p>
  }

  if (!activeProject.ast || !activeProject.ast.fetchfiles || activeProject.ast.fetchfiles.length === 0) {
    return <p>No fetch files found for the active project.</p>
  }

  return (
    <ul>
      <li>Fetch 1: {activeProject.ast.fetchfiles[0]}</li>
    </ul>
  )
}

export default ActiveProjectFrontEnd;