"use strict";
const { BrowserWindow, Menu, app } = require('electron');
const dev = process.env.NODE_ENV === 'development';
const path = require('path');
const url = require('url');
let mainWindow;
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
        webPreferences: { nodeIntegration: true, contextIsolation: false },
        icon: path.join(__dirname, ''),
    });
    //   if (process.platform === 'darwin' || process.platform === 'win32') {
    //     app.dock.setIcon(path.join(__dirname, ''));
    //   }
    let indexPath;
    if (dev) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:8080',
            pathname: 'index.html',
            slashes: true,
        });
    }
    else {
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
        if (mainWindow)
            mainWindow.show();
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    else {
        mainWindow = null;
    }
});
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map