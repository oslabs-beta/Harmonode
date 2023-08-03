import {ipcMain} from 'electron';
import * as fs from 'fs';
import {mainWindow} from '../main';
import createComponentObject from './createComponentObject';
import {stringCodeBase} from './stringifyCode';
// module to monitor a project file for changes
// Will need to be on a setTimeout, cleared only when another project is loaded
// factory function for monitoring the files
export default function monitorFiles(astRootObj, codeFileObj) {
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
      const watcher = fs.watch(file.fullPath, async (eventType, filename) => {
        let fsStats: fs.Stats;

        // ===File Rename Event===
        if (eventType === 'rename') {
          // update the file name
          console.log(`${file.fileName} was renamed to ${filename}`);
          file.fullPath = `${file.filePath}/${filename}`;
          file.fileName = filename;
          mainWindow?.webContents.send('fileChanged', astRootObj);
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
          const {folder, ignore, extensions, server} = codeFileObj;
          const codeFiles = await stringCodeBase(
            folder,
            ignore,
            extensions,
            server
          );
          const newAst = createComponentObject(codeFiles, server);
          /*
          const stringifiedFile = stringFileContents(file.fullPath)
          const parsedFetchArray = fetchParser(stringifiedFile)
          const newFileFetches = []
          for (const fetch of file.fetches) {
          }
          
          */
          mainWindow?.webContents.send('fileChanged', newAst);
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
      const watcher = fs.watch(file.fullPath, async (eventType, filename) => {
        let fsStats: fs.Stats;

        // ===File Rename Event===
        if (eventType === 'rename') {
          // update the file name
          console.log(`${file.fileName} was renamed to ${filename}`);
          file.fullPath = `${file.filePath}/${filename}`;
          file.fileName = filename;
          mainWindow?.webContents.send('fileChanged', astRootObj);
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
          const {folder, ignore, extensions, server} = codeFileObj;
          const codeFiles = await stringCodeBase(
            folder,
            ignore,
            extensions,
            server
          );
          const newAst = createComponentObject(codeFiles, server);
          mainWindow?.webContents.send('fileChanged', newAst);
        }
      });
      watchers.push(watcher);
    }
  }
  setWatchers();

  return watchers;
}
