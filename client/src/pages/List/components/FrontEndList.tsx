import React, { useContext, } from 'react';
import { ProjectsContext } from '../../../context/contextStore';
import {v4 as uuid} from 'uuid';
import  FetchFileCard from './FetchFileCard';




function FrontEndList({file}) {
  const { activeProject } = useContext(ProjectsContext);
  

  if (!activeProject) {
    return <p>No active project selected.</p>
  }
  const fetchFiles = activeProject.ast.fetchFiles
 
  const fetchFilesComponents = fetchFiles.map((file) => {
    return <FetchFileCard key={uuid()} file={file} />
  })
  if (fetchFilesComponents.length === 0) {
    return <p>No fetch files found for the active project.</p>
  }



  return (
    <ul>
      <h2>Fetch Files</h2> 
      {fetchFilesComponents}
    </ul>
  )
}


export default FrontEndList;