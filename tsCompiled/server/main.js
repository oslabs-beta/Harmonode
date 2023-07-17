"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const dev = process.env.NODE_ENV === 'development';
const path = require('path');
const url = require('url');
let mainWindow;
process.on('uncaughtException', (error) => {
    // Hiding the error on the terminal as well
    console.error('Uncaught Exception:', error);
});
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1800,
        height: 1400,
        minWidth: 900,
        minHeight: 720,
        title: 'Harmonode',
        show: false,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
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
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
    else {
        mainWindow = null;
    }
});
electron_1.app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.ipcMain.handle('openFolderDialog', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield electron_1.dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    return result.filePaths[0];
}));
//# sourceMappingURL=main.js.map