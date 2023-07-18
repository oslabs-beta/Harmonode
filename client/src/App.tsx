import React from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import './styles.css';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ListPage from './pages/List/ListPage';
import DiagramPage from './pages/Diagram/DiagramPage';
import SettingsPage from './pages/Settings/SettingsPage';

const App = () => {
  const navigate = useNavigate();

  function navClick(path) {
    navigate(path);
  }

  return (
    <div className='app'>
      <Sidebar />
      <div className='content'>
        <Routes>
          <Route path='/' element={<>Home Page</>} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/dash' element={<DashboardPage />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='/diagram' element={<DiagramPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
      </div>
      {/* <button onClick={() => navClick('/projects')}>Projects Page</button> */}
    </div>
  );
};

export default App;
