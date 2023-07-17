import React, {useState} from 'react';
const {ipcRenderer} = window.require('electron');

function ProjectsPage() {
  const [projectFolder, setProjectFolder] = useState('');
  const [projectName, setProjectName] = useState('');
  async function getDir() {
    const folderPath = await ipcRenderer.invoke('openFolderDialog');
    const folderPathSplit = folderPath.split('/');
    setProjectName(folderPathSplit[-1]);
    setProjectFolder(folderPath);
  }
  return (
    <>
      <h1>Choose Your Project Folder</h1>
      <div>
        <button onClick={getDir}>Choose a directory</button>
        {projectFolder && (
          <form>
            <h3>Project Folder: {projectFolder}</h3>
            <input name='projectName' placeholder='Project name...' />
            <button>Save Porject</button>
          </form>
        )}
      </div>
    </>
  );
}

export default ProjectsPage;
