import * as fs from 'fs';
// module to monitor a project file for changes
// Will need to be on a setTimeout, cleared only when another project is loaded
// factory function for monitoring the files
export default function monitorFiles(astRootObj) {
  const fetchFiles = astRootObj.fetchFiles;
  const fetches = astRootObj.fetches;
  const endpoints = astRootObj.endpoints;
  const endpointFiles = astRootObj.endpointFiles;

  const watchers: fs.FSWatcher[] = []; // watchers array so we can clear them all
  /*
  =====================
  FetchFiles Monitoring
  =====================
  */
  function setWatchers() {
    for (const file of fetchFiles) {
      // some editors sometimes trigger two change events, so we can do this based on modified time
      const watcher = fs.watch(file.fullPath, (eventType, filename) => {
        let fsStats: fs.Stats;

        // ===File Rename Event===
        if (eventType === 'rename') {
          // update the file name
          console.log(`${file.fileName} was renamed to ${filename}`);
          file.fullPath = `${file.filePath}/${filename}`;
          file.fileName = filename;
        }

        // ===File Change Event===

        // renaming triggers a change event first, which causes an error -
        // because the filename on the change is the previous one - so it doesn't exist
        // this try catch will just return since we don't care about that change
        try {
          fsStats = fs.statSync(file.fullPath);
        } catch (error) {
          return;
        }
        // get the last modified time
        const mTime = fsStats.mtime;

        // we have to do this check to avoid two change events firing
        // which VSCode and other code editors emit sometimes

        // if the last modified time is different than what we saved, do stuff...
        if (mTime.getTime() != file.lastUpdated.getTime()) {
          file.lastUpdated = mTime; // update the last modified time
          console.log(`The file ${filename} was ${eventType}d`);
        }
      });
      watchers.push(watcher);
    }

    /*
    ======================
    Server File Monitoring
    ======================
    */

    for (const file of endpointFiles) {
      if (!file.isServer) continue; // we only want to set this watch on the server, so skip if it's not
      const watcher = fs.watch(file.fullPath, (eventType, filename) => {
        let fsStats: fs.Stats;

        // ===File Rename Event===
        if (eventType === 'rename') {
          // update the file name
          console.log(`${file.fileName} was renamed to ${filename}`);
          file.fullPath = `${file.filePath}/${filename}`;
          file.fileName = filename;
        }

        // ===File Change Event===

        // renaming triggers a change event first, which causes an error -
        // because the filename on the change is the previous one - so it doesn't exist
        // this try catch will just return since we don't care about that change
        try {
          fsStats = fs.statSync(file.fullPath);
        } catch (error) {
          return;
        }
        // get the last modified time
        const mTime = fsStats.mtime;

        // we have to do this check to avoid two change events firing
        // which VSCode and other code editors emit sometimes

        // if the last modified time is different than what we saved, do stuff...
        if (mTime.getTime() != file.lastUpdated.getTime()) {
          file.lastUpdated = mTime; // update the last modified time
          console.log(`The file ${filename} was ${eventType}d`);
        }
      });
      watchers.push(watcher);
    }
  }
  setWatchers();

  return watchers;
}
