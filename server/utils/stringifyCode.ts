import * as fs from 'fs';
const path = require('path');
import {FileObj} from '../types';

// function to grab all the white listed files and convert contents to string for AST handling
// dirPath = root directory to grab the code files
// dirIgnoreList is an array of the directory names that we want to ignore
// extensionApproveList is an array of the file extensions we will want to include to reduce AST parsing overhead
export async function getCodeFiles(
  dirPath: string,
  dirIgnoreList: string[],
  extensionApproveList: string[]
) {
  // always ignore node_modules and .git
  dirIgnoreList = [
    ...dirIgnoreList,
    '/node_modules',
    '/.git',
    '/webpack.config.js',
  ];
  // create a fileArray to put the path of each file
  const fileArray: FileObj[] = [];

  // recursive function to collect all the file paths into the array
  function recurseFiles(directoryPath: string = dirPath) {
    // get all of the file paths into an array so we can iterate and recurse through them
    const files = fs.readdirSync(directoryPath) as string[];

    // iterate over all the files
    files.forEach((file: string) => {
      // skip if the file path is in the ignore list
      if (dirIgnoreList.includes(file)) return;

      // skip if the extension is in the ignore list
      const fileSplit: string[] = file.split('.');

      // get the full file path
      const filePath: string = path.join(directoryPath, file);
      if (dirIgnoreList.includes(filePath.replace(dirPath, ''))) return;

      // get the files stats - tells us meta details of the file
      const fsStats: fs.Stats = fs.statSync(filePath);
      if (
        fsStats.isFile() &&
        !extensionApproveList.includes(`.${fileSplit[fileSplit.length - 1]}`)
      ) {
        return;
      }
      // if it's a file, let's push the information to our filePath array
      if (fsStats.isFile()) {
        const fileObj: FileObj = {} as FileObj;
        fileObj.fileName = file;
        fileObj.filePath = directoryPath;
        fileObj.fullPath = filePath;
        fileObj.contents = '';
        fileArray.push(fileObj);
      }
      // if it's a directory, let's recurse again with the directory as the new path
      else if (fsStats.isDirectory()) recurseFiles(filePath);
    });
  }
  // invoke the recursive function
  recurseFiles(dirPath);

  // return the fileArray of all the filepaths
  return fileArray;
}

export async function stringFileContents(filePath: string) {
  // stringify the file path in utf-8 encoding using the filesystem
  const stringedCode: string = fs.readFileSync(filePath, 'utf-8') as string;
  // return the stringified code
  return stringedCode;
}

export async function stringCodeBase(
  dirPath: string,
  dirIgnoreList: string[],
  extensionApproveList: string[],
  serverPath: string
) {
  // grab all of the file paths of the code base
  const fileArray: object[] = await getCodeFiles(
    dirPath,
    dirIgnoreList,
    extensionApproveList
  );

  // set an empty array to put all of our stringified code objects inside
  const stringifiedCodeObjectArray: FileObj[] = [];

  // for each file in the fileArray, stringify the code with the filesystem and set it as a value to an object with the key as the value of the filepath
  for (const fileObj of fileArray) {
    const stringifiedCodeObject: FileObj = {...fileObj} as FileObj;
    stringifiedCodeObject.contents = await stringFileContents(
      (fileObj as FileObj).fullPath
    );
    stringifiedCodeObjectArray.push(stringifiedCodeObject);
  }

  // return our object
  return stringifiedCodeObjectArray;
}
