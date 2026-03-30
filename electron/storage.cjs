const fs = require('fs');
const path = require('path');

/**
 * StorageManager — handles all local file-based persistence.
 *
 * Data is stored as JSON files inside the app's userData directory:
 *   - templates.json    → user-created/modified templates
 *   - favorites.json    → array of favorited template IDs
 *   - recents.json      → array of { id, timestamp } objects
 *   - editor/           → folder with per-template content files
 *   - settings.json     → user preferences
 */
class StorageManager {
  constructor(userDataPath) {
    this.basePath = path.join(userDataPath, 'nimbus-data');
    this.editorPath = path.join(this.basePath, 'editor');

    // Ensure directories exist
    this._ensureDir(this.basePath);
    this._ensureDir(this.editorPath);
  }

  // ==========================================
  //  PRIVATE HELPERS
  // ==========================================

  _ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  _readJSON(filename, fallback = null) {
    const filePath = path.join(this.basePath, filename);
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error(`[Storage] Error reading ${filename}:`, err.message);
    }
    return fallback;
  }

  _writeJSON(filename, data) {
    const filePath = path.join(this.basePath, filename);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error(`[Storage] Error writing ${filename}:`, err.message);
      return false;
    }
  }

  // ==========================================
  //  TEMPLATES
  // ==========================================

  getTemplates() {
    return this._readJSON('templates.json', []);
  }

  saveTemplate(template) {
    const templates = this.getTemplates();
    const index = templates.findIndex(t => t.id === template.id);

    if (index >= 0) {
      templates[index] = { ...templates[index], ...template, updatedAt: Date.now() };
    } else {
      templates.push({
        ...template,
        id: template.id || this._generateId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    this._writeJSON('templates.json', templates);
    return templates;
  }

  deleteTemplate(id) {
    let templates = this.getTemplates();
    templates = templates.filter(t => t.id !== id);
    this._writeJSON('templates.json', templates);

    // Also remove editor content
    const editorFile = path.join(this.editorPath, `${id}.json`);
    if (fs.existsSync(editorFile)) {
      fs.unlinkSync(editorFile);
    }

    return templates;
  }

  importTemplates(newTemplates) {
    const existing = this.getTemplates();
    const existingIds = new Set(existing.map(t => t.id));

    const merged = [...existing];
    for (const t of newTemplates) {
      if (!existingIds.has(t.id)) {
        merged.push({ ...t, createdAt: t.createdAt || Date.now(), updatedAt: Date.now() });
      }
    }

    this._writeJSON('templates.json', merged);
    return merged;
  }

  // ==========================================
  //  FAVORITES
  // ==========================================

  getFavorites() {
    return this._readJSON('favorites.json', []);
  }

  setFavorites(favorites) {
    this._writeJSON('favorites.json', favorites);
    return favorites;
  }

  // ==========================================
  //  RECENTS
  // ==========================================

  getRecents() {
    return this._readJSON('recents.json', []);
  }

  setRecents(recents) {
    this._writeJSON('recents.json', recents);
    return recents;
  }

  // ==========================================
  //  EDITOR CONTENT
  // ==========================================

  getEditorContent(templateId) {
    const filePath = path.join(this.editorPath, `${templateId}.json`);
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error(`[Storage] Error reading editor content for ${templateId}:`, err.message);
    }
    return { title: '', content: '' };
  }

  saveEditorContent(templateId, data) {
    const filePath = path.join(this.editorPath, `${templateId}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error(`[Storage] Error saving editor content for ${templateId}:`, err.message);
      return false;
    }
  }

  // ==========================================
  //  SETTINGS
  // ==========================================

  getSettings() {
    return this._readJSON('settings.json', {
      theme: 'dark',
      language: 'pt-BR',
      autoSaveInterval: 500,
    });
  }

  saveSettings(settings) {
    const current = this.getSettings();
    const merged = { ...current, ...settings };
    this._writeJSON('settings.json', merged);
    return merged;
  }

  // ==========================================
  //  EXPORT / IMPORT ALL DATA
  // ==========================================

  exportAll() {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      templates: this.getTemplates(),
      favorites: this.getFavorites(),
      recents: this.getRecents(),
      settings: this.getSettings(),
    };
  }

  importAll(data) {
    if (data.templates) this._writeJSON('templates.json', data.templates);
    if (data.favorites) this._writeJSON('favorites.json', data.favorites);
    if (data.recents) this._writeJSON('recents.json', data.recents);
    if (data.settings) this.saveSettings(data.settings);
    return true;
  }

  // ==========================================
  //  UTILS
  // ==========================================

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }
}

module.exports = { StorageManager };
