import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {DirObj} from '../../../../../server/types';
import {Dir} from 'original-fs';
const {ipcRenderer} = window.require('electron');

function ProjectDirectories({filePath}) {
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
      const directories = await ipcRenderer.invoke('getDirectories');
      setDirectories(directories);
    }

    getDirectories();
  }, []);

  // create the checkbox options components
  const options = directories.map((directory) => {
    const fileName = (directory as DirObj).fileName;
    const isChecked = checkedDirectories.includes(fileName);
    return (
      <div key={uuid()} className='project-directory-select'>
        <input
          onChange={handleChange}
          type='checkbox'
          value={fileName}
          checked={isChecked}
        />
        <label htmlFor={fileName}>{fileName}</label>
      </div>
    );
  });

  return <div>{options}</div>;
}

export default ProjectDirectories;
