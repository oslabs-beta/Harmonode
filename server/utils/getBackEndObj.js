import * as path from 'path';
// import endpointParse from "../ast/serverParser";
import endpointParse from '../ast2/serverParser';
import routerParser from '../ast/routerParser';
import {FileObj, pathFileObj} from '../types';

// helper function to extract array of strings for paths in each file
const getPathArray = (routeString) => {
  const pathParts = routeString.split(path.sep);
  // const last = pathParts[pathParts.length - 1];
  // if (last.includes('.'))
  //   pathParts[pathParts.length - 1] = last.slice(0, last.indexOf('.'));
  return pathParts;
};

// return a new file in the file collection. Must receive an origin file. If a valid destination file exists, return it
// if NOT, return 'not a valid path or file doesn't exist'

const fullBackEndCreator = (codefiles, serverPath) => {
  // create the full array of all file paths, so we can navigate through this...
  const allPathArrays = [];
  const pathFileObjs = [];

  // this object will have all needed data from the server file, to be retrieved in loop below...
  let serverFilePaths = {};
  const breadCrumbs = [];

  for (let file of codefiles) {
    const pathArray = getPathArray(file.fullPath);
    allPathArrays.push('/' + pathArray[pathArray.length - 1]);
    console.log(allPathArrays, '!!!!APA!!!!');
    pathFileObjs.push({path: getPathArray(file.fullPath), file});

    // parse the server file first and get each endpoint and where it will go next
    if (file.fullPath === serverPath) {
      serverFilePaths = endpointParse(file.contents, file.fileName).filter(
        (path) => path !== undefined
      );
      breadCrumbs.push(...serverFilePaths);
    }
  }

  const navToOtherFile = (originString, destinationString) => {
    if (typeof destinationString !== 'string') return 'no router file';
    const originPaths = getPathArray(originString);
    const destPathArray = destinationString.split('/');
    let pathToNewFile = [];
    let dots = 0;

    for (let el of destPathArray) {
      if (el === '..') {
        dots === 0 ? (dots -= 2) : (dots -= 1);
      } else if (el === '.') dots -= 1;
    }

    pathToNewFile = [
      ...originPaths.slice(0, dots),
      ...destPathArray.filter((el) => !el.includes('.')),
    ];
    for (let pathFile of pathFileObjs) {
      if (JSON.stringify(pathFile.path) === JSON.stringify(pathToNewFile)) {
        return pathFile.file;
      }
    }

    for (let pathArray of allPathArrays) {
      if (path.join(...pathArray) === path.join(...pathToNewFile)) {
        return path.join(...pathArray);
      }
    }

    return 'no such file exists';
  };

  for (let breadcrumb of serverFilePaths) {
    // for getting stuff out of routes
    if (breadcrumb.nextFile) {
      const routerFile = navToOtherFile(serverPath, breadcrumb.nextFile);
      if (typeof routerFile === 'string') continue;
      const newCrumbs = endpointParse(routerFile.contents, routerFile.fileName);
      breadCrumbs.push(...newCrumbs);
    }
  }
  return breadCrumbs;
};

export default fullBackEndCreator;
