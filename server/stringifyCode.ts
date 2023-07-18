const fs = require('fs');
const path = require('path');

// function to grab all the file paths for code to convert to stringify
// dirPath = root directory to grab the code files
// dirIgnoreList is an array of the directory names that we want to ignore
// extensionIgnoreList is an array of the file extensions we will want to ignore to reduce AST parsing overhead
export async function getCodeFiles(
  dirPath: string,
  dirIgnoreList: string[],
  extensionIgnoreList: string[]
) {
  dirIgnoreList = ['node_modules', '.git'];

  // create a fileArray to put the path of each file
  const fileArray: string[] = [];

  // recursive function to collect all the file paths into the array
  function recurseFiles(directoryPath = dirPath as string) {
    // get all of the file paths into an array so we can iterate and recurse through them
    const files = fs.readdirSync(directoryPath) as string[];

    // iterate over all the files
    files.forEach((file: string) => {
      // skip if the file path is in the ignore list
      if (dirIgnoreList.includes(file)) return; // **Eventually want this to be implemented**

      // skip if the extension is in the ignore list
      const fileSplit = file.split('.');
      if (extensionIgnoreList.includes(fileSplit[fileSplit.length - 1])) return;

      // get the full file path
      const filePath = path.join(directoryPath, file);

      // get the files stats - tells us meta details of the file
      const fsStats = fs.statSync(filePath);

      // if it's a string, let's push it to our filePath array
      if (fsStats.isFile()) fileArray.push(filePath);
      // if it's a directory, let's recurse again
      else if (fsStats.isDirectory()) recurseFiles(filePath);
    });
  }
  // invoke the recursive function
  recurseFiles(dirPath);

  // return the fileArray of all the filepaths
  return fileArray;
}

export async function stringFile(filePath: string) {
  // stringify the file path in utf-8 encoding using the filesystem
  const stringedCode: string = fs.readFileSync(filePath, 'utf-8') as string;
  // return the stringified code
  return stringedCode;
}

export async function stringCodeBase(
  dirPath: string,
  dirIgnoreList: string[],
  extensionIgnoreList: string[]
) {
  // grab all of the file paths of the code base
  const fileArray: string[] = await getCodeFiles(
    dirPath,
    dirIgnoreList,
    extensionIgnoreList
  );

  // set an empty array to put all of our stringified code objects inside
  const stringifiedCodeObject: object[] = [];

  // for each file in the fileArray, stringify the code with the filesystem and set it as a value to an object with the key as the value of the filepath
  for (const file of fileArray) {
    const stringifiedCode = {};
    stringifiedCode[file] = await stringFile(file);
    stringifiedCodeObject.push(stringifiedCode);
  }

  // return our object
  return stringifiedCodeObject;
}
