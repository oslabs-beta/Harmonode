import * as fs from 'fs';
// module to monitor a project file for changes
// Will need to be on a setTimeout, cleared only when another project is loaded
// factory function for monitoring the files
export default function monitorFiles(astRootObj) {
  // setting a monitor loop function -- may be unnecessary, but keeping for now
  function monitorLoop() {
    // grab all of the files from the astRootObj
    const fetchFiles = astRootObj.fetchFiles;
    const fetches = astRootObj.fetches;
    const endpoints = astRootObj.endpoints;
    const endpointFiles = astRootObj.endpointFiles;

    // hardcoded 1second delay - which is the frequency for the monitor loop
    setTimeout(async () => {
      // if there's a change in any of these files, it will trigger the conditions below
      const fetchFileChange = await checkFetchFiles(fetchFiles);
      const fetchChange = await checkFetches(fetches);
      const endpointFileChange = await checkEndpointFiles(endpointFiles);
      const endpointChange = await checkEndpoints(endpoints);

      // what we should do if there's a change detected
      if (fetchFileChange) {
        console.log(`Change in fetchFiles at ${fetchFileChange} detected`);
      }
      if (fetchChange) {
        console.log(`Change in fetch at ${fetchChange} detected`);
      }
      if (endpointFileChange) {
        console.log(
          `Change in endpointFiles at ${endpointFileChange} detected`
        );
      }
      if (endpointChange) {
        console.log(`Change in endpoints at ${endpointChange} detected`);
      }
      monitorLoop();
    }, 1000);
  }
  monitorLoop();
}

async function checkFetchFiles(fetchFiles) {
  for (const file of fetchFiles) {
    const filePath: string = file.fullPath;
    const lastUpdated: Date = file.lastUpdated;
    const fsStats: fs.Stats = fs.statSync(filePath);

    const mTime = new Date(fsStats.mtime);

    if (mTime.getTime() != lastUpdated.getTime()) {
      file.lastUpdated = mTime;
      return file.fileName;
    }
  }
  return null;
}
async function checkFetches(fetches) {
  return null;
}
async function checkEndpointFiles(endpointFiles) {
  return null;
}
async function checkEndpoints(endpoints) {
  return null;
}
