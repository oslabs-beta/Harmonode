import {BrowserWindow, app, ipcMain, dialog} from 'electron';
import {stringCodeBase} from './utils/stringifyCode';
import {getDirectories} from './utils/getFileDirectories';
import {DirObj, FileObj} from './types';
import monitorFiles from './utils/monitorFileChanges';
import Store from 'electron-store';
import createComponentObject from './utils/createComponentObject';

const dev: boolean = process.env.NODE_ENV === 'development';
const path = require('path');
const url = require('url');
const store = new Store();

let mainWindow: BrowserWindow | null;

process.on('uncaughtException', (error) => {
  // Hiding the error on the terminal as well
  console.error('Uncaught Exception:', error);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1400,
    minWidth: 900,
    minHeight: 720,
    title: 'Harmonode',
    show: false,

    webPreferences: {nodeIntegration: true, contextIsolation: false},
  });

  let indexPath: string;
  if (dev) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    // need to eventually change for when this isn't the dev
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    mainWindow = null;
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

/*
=================
  IPC Handlers
=================
*/

ipcMain.handle('openFolderDialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return result.filePaths[0];
});

ipcMain.handle('openFileDialog', async (_, dirPath) => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: dirPath,
  });
  return result.filePaths[0];
});

ipcMain.handle(
  'countCodeFiles',
  async (_, dirPath, ignoreList, approvedExt, serverPath) => {
    const codeFiles: FileObj[] = await stringCodeBase(
      dirPath,
      ignoreList,
      approvedExt,
      serverPath
    );
    return codeFiles.length;
  }
);

ipcMain.handle(
  'readCodeFiles',
  async (_, projectDir, ignoreList, approvedExt, serverPath) => {
    const codeFiles: FileObj[] = await stringCodeBase(
      projectDir,
      ignoreList,
      approvedExt,
      serverPath
    );

    const componentObj = createComponentObject(codeFiles, serverPath);

    monitorFiles(componentObj);
    return componentObj;
  }
);

ipcMain.handle('getDirectories', async (_, dirPath) => {
  const directories: DirObj[] = await getDirectories(dirPath);
  return directories;
});

// ==== Electron Store Stuff ====

ipcMain.handle('storeProjects', (event, projects) => {
  store.set('projects', projects);
});

ipcMain.handle('getProjects', (event) => {
  const storedProjects = store.get('projects');
  return storedProjects;
});

ipcMain.handle('deleteProjects', (event) => {
  store.delete('projects');
});
