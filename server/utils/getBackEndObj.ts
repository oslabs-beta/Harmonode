import * as path from "path";
import endpointParse from "../ast/serverParser";

// helper function to extract array of strings for paths in each file
const getPathArray = (routeString: string): string[] => {
  const pathParts: string[] = routeString.split(path.sep);
  const last: string = pathParts[pathParts.length - 1];
  if (last.includes("."))
    pathParts[pathParts.length - 1] = last.slice(0, last.indexOf("."));
  return pathParts;
};

const fullBackEndCreator = (codefiles, serverPath: string) => {
  // create the full array of all file paths, so we can navigate through this...
  const allPathArrays: Array<Array<string>> = [];

  // this object will have all needed data from the server file, to be retrieved in loop below...
  let serverFileObj: object = {};

  for (let file of codefiles) {
    allPathArrays.push(getPathArray(file.fullPath));
    if (file.fullPath === serverPath) {
      serverFileObj = endpointParse(file.contents);
    }
  }

  const serverPaths = getPathArray(serverPath);
  console.log(serverPaths);

  for (let key in serverFileObj) {
    if (typeof serverFileObj[key] === 'string') {
      const importString = serverFileObj[key];
      const importPathArray = importString.split('/');
      let pathToNewFile : string[] = [];
      console.log(importPathArray)
      if (importPathArray[0] === '.') {
        pathToNewFile = [...serverPaths.slice(0, -1), ...importPathArray.slice(1)];
        console.log(pathToNewFile); 
      }

    }
  }
};

export default fullBackEndCreator;
