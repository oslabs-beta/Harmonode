import React, {useEffect, useState} from 'react';
import ProjectDirectories from './ProjectDirectories';
import {DirectoryTree, Directory} from '../../../types';
import ApprovedExtensions from './ApprovedExtensions';
const {ipcRenderer} = window.require('electron');

import fetchParser from '../../../../../server/ast/clientParser';

// Component to add a new project
function AddProject() {
  const [projectFolder, setProjectFolder] = useState('');
  const [projectName, setProjectName] = useState('');
  const [serverPath, setServerPath] = useState('');
  const [ignoredDirs, setIgnoredDirs] = useState<string[]>([]);
  const [dirDetails, setDirDetails] = useState<DirectoryTree>(
    {} as DirectoryTree
  );
  const [approvedExts, setApprovedExts] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState(0);

  // function that finds all the files that will be loaded so we can display
  // the file count on the project load page
  async function fileLoad() {
    const files = await ipcRenderer.invoke(
      'readCodeFiles',
      projectFolder,
      ignoredDirs,
      approvedExts,
      serverPath
    );
    setFileCount(files.length);
  }

  // monitoring when these sets of state change so we can invoke fileLoad
  // needs to be useEffect and conditionally after approvedExts actually has
  // data thrown into it so we don't have file read errors in backend
  useEffect(() => {
    if (approvedExts.length > 0) {
      fileLoad();
    }
  }, [approvedExts, ignoredDirs]);

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

  // we automatically infer the project name based on the folder it sits in
  // func to capitalize the first letter of the file just to make it look nice
  function projectNameFormat(name: string) {
    const capitalizeFirst = name[0].toUpperCase();
    return capitalizeFirst + name.slice(1);
  }

  // what to do when the user saves the project and loads it
  async function formSubmit(e) {
    e.preventDefault();
    // grab the files from electron backend
    const files = await ipcRenderer.invoke(
      'readCodeFiles',
      projectFolder,
      ignoredDirs,
      approvedExts,
      serverPath
    );
    console.log(files);

    console.log(files[3].contents)
    console.log(fetchParser(files[3].contents))
  }

  // callback passed down to ProjectDirectories component
  function setIgnore(ignoreList: string[], dirs: DirectoryTree) {
    setIgnoredDirs(ignoreList);
    setDirDetails(dirs);
  }

  // callback passed down to ApprovedExtensions component
  function setApproved(approvedArray: string[]) {
    setApprovedExts(approvedArray);
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
                <form className='project-form' onSubmit={formSubmit}>
                  <h3>Server File: {serverPath}</h3>
                  <div
                    style={{display: 'flex', justifyContent: 'space-around'}}
                  >
                    <ProjectDirectories
                      dirPath={projectFolder}
                      setIgnore={setIgnore}
                    />
                    <ApprovedExtensions setApproved={setApproved} />
                  </div>
                  <h3>Number of Files to be Monitored: {fileCount}</h3>
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
