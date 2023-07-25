import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ProjectsContext } from '../../context/contextStore'
import FrontEndList  from './components/FrontEndList'


import './list.css';

// container for all the list components

function ListPage() {

  return (
    <main className='list-page'>
      <div>List</div>
      <FrontEndList file={undefined} />

    </main>
    )
}

export default ListPage