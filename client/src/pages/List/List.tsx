import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ProjectsContext } from '../../context/contextStore'
import ActiveFrontEndList from './components/FrontEndList'

import './list.css';

// container for all the list components

function ListPage() {

  return (
    <main className='list-page'>
      <div>List</div>
      <ActiveFrontEndList />
      <ActiveBackEndList />
    </main>
    )
}

export default ListPage