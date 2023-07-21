import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Diagram from './pages/Diagram/Diagram';
import Settings from './pages/Settings/Settings';
import { DirTreeHolder } from './contextStore/contextStore';

//establishes initial state
const initialState = { dirTree: {name: 'tree'} };

//update and return new state
const reducer = (state, action) => {
  switch (action.type) {
    case 'setDirTree':
      return { ...state, dirTree: {name: action.payload} };
    default:
      return { ...state };
  }
};

const App = () => {
  const [globalDir, dirDispatcher] = useReducer(reducer, initialState);



  const navigate = useNavigate();

  
  function navClick(path) {
    navigate(path);
  }

  return (
      <DirTreeHolder.Provider value={{globalDir, dirDispatcher}}>
    <div className='app'>
      <Sidebar />
      
      {/* </DirTreeHolder.Provider> */}

      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/list' element={<List />} />
        <Route path='/diagram' element={<Diagram />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
       </DirTreeHolder.Provider> 
  );
};

export default App;
