import React, {useContext} from 'react';
import {ProjectsContext} from '../../../context/contextStore';
import FetchFileDetails from './FetchFileDetails';


function FetchFileCard({ file }) {






  return (
    <div className='fetch-file-card'>
      <div className='fetch-file-card-header'>
        <h2>{file.fileName}</h2>
        <FetchFileDetails file={file}/>
      </div>
    </div>
  )

}

export default FetchFileCard
