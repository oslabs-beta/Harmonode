import { ProjectsContext } from "../../../context/contextStore";
import React from "react";
import {v4 as uuid} from 'uuid' 

function FetchFileDetails({file}) {
  console.log('hello', file)

  



  const fetchesComponents = file.fetches.map((fetch) => {
    return (
      <div key={uuid()}>
        <div className="fetch-file-method">
          Method: {fetch.method}
        </div>
        <div className="fetch-file-path">
          Path: {fetch.path}
        </div>
      </div>
    )
  })
  return (
    <div className='fetch-file-card'>
      <div className='fetch-file-card-header'>
        <div className="fetches-header">Fetches: </div>
          <div> {fetchesComponents}</div>
      </div>
    </div>
  )
}

export default FetchFileDetails