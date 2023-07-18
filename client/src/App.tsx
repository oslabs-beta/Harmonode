import React from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import DiagramPage from './pages/Diagram/DiagramPage';

const App = () => {
  const navigate = useNavigate();

  function navClick(path) {
    navigate(path);
  }

  return (
    <>
      <Routes>
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/diagram' element={<DiagramPage />} />
      </Routes>
      <button onClick={() => navClick('/projects')}>Projects Page</button>
    </>
  );
};

export default App;
