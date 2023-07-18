import * as fs from 'fs';
const path = require('path');
import {DirObj} from '../types';

// module that will display all the file directories so the user can choose which ones to ignore
export async function getDirectories(dirPath: string) {
  const directoryArray: DirObj[] = [];
  // ignore git files and node_modules automatically

  const dirIgnoreList: string[] = ['node_modules', '.git'];
  function recurseDirs(directoryPath: string = dirPath) {
    const files = fs.readdirSync(directoryPath) as string[];

    files.forEach((file: string) => {
      if (dirIgnoreList.includes(file)) return;
      const filePath: string = path.join(directoryPath, file);
      const fsStats: fs.Stats = fs.statSync(filePath);

      if (fsStats.isDirectory()) {
        const dirObj: DirObj = {} as DirObj;
        dirObj.fileName = file;
        dirObj.filePath = filePath;
        directoryArray.push(dirObj);
        recurseDirs(filePath);
      } else return;
    });
  }

  recurseDirs(dirPath);
  return directoryArray;
}
