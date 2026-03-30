const { contextBridge, ipcRenderer } = require('electron');

/**
 * Preload script — exposes a safe API to the renderer process.
 * The renderer (React app) can access these via `window.nimbus`.
 */
contextBridge.exposeInMainWorld('nimbus', {
  // ==========================================
  //  TEMPLATES
  // ==========================================
  getTemplates: () => ipcRenderer.invoke('storage:getTemplates'),
  saveTemplate: (template) => ipcRenderer.invoke('storage:saveTemplate', template),
  deleteTemplate: (id) => ipcRenderer.invoke('storage:deleteTemplate', id),
  importTemplates: (templates) => ipcRenderer.invoke('storage:importTemplates', templates),

  // ==========================================
  //  FAVORITES
  // ==========================================
  getFavorites: () => ipcRenderer.invoke('storage:getFavorites'),
  setFavorites: (favorites) => ipcRenderer.invoke('storage:setFavorites', favorites),

  // ==========================================
  //  RECENTS
  // ==========================================
  getRecents: () => ipcRenderer.invoke('storage:getRecents'),
  setRecents: (recents) => ipcRenderer.invoke('storage:setRecents', recents),

  // ==========================================
  //  EDITOR CONTENT
  // ==========================================
  getEditorContent: (templateId) => ipcRenderer.invoke('storage:getEditorContent', templateId),
  saveEditorContent: (templateId, content) =>
    ipcRenderer.invoke('storage:saveEditorContent', templateId, content),

  // ==========================================
  //  SETTINGS
  // ==========================================
  getSettings: () => ipcRenderer.invoke('storage:getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('storage:saveSettings', settings),

  // ==========================================
  //  EXPORT / IMPORT
  // ==========================================
  exportData: () => ipcRenderer.invoke('storage:exportAll'),
  importData: (data) => ipcRenderer.invoke('storage:importAll', data),

  // ==========================================
  //  PLATFORM INFO
  // ==========================================
  platform: process.platform,
  isElectron: true,
});
