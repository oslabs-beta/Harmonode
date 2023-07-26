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

// return a new file in the file collection. Must receive an origin file. If a valid destination file exists, return it
// if NOT, return 'not a valid path or file doesn't exist'

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

  const navToOtherFile = (originString: string, destinationString: string) => {
    const originPaths = getPathArray(originString);
    const destPathArray = destinationString.split("/");
    let pathToNewFile: string[] = [];
    let dots: number;

    if (destPathArray[0] === "..") dots = -2;
    else if (destPathArray[0] === ".") dots = -1;
    else dots = 0;

    pathToNewFile = [...originPaths.slice(0, dots), ...destPathArray.slice(1)];
    for (let pathArray of allPathArrays) {
      if (path.join(...pathArray) === path.join(...pathToNewFile)) {
        return path.join(...pathArray);
      }
    }
    return "no such file exists";
  };

  for (let key in serverFileObj) {
    if (typeof serverFileObj[key] === "string") {
      console.log(navToOtherFile(serverPath, serverFileObj[key]));
    }
  }

  console.log(navToOtherFile(serverPath, '../server/controllers/devsController.js'))
};

export default fullBackEndCreator;
