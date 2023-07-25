import { ProjectsContext } from "../../../context/contextStore";
import React from "react";
import {v4 as uuid} from 'uuid' 

function FetchFileDetails({file}) {
  console.log('hello', file)

  const lastUpdated = new Date(file.lastUpdated).toLocaleString();



  const fetchesComponents = file.fetches.map((fetch) => {
    return (
      <div key={uuid()}>
        <div className="fetch-file-method">
          {fetch.method}
        </div>
        <div className="fetch-file-path">
          {fetch.path}
        </div>
      </div>
    )
  })
  return (
    <div className='fetch-file-card'>
      <div className='fetch-file-card-header'>
      <span>Last updated:{lastUpdated}</span>
        <div>Fetches: {fetchesComponents} </div>
      </div>
    </div>
  )
}

export default FetchFileDetails