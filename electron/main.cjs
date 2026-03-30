const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { setupIpcHandlers } = require('./ipc-handlers.cjs');
const { StorageManager } = require('./storage.cjs');

let mainWindow;

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 400,
    minHeight: 600,
    title: 'Nimbus — Produtividade',
    titleBarStyle: 'hiddenInset', // macOS clean title bar
    backgroundColor: '#07090F',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '..', 'public', 'icon.png'),
  });

  // Initialize storage
  const storage = new StorageManager(app.getPath('userData'));

  // Setup IPC communication bridge
  setupIpcHandlers(ipcMain, storage);

  // Load the app
  if (isDev) {
    console.log('[Nimbus] Running in DEV mode — loading localhost:5173');
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    // Use app.getAppPath() to resolve the path correctly inside the packaged .app
    const appPath = app.getAppPath();
    const indexPath = path.join(appPath, 'dist', 'index.html');
    console.log('[Nimbus] Running in PRODUCTION mode — loading:', indexPath);

    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('[Nimbus] Failed to load index.html:', err);
      // Fallback: try relative to __dirname (for older build structures)
      const fallbackPath = path.join(__dirname, '..', 'dist', 'index.html');
      console.log('[Nimbus] Trying fallback path:', fallbackPath);
      mainWindow.loadFile(fallbackPath).catch((err2) => {
        console.error('[Nimbus] Fallback also failed:', err2);
      });
    });
  }

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('[Nimbus] did-fail-load:', errorCode, errorDescription, validatedURL);
  });

  mainWindow.webContents.on('dom-ready', () => {
    console.log('[Nimbus] DOM is ready');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// macOS: re-create window when dock icon is clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow);
