import * as path from "path";
import endpointParse from "../ast/serverParser";
import routerParser from "../ast/routerParser";
import { FileObj, pathFileObj } from "../types";

// helper function to extract array of strings for paths in each file
const getPathArray = (routeString) => {
  const pathParts = routeString.split(path.sep);
  const last = pathParts[pathParts.length - 1];
  if (last.includes("."))
    pathParts[pathParts.length - 1] = last.slice(0, last.indexOf("."));
  return pathParts;
};

// return a new file in the file collection. Must receive an origin file. If a valid destination file exists, return it
// if NOT, return 'not a valid path or file doesn't exist'

const fullBackEndCreator = (codefiles, serverPath) => {
  // create the full array of all file paths, so we can navigate through this...
  const allPathArrays = [];
  const pathFileObjs = [];

  // this object will have all needed data from the server file, to be retrieved in loop below...
  let serverFileObj = {};

  for (let file of codefiles) {
    allPathArrays.push(getPathArray(file.fullPath));
    pathFileObjs.push({ path: getPathArray(file.fullPath), file });

    // parse the server file first and get each endpoint and where it will go next
    if (file.fullPath === serverPath) {
      serverFileObj = endpointParse(file.contents);
      console.log(serverFileObj)
    }
  }

  const navToOtherFile = (originString, destinationString) => {
    const originPaths = getPathArray(originString);
    const destPathArray = destinationString.split("/");
    let pathToNewFile = [];
    let dots = 0;

    for (let el of destPathArray) {
      if (el === "..") {
        dots === 0 ? (dots -= 2) : (dots -= 1);
      } else if (el === ".") dots -= 1;
    }

    pathToNewFile = [
      ...originPaths.slice(0, dots),
      ...destPathArray.filter((el) => !el.includes(".")),
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

    return "no such file exists";
  };

  for (let key in serverFileObj) {
    // for getting stuff out of routes
    if (typeof serverFileObj[key] === "string") {
      const routerFile = navToOtherFile(
        serverPath,
        serverFileObj[key]
      );
      console.log(routerParser(routerFile.contents))
    }
  }
};

export default fullBackEndCreator;
