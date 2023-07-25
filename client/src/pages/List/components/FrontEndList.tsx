import React, { useContext, } from 'react';
import { ProjectsContext } from '../../../context/contextStore';
import {v4 as uuid} from 'uuid';
import  FetchFileCard from './FetchFileCard';



function FrontEndList() {
  const { activeProject } = useContext(ProjectsContext);
  const fetchFiles = activeProject.ast.fetchFiles
  console.log(fetchFiles)
  const fetchFilesComponents = fetchFiles.map((file) => {
    return <FetchFileCard key={uuid()} file={file} />
  })

  if (!activeProject) {
    return <p>No active project selected.</p>
  }

  if (fetchFilesComponents.length === 0) {
    return <p>No fetch files found for the active project.</p>
  }

  return (
    <ul>
      <h1>Fetch Files</h1> 
      {fetchFilesComponents}
      <FetchFileDetails />
    </ul>
  )
}

export default FrontEndList;