import React, {useContext, useEffect, useReducer} from 'react';
import {Route, Routes, useNavigate} from 'react-router';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';
import Diagram from './pages/Diagram/components/Diagram';
import Settings from './pages/Settings/Settings';
import {ProjectsContext} from './context/contextStore';
import Topbar from './components/Topbar';
import DiagramPage from './pages/Diagram/DiagramPage';
const {ipcRenderer} = window.require('electron');

const App = () => {
  const {setActiveProject, dispatchProjects, activeProject} =
    useContext(ProjectsContext);
  // console.log(activeProject, 'ACTIVE PROJECT FROM APP');
  // mount our event listener on file changes
  useEffect(() => {
    const handleFileChanged = (e, newAst) => {
      dispatchProjects({
        type: 'update',
        payload: {...activeProject, ast: newAst},
      });
      setActiveProject({...activeProject, ast: newAst});
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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/diagram' element={<DiagramPage />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </main>
    // </DirTreeHolder.Provider>
  );
};

export default App;
