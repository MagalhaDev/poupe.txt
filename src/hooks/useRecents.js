import { useState, useCallback, useEffect } from 'react';
import * as storage from '../services/storageService';

const MAX_RECENTS = 10;

export function useRecents() {
  const [recents, setRecents] = useState([]);

  // Load from backend on mount
  useEffect(() => {
    storage.getRecents().then(setRecents);
  }, []);

  const addRecent = useCallback((templateId) => {
    setRecents(prev => {
      const filtered = prev.filter(r => r.id !== templateId);
      const next = [{ id: templateId, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENTS);
      storage.setRecents(next); // persist to backend
      return next;
    });
  }, []);

  const getTimeAgo = useCallback((timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `há ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `há ${hours}h`;
    const days = Math.floor(hours / 24);
    return `há ${days}d`;
  }, []);

  return { recents, addRecent, getTimeAgo };
}
