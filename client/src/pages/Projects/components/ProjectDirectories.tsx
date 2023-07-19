import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DirObj} from '../../../../../server/types';
const {ipcRenderer} = window.require('electron');

interface DirectoryTree {
  directories: Directory[];
}

interface Directory {
  name: string;
  fullPath: string;
  checked: boolean;
  children?: Directory[];
}

function ProjectDirectories({dirPath}) {
  const [dirs, setDirs] = useState<DirectoryTree>({
    directories: [],
  } as DirectoryTree);

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
      console.log(children, 'CHILDREN');
      for (const subChild of children) {
        console.log(subChild, 'SUBCHILD');
        subChild.checked = checked;
        if (subChild.children && subChild.children.length > 0)
          recurseCheckSubs(subChild.children);
      }
    }
    recurseCheck(dirs.directories);

    setDirs({...dirs});
  }

  // call the ipcRenderer to get the directories of the filepath
  useEffect(() => {
    async function getDirectories() {
      const directories = await ipcRenderer.invoke('getDirectories', dirPath);

      // Build DirectoryTree structure
      const rootDirectory: DirectoryTree = {directories: []};
      directories.forEach((directory) => {
        const path = (directory as DirObj).filePath.replace(
          new RegExp(`^${dirPath}`),
          ''
        );
        directory.filePath = path;
        let currentLevel = rootDirectory.directories;
        let currentFullPath = '';
        const pathParts = directory.filePath.split('/').filter((part) => part);

        pathParts.forEach((part, index) => {
          currentFullPath += `/${part}`;
          let existingPath = currentLevel.find((dir) => dir.name === part);

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

  return <div>{options}</div>;
}

export default ProjectDirectories;
