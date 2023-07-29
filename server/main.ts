import {BrowserWindow, app, ipcMain, dialog, nativeImage} from 'electron';
import {stringCodeBase} from './utils/stringifyCode';
import {getDirectories} from './utils/getFileDirectories';
import {DirObj, FileObj} from './types';
import monitorFiles from './utils/monitorFileChanges';
import * as path from 'path';
import Store from 'electron-store';
import createComponentObject from './utils/createComponentObject';
import * as fs from 'fs';

const dev: boolean = process.env.NODE_ENV === 'development';
const url = require('url');
const store = new Store();

// need to have all our file watchers in global so we can clear them
let watchers: fs.FSWatcher[] = [];

let mainWindow: BrowserWindow | null;

process.on('uncaughtException', (error) => {
  // Hiding the error on the terminal as well
  console.error('Uncaught Exception:', error);
});
app.setName('Harmonode');
const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
app.dock.setIcon(icon);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1400,
    minWidth: 900,
    minHeight: 720,
    title: 'Harmonode',
    icon: nativeImage.createFromPath(path.join(__dirname, 'icon.png')),
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

app.whenReady().then(() => {
  createWindow();
});

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
  async (_, folder, ignore, extensions, server) => {
    const codeFiles: FileObj[] = await stringCodeBase(
      folder,
      ignore,
      extensions,
      server
    );

    const codeFileObj = {
      folder,
      ignore,
      extensions,
      server,
    };
    // create the component object
    const componentObj = createComponentObject(codeFiles, server);

    // clear all the watchers before adding new ones
    for (const watcher of watchers) watcher.close();

    // add the new file watchers
    watchers = monitorFiles(componentObj, codeFileObj);

    // return the component object to front end
    return componentObj;
  }
);

// handler to load a folder
// -rebuilds the AST for it to get most up to date info
// -clears the watchers on the previous project
// -adds new watchers on the loaded project
ipcMain.handle('loadProject', async (_, project) => {
  // need to restring the code base
  const {folder, ignore, extensions, server} = project;
  const codeFiles: FileObj[] = await stringCodeBase(
    folder,
    ignore,
    extensions,
    server
  );

  const codeFileObj = {folder, ignore, extensions, server};
  // create the component object
  const componentObj = createComponentObject(codeFiles, server);

  // clear any existing watchers
  for (const watcher of watchers) watcher.close();
  // set new watchers
  watchers = monitorFiles(componentObj, codeFileObj);
  // return the component object
  return componentObj;
});

ipcMain.handle('getDirectories', async (_, dirPath) => {
  const directories: DirObj[] = await getDirectories(dirPath);
  return directories;
});

ipcMain.handle('stringCode', async (_, filePath) => {
  return await fs.readFileSync(filePath, 'utf-8');
});

ipcMain.handle('saveCode', async (_, filePath, code) => {
  return await fs.writeFileSync(filePath, code);
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

export {mainWindow};
