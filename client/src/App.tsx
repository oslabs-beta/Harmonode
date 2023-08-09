import React, { useContext, useEffect, useReducer } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router';
import Home from './pages/Home/components/Home';
import ProjectsPage from './pages/Projects/ProjectsPage';
// import Sidebar from './components/newSidebar';
// import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Settings from './pages/Settings/SettingsPage';
import { ProjectsContext } from './context/contextStore';
import Topbar from './components/Topbar';
import DiagramPage from './pages/Diagram/DiagramPage';
import HomePage from './pages/Home/HomePage';
import Sidebar from './components/Sidebar';
const { ipcRenderer } = window.require('electron');

const App = () => {
  const { setActiveProject, dispatchProjects, activeProject } =
    useContext(ProjectsContext);
  // console.log(activeProject, 'ACTIVE PROJECT FROM APP');
  // mount our event listener on file changes
  useEffect(() => {
    const handleFileChanged = (e, newAst) => {
      dispatchProjects({
        type: 'update',
        payload: { ...activeProject, ast: newAst },
      });
      setActiveProject({ ...activeProject, ast: newAst });
    };

    ipcRenderer.on('fileChanged', handleFileChanged);

    return () => {
      ipcRenderer.removeListener('fileChanged', handleFileChanged);
    };
  }, [activeProject]);

  return (
    // <DirTreeHolder.Provider value={{globalDir, dirDispatcher}}>
    <main className='main'>
      <Topbar />
      <div className='app'>
        <Sidebar />

        <Routes>
          <Route path='/home' element={<HomePage />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/diagram' element={<DiagramPage />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate replace to='/home' />} />
        </Routes>
      </div>
    </main>
    // </DirTreeHolder.Provider>
  );
};

export default App;
