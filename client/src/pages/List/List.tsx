import React, { useContext, useState } from 'react'
import { ProjectsContext } from '../../context/contextStore'
import ActiveProjectFrontEnd from './components/FrontEndList'

// list will have a deeper dive  of the data from Dashboard 
// listing out all endpoints, fetches, and file location

function ListPage() {
  return (
    <>
      <div>List</div>
      <ActiveProjectFrontEnd />
    </>
    )
}

export default ListPage