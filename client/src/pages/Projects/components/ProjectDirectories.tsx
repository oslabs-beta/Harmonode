import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DirObj} from '../../../../../server/types';
const {ipcRenderer} = window.require('electron');

function ProjectDirectories({dirPath}) {
  const [directories, setDirectories] = useState<object[]>([]);
  const [checkedDirectories, setCheckedDirectories] = useState<string[]>([]);

  function handleChange(e) {
    const {value, checked} = e.target;
    setCheckedDirectories((prev: string[]) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((id) => id !== value);
      }
    });
  }

  // call the ipcRenderer to get the directories of the filepath
  useEffect(() => {
    async function getDirectories() {
      const directories = await ipcRenderer.invoke('getDirectories', dirPath);
      setDirectories(directories);
    }

    getDirectories();
  }, []);

  // create the checkbox options components
  const options = directories.map((directory) => {
    const fileName = (directory as DirObj).fileName;
    const path = (directory as DirObj).filePath.replace(
      new RegExp(`^${dirPath}`),
      ''
    );

    const nestedCount = (path.match(/\//g) || []).length - 1;

    const isChecked = checkedDirectories.includes(path);
    return (
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
  });

  return <div>{options}</div>;
}

export default ProjectDirectories;
