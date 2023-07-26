import React, {useContext, useEffect, useState} from 'react';
import ProjectDirectories from './ProjectDirectories';
import {DirectoryTree, Directory} from '../../../types';
import ApprovedExtensions from './ApprovedExtensions';
import {v4 as uuid} from 'uuid';
import {ProjectsContext} from '../../../context/contextStore';
const {ipcRenderer} = window.require('electron');

interface projectObj {
  folder: string;
  server: string;
  ignore: string[];
  extensions: string[];
  id: string;
  name: string;
  ast: object[];
}

// Component to add a new project
function AddProject({hideNew}) {
  const {
    projects,
    dispatchProjects,
    setActiveProject,
    activeProject,
  }: {
    projects: projectObj[];
    dispatchProjects: Function;
    setActiveProject: Function;
    activeProject: object;
  } = useContext(ProjectsContext);
  const [projectFolder, setProjectFolder] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [serverPath, setServerPath] = useState<string>('');
  const [ignoredDirs, setIgnoredDirs] = useState<string[]>([]);
  const [dirDetails, setDirDetails] = useState<DirectoryTree>(
    {} as DirectoryTree
  );
  const [approvedExts, setApprovedExts] = useState<string[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);

  console.log(activeProject, 'ACTIVE PROJECT');
  // function that finds all the files that will be loaded so we can display
  // the file count on the project load page
  async function fileLoad() {
    const fileCount = await ipcRenderer.invoke(
      'countCodeFiles',
      projectFolder,
      ignoredDirs,
      approvedExts,
      serverPath
    );
    setFileCount(fileCount);
  }

  // monitoring when extensions and ignoredDirs state change so we can invoke
  // fileLoad .. needs to be useEffect and conditionally executed after serverPath
  // is set so we don't have file read errors in backend with missing arguments
  useEffect(() => {
    if (serverPath) {
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
    /*
    _________
    projectObj = {}
    1. Project Folder
    2. Server File
    3. Ignore diectories
    4. Extensions to include
    5. Project Name
    6. AST Object

    */

    const projectName = e.target.projectName.value;
    const projectObj = {
      folder: projectFolder,
      server: serverPath,
      ignore: ignoredDirs,
      extensions: approvedExts,
      id: uuid(),
      name: projectName,
      ast: files,
    };

    for (const project of projects) {
      if (project.name === projectName) {
        console.log('duplicate');
        return;
      }
    }
    console.log(projectObj);
    setActiveProject(projectObj);
    dispatchProjects({type: 'add', payload: projectObj});
    hideNew();
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
