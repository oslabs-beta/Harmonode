import React from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Settings from './pages/Settings/Settings';
import Topbar from './components/Topbar';
import DiagramPage from './pages/Diagram/DiagramPage';

const App = () => {
  const navigate = useNavigate();

  function navClick(path) {
    navigate(path);
  }

  return (
    // <DirTreeHolder.Provider value={{globalDir, dirDispatcher}}>
    <>
      <Topbar />
      <div className='app'>
        <Sidebar />

        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/diagram' element={<DiagramPage />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </>
    // </DirTreeHolder.Provider>
  );
};

export default App;
