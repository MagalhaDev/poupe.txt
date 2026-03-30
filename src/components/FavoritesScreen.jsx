import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, MagnifyingGlass, Star } from '@phosphor-icons/react';
import { TEMPLATES } from '../data/templates';

export default function FavoritesScreen({ favorites, toggleFavorite, onOpen, onBack }) {
  const [search, setSearch] = useState('');

  const favTemplates = useMemo(() => {
    const items = TEMPLATES.filter(t => favorites.includes(t.id));

    if (search.length >= 2) {
      const q = search.toLowerCase();
      return items.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [favorites, search]);

  return (
    <motion.div
      className="fullscreen-tab"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <header className="tab-screen-header">
        <button className="editor-back-btn" onClick={onBack}>
          <CaretLeft size={18} /> Voltar
        </button>
        <h2 className="tab-screen-title">
          <Star size={22} weight="fill" /> Favoritos
        </h2>
        <div style={{ width: 80 }} />
      </header>

      {/* Search */}
      <div className="tab-search-container">
        <div className="search-container">
          <span className="search-icon"><MagnifyingGlass size={20} /></span>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar nos favoritos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="tab-list-scrollable">
        {favTemplates.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 48 }}>
            <Star size={40} />
            <p>
              {search
                ? 'Nenhum resultado encontrado.'
                : 'Nenhum favorito salvo.\nToque na ⭐ para favoritar um template.'}
            </p>
          </div>
        ) : (
          favTemplates.map((t, index) => (
            <motion.div
              key={t.id}
              className="tab-list-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
              transition={{ delay: index * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              layout
              onClick={() => onOpen(t.id)}
            >
              <div className={`item-dot ${t.dot}`} />
              <div className="tab-list-info">
                <span className="tab-list-title">{t.title}</span>
                <span className="tab-list-meta">
                  {t.category.charAt(0).toUpperCase() + t.category.slice(1)} · Favoritado
                </span>
                <span className="tab-list-desc">{t.description}</span>
              </div>
              <button
                className="card-fav-btn favorited"
                onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
              >
                <Star size={20} weight="fill" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
