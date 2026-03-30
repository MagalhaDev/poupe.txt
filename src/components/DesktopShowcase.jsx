import { motion } from 'framer-motion';
import { Star, ClockCounterClockwise } from '@phosphor-icons/react';
import { TEMPLATES } from '../data/templates';

export default function DesktopShowcase({
  recents,
  favorites,
  getTimeAgo,
  isFavorite,
  toggleFavorite,
  onOpenTemplate,
}) {
  const recentTemplates = recents
    .map(r => {
      const t = TEMPLATES.find(t => t.id === r.id);
      return t ? { ...t, timestamp: r.timestamp } : null;
    })
    .filter(Boolean)
    .slice(0, 4);

  const favTemplates = TEMPLATES.filter(t => favorites.includes(t.id)).slice(0, 4);

  return (
    <div className="desktop-showcase-row">
      {/* RECENTES BOX */}
      <div className="desktop-showcase-box">
        <div className="showcase-glow" />
        <div className="dsk-box-header">
          <div className="dsk-box-label">
            <ClockCounterClockwise size={18} weight="fill" />
            <span>Recentes</span>
          </div>
          <span className="dsk-box-count">{recents.length}</span>
        </div>
        <div className="dsk-box-body">
          {recentTemplates.length === 0 ? (
            <div className="dsk-empty">
              <ClockCounterClockwise size={28} />
              <p>Nenhum template aberto ainda</p>
            </div>
          ) : (
            recentTemplates.map((t, i) => (
              <motion.div
                key={t.id}
                className="dsk-box-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => onOpenTemplate(t.id)}
              >
                <div className={`item-dot ${t.dot}`} />
                <div className="dsk-box-item-info">
                  <span className="dsk-box-item-title">{t.title}</span>
                  <span className="dsk-box-item-meta">{getTimeAgo(t.timestamp)}</span>
                </div>
                <button
                  className={`fav-btn ${isFavorite(t.id) ? 'favorited' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                >
                  {isFavorite(t.id)
                    ? <Star size={16} weight="fill" />
                    : <Star size={16} />
                  }
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* FAVORITOS BOX */}
      <div className="desktop-showcase-box">
        <div className="showcase-glow fav-glow" />
        <div className="dsk-box-header">
          <div className="dsk-box-label fav-label">
            <Star size={18} weight="fill" />
            <span>Favoritos</span>
          </div>
          <span className="dsk-box-count">{favorites.length}</span>
        </div>
        <div className="dsk-box-body">
          {favTemplates.length === 0 ? (
            <div className="dsk-empty">
              <Star size={28} />
              <p>Nenhum favorito salvo</p>
            </div>
          ) : (
            favTemplates.map((t, i) => (
              <motion.div
                key={t.id}
                className="dsk-box-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => onOpenTemplate(t.id)}
              >
                <div className={`item-dot ${t.dot}`} />
                <div className="dsk-box-item-info">
                  <span className="dsk-box-item-title">{t.title}</span>
                  <span className="dsk-box-item-meta">
                    {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                  </span>
                </div>
                <button
                  className="fav-btn favorited"
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                >
                  <Star size={16} weight="fill" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
