import React from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Diagram from './pages/Diagram/Diagram';
import Settings from './pages/Settings/Settings';

const App = () => {
  const navigate = useNavigate();

  function navClick(path) {
    navigate(path);
  }

  return (
    <div className='app'>
      <Sidebar />
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
