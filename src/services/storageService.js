import { DEFAULT_CONTENTS } from '../data/defaultContent.js';

/**
 * StorageService - Camada de abstração que funciona no Electron E no browser.
 *
 * - No Electron: usa `window.nimbus` (IPC → backend nativo com fs)
 * - No Browser: usa `localStorage` como fallback
 *
 * O React app chama este serviço sem saber se está no desktop ou web.
 */

const isElectron = typeof window !== 'undefined' && window.nimbus?.isElectron;

// ==========================================
//  TEMPLATES
// ==========================================

export async function getTemplates() {
  if (isElectron) {
    return await window.nimbus.getTemplates();
  }
  const raw = localStorage.getItem('nimbus_templates');
  return raw ? JSON.parse(raw) : [];
}

export async function saveTemplate(template) {
  if (isElectron) {
    return await window.nimbus.saveTemplate(template);
  }
  const templates = await getTemplates();
  const index = templates.findIndex(t => t.id === template.id);
  if (index >= 0) {
    templates[index] = { ...templates[index], ...template, updatedAt: Date.now() };
  } else {
    templates.push({ ...template, id: template.id || generateId(), createdAt: Date.now(), updatedAt: Date.now() });
  }
  localStorage.setItem('nimbus_templates', JSON.stringify(templates));
  return templates;
}

export async function deleteTemplate(id) {
  if (isElectron) {
    return await window.nimbus.deleteTemplate(id);
  }
  let templates = await getTemplates();
  templates = templates.filter(t => t.id !== id);
  localStorage.setItem('nimbus_templates', JSON.stringify(templates));
  localStorage.removeItem(`nimbus_editor_${id}`);
  return templates;
}

export async function importTemplates(newTemplates) {
  if (isElectron) {
    return await window.nimbus.importTemplates(newTemplates);
  }
  const existing = await getTemplates();
  const existingIds = new Set(existing.map(t => t.id));
  const merged = [...existing];
  for (const t of newTemplates) {
    if (!existingIds.has(t.id)) {
      merged.push({ ...t, createdAt: t.createdAt || Date.now(), updatedAt: Date.now() });
    }
  }
  localStorage.setItem('nimbus_templates', JSON.stringify(merged));
  return merged;
}

// ==========================================
//  FAVORITES
// ==========================================

export async function getFavorites() {
  if (isElectron) {
    return await window.nimbus.getFavorites();
  }
  const raw = localStorage.getItem('nimbus_favorites');
  return raw ? JSON.parse(raw) : [];
}

export async function setFavorites(favorites) {
  if (isElectron) {
    return await window.nimbus.setFavorites(favorites);
  }
  localStorage.setItem('nimbus_favorites', JSON.stringify(favorites));
  return favorites;
}

// ==========================================
//  RECENTS
// ==========================================

export async function getRecents() {
  if (isElectron) {
    return await window.nimbus.getRecents();
  }
  const raw = localStorage.getItem('nimbus_recents');
  return raw ? JSON.parse(raw) : [];
}

export async function setRecents(recents) {
  if (isElectron) {
    return await window.nimbus.setRecents(recents);
  }
  localStorage.setItem('nimbus_recents', JSON.stringify(recents));
  return recents;
}

// ==========================================
//  EDITOR CONTENT
// ==========================================

export async function getEditorContent(templateId) {
  let content;
  if (isElectron) {
    content = await window.nimbus.getEditorContent(templateId);
  } else {
    const raw = localStorage.getItem(`nimbus_editor_${templateId}`);
    content = raw ? JSON.parse(raw) : null;
  }

  // If no saved content, return the default from the repo files
  if (!content || (!content.content && !content.title)) {
    return DEFAULT_CONTENTS[templateId] || { title: '', content: '' };
  }

  return content;
}

export async function saveEditorContent(templateId, data) {
  if (isElectron) {
    return await window.nimbus.saveEditorContent(templateId, data);
  }
  localStorage.setItem(`nimbus_editor_${templateId}`, JSON.stringify(data));
  return true;
}

// ==========================================
//  SETTINGS
// ==========================================

export async function getSettings() {
  if (isElectron) {
    return await window.nimbus.getSettings();
  }
  const raw = localStorage.getItem('nimbus_settings');
  return raw ? JSON.parse(raw) : { theme: 'dark', language: 'pt-BR', autoSaveInterval: 500 };
}

export async function saveSettings(settings) {
  if (isElectron) {
    return await window.nimbus.saveSettings(settings);
  }
  const current = await getSettings();
  const merged = { ...current, ...settings };
  localStorage.setItem('nimbus_settings', JSON.stringify(merged));
  return merged;
}

// ==========================================
//  EXPORT / IMPORT ALL
// ==========================================

export async function exportAllData() {
  if (isElectron) {
    return await window.nimbus.exportData();
  }
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    templates: await getTemplates(),
    favorites: await getFavorites(),
    recents: await getRecents(),
    settings: await getSettings(),
  };
}

export async function importAllData(data) {
  if (isElectron) {
    return await window.nimbus.importData(data);
  }
  if (data.templates) localStorage.setItem('nimbus_templates', JSON.stringify(data.templates));
  if (data.favorites) localStorage.setItem('nimbus_favorites', JSON.stringify(data.favorites));
  if (data.recents) localStorage.setItem('nimbus_recents', JSON.stringify(data.recents));
  if (data.settings) await saveSettings(data.settings);
  return true;
}

// ==========================================
//  PLATFORM INFO
// ==========================================

export function getPlatform() {
  if (isElectron) return window.nimbus.platform;
  return 'web';
}

export function isRunningInElectron() {
  return isElectron;
}

// ==========================================
//  UTILS
// ==========================================

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
