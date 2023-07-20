import React from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Diagram from './pages/Diagram/Diagram';
import Settings from './pages/Settings/Settings';
import { DirTreeHolder } from './contextStore/contextStore';

const initialState = { dirTree: {} };

const reducer = (state, action) => {
  switch(action.type) {
    case "setDirTree" : 
      return {...state, dirTree: action.payload} 
    default :
      return {...state}
  }
}

const App = () => {
  // const [someVar, setSomeVar] = useState(7);
  // const [globalNames, namesDispatcher] = useReducer(reducer, initialState)

  const navigate = useNavigate();

// const reducer = (state, { type, payroll })
  function navClick(path) {
    navigate(path);
  }

  return (
    <div className='app'>

    {/* <NamesHolder.Provider value={{globalNames}}> */}
      <Sidebar />
      
      {/* </NamesHolder.Provider> */}

        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/diagram' element={<Diagram />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>

    </div>
  );
};

export default App;
