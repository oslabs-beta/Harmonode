import React from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';

const App = () => {
  const navigate = useNavigate();

  function navClick(path) {
    navigate(path);
  }

  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path='/projects' element={<ProjectsPage />} />
      </Routes>
      <button onClick={() => navClick('/projects')}>Projects Page</button>
    </>
  );
};

export default App;
