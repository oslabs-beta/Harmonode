import React, {useState} from 'react';
import ProjectDirectories from './ProjectDirectories';
const {ipcRenderer} = window.require('electron');

// Component to add a new project
function AddProject() {
  const [projectFolder, setProjectFolder] = useState('');
  const [projectName, setProjectName] = useState('');
  const [serverPath, setServerPath] = useState('');

  // function to get the directory path of the project folder
  async function getDir(e) {
    e.preventDefault();
    const folderPath = await ipcRenderer.invoke('openFolderDialog');
    if (!folderPath) return;
    const folderPathSplit = folderPath.split('/');
    setProjectName(folderPathSplit[folderPathSplit.length - 1]);
    setProjectFolder(folderPath);
  }

  // function to get the file path of the server
  async function getFile(e) {
    e.preventDefault();
    const filePath = await ipcRenderer.invoke('openFileDialog', projectFolder);
    setServerPath(filePath);
  }

  function projectNameFormat(name: string) {
    const capitalizeFirst = name[0].toUpperCase();
    return capitalizeFirst + name.slice(1);
  }

  // what to do when the user saves the project and loads it
  async function formSubmit(e) {
    e.preventDefault();
    const files = await ipcRenderer.invoke('readCodeFiles', projectFolder);
    console.log(files);
  }

  return (
    <>
      <h1>Choose Your Project Folder</h1>
      <div>
        <button onClick={getDir}>Choose Project Directory</button>
        {projectFolder && (
          <>
            <h3>Project Folder: {projectFolder}</h3>
            <button onClick={getFile}>Choose Server File</button>
              {serverPath && (
                <>
                 <form className='project-form' onSubmit={formSubmit} >
                  <h3>Server File: {serverPath}</h3>
                  <div>
                    <h3>Ignore Directories</h3>
                    <ProjectDirectories dirPath={projectFolder} />
                  </div>
                  <div className='project-name-container'>
                    <h3 className='project-name-header'> Project Name: </h3>
                    <input
                      name='projectName'
                      placeholder='Project name...'
                      defaultValue={projectNameFormat(projectName)}
                    />
                  </div>
                  <button>Save and Load Project</button>
                  </form>
                </>
              )}
          </>
        )}
      </div>
    </>
  );
}

export default AddProject;
