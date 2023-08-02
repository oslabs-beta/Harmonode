import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DirObj} from '../../../../../server/types';
import {DirectoryTree, Directory} from '../../../types';
const {ipcRenderer} = window.require('electron');

// optional ignoreList passed in so we can use this elsewhere
function ProjectDirectories({
  dirPath,
  setIgnore,
  ignoreList = {} as DirectoryTree,
}) {
  const [dirs, setDirs] = useState<DirectoryTree>({
    directories: [],
  } as DirectoryTree);

  // checkBox toggle handling, recursively checking/unchecking nested dir paths
  function handleChange(e) {
    const {value, checked} = e.target;

    function recurseCheck(dirs) {
      for (const dir of dirs) {
        if (dir.fullPath === value) {
          dir.checked = checked;
          if (dir.children && dir.children.length > 0)
            recurseCheckSubs(dir.children);
        } else {
          recurseCheck(dir.children);
        }
      }
    }
    function recurseCheckSubs(children) {
      for (const subChild of children) {
        subChild.checked = checked;
        if (subChild.children && subChild.children.length > 0)
          recurseCheckSubs(subChild.children);
      }
    }
    recurseCheck(dirs.directories);

    setDirs({...dirs});
  }

  // useEffect to track changes to dirs so we can send the state back to the parent
  useEffect(() => {
    // have an array that we push the paths to
    const ignoreArray: string[] = [];
    // recurse through the directories to push the parent most directory to the ignore array
    function recurseCheck(dir) {
      for (const path of dir) {
        if (path.checked) ignoreArray.push(path.fullPath);
        else {
          if (path.children && path.children.length > 0) {
            recurseCheck(path.children);
          }
        }
      }
    }
    recurseCheck(dirs.directories);

    // send the ignore array back to the parent
    setIgnore(ignoreArray, dirs);
  }, [dirs]);

  // call the ipcRenderer to get the directories of the filepath
  useEffect(() => {
    // if an optional ignoreList was passed in, we can just load this instead
    if (ignoreList.hasOwnProperty('directories')) {
      return setDirs(ignoreList);
    }
    // grab the directories from the recursive file search
    async function getDirectories() {
      const directories = await ipcRenderer.invoke('getDirectories', dirPath);

      // build DirectoryTree structure
      const rootDirectory: DirectoryTree = {directories: []};
      directories.forEach((directory) => {
        // remove parts of the filepath we don't care about
        const path = (directory as DirObj).filePath.replace(
          new RegExp(`^${dirPath}`),
          ''
        );
        // set the filepath as the path without the part we don't care about
        directory.filePath = path;

        // setting the base of the rootDirectory tree
        let currentLevel = rootDirectory.directories;
        // creating a full path string so that we can include that as a property in dirs
        let currentFullPath = '';
        const pathParts = directory.filePath.split('/').filter((part) => part);

        pathParts.forEach((part, index) => {
          // add the '/' back in to the full path so we can display it
          currentFullPath += `/${part}`;
          // see if the path exists already
          let existingPath = currentLevel.find((dir) => dir.name === part);
          // if it doesn't exist, let's push the new path
          if (!existingPath) {
            const newPath: Directory = {
              name: part,
              fullPath: currentFullPath,
              checked: false,
              children: [],
            };

            currentLevel.push(newPath);
            existingPath = newPath;
          }

          if (index < pathParts.length - 1) {
            existingPath.children = existingPath.children || [];
            currentLevel = existingPath.children;
          }
        });
      });

      setDirs(rootDirectory);
    }
    getDirectories();
  }, []);

  // create the checkbox options components
  const options: JSX.Element[] = [];

  function createOptions(dir) {
    if (dir.length === 0) return;
    dir.map((directory) => {
      const fileName = directory.name;
      const path = directory.fullPath;

      const nestedCount = (path.match(/\//g) || []).length - 1;

      const isChecked = directory.checked;
      const optionElement = (
        <div
          key={uuid()}
          className='project-directory-select'
          style={{marginLeft: `${nestedCount}em`}}
        >
          <input
            onChange={handleChange}
            type='checkbox'
            value={path}
            checked={isChecked}
          />
          <label htmlFor={fileName}>
            <b> {fileName}</b>
          </label>
        </div>
      );
      options.push(optionElement);
      if (directory.children.length > 0) createOptions(directory.children);
    });
  }
  createOptions(dirs.directories);

  return (
    <div>
      <h3>Ignore Directories:</h3>
      {options}
    </div>
  );
}

export default ProjectDirectories;
