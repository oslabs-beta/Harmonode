import React, {useContext} from 'react';
import {ProjectsContext} from '../../../context/contextStore';


function FetchFileCard({file}) {






  return (
    <div className='fetch-file-card'>
      <div className='fetch-file-card-header'>
        <h2>{file.fileName}</h2>
        <p>{file.fileName.lastUpdated}</p>
      </div>
    </div>
  )

}

export default FetchFileCard
