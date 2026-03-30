import { useState, useCallback, useEffect } from 'react';
import * as storage from '../services/storageService';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load from backend on mount
  useEffect(() => {
    storage.getFavorites().then(setFavorites);
  }, []);

  const toggleFavorite = useCallback((templateId) => {
    setFavorites(prev => {
      const next = prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId];
      storage.setFavorites(next); // persist to backend
      return next;
    });
  }, []);

  const isFavorite = useCallback((templateId) => {
    return favorites.includes(templateId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
