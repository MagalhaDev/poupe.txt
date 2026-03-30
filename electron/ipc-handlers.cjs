/**
 * IPC Handlers — registers all inter-process communication handlers.
 * Each handler bridges the renderer's `window.nimbus` calls to the StorageManager.
 */
function setupIpcHandlers(ipcMain, storage) {
  // Templates
  ipcMain.handle('storage:getTemplates', () => storage.getTemplates());
  ipcMain.handle('storage:saveTemplate', (_, template) => storage.saveTemplate(template));
  ipcMain.handle('storage:deleteTemplate', (_, id) => storage.deleteTemplate(id));
  ipcMain.handle('storage:importTemplates', (_, templates) => storage.importTemplates(templates));

  // Favorites
  ipcMain.handle('storage:getFavorites', () => storage.getFavorites());
  ipcMain.handle('storage:setFavorites', (_, favorites) => storage.setFavorites(favorites));

  // Recents
  ipcMain.handle('storage:getRecents', () => storage.getRecents());
  ipcMain.handle('storage:setRecents', (_, recents) => storage.setRecents(recents));

  // Editor content
  ipcMain.handle('storage:getEditorContent', (_, templateId) =>
    storage.getEditorContent(templateId)
  );
  ipcMain.handle('storage:saveEditorContent', (_, templateId, content) =>
    storage.saveEditorContent(templateId, content)
  );

  // Settings
  ipcMain.handle('storage:getSettings', () => storage.getSettings());
  ipcMain.handle('storage:saveSettings', (_, settings) => storage.saveSettings(settings));

  // Export / Import
  ipcMain.handle('storage:exportAll', () => storage.exportAll());
  ipcMain.handle('storage:importAll', (_, data) => storage.importAll(data));
}

module.exports = { setupIpcHandlers };
