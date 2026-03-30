import { AnimatePresence, motion } from 'framer-motion';
import { Star, ClockCounterClockwise } from '@phosphor-icons/react';
import { TEMPLATES } from '../data/templates';

const panelVariants = {
  enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

export default function ShowcaseBox({
  activeTab,
  direction,
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
    .slice(0, 3);

  const favTemplates = TEMPLATES.filter(t => favorites.includes(t.id)).slice(0, 3);

  return (
    <div className="showcase-box">
      <div className="showcase-glow" />
      <AnimatePresence mode="wait" custom={direction}>
        {activeTab === 'recentes' ? (
          <motion.div
            key="recentes"
            className="showcase-panel"
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {recentTemplates.length === 0 ? (
              <div className="empty-state">
                <ClockCounterClockwise size={32} />
                <p>Nenhum template aberto ainda.<br />Abra um template para vê-lo aqui.</p>
              </div>
            ) : (
              recentTemplates.map(t => (
                <div
                  key={t.id}
                  className="showcase-item"
                  onClick={() => onOpenTemplate(t.id)}
                >
                  <div className={`item-dot ${t.dot}`} />
                  <div className="item-info">
                    <span className="item-label">{t.title}</span>
                    <span className="item-meta">
                      {t.category.charAt(0).toUpperCase() + t.category.slice(1)} · {getTimeAgo(t.timestamp)}
                    </span>
                  </div>
                  <button
                    className={`fav-btn ${isFavorite(t.id) ? 'favorited' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                  >
                    {isFavorite(t.id)
                      ? <Star size={18} weight="fill" />
                      : <Star size={18} />
                    }
                  </button>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="favoritos"
            className="showcase-panel"
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {favTemplates.length === 0 ? (
              <div className="empty-state">
                <Star size={32} />
                <p>Nenhum favorito salvo.<br />Toque na ⭐ para favoritar um template.</p>
              </div>
            ) : (
              favTemplates.map(t => (
                <div
                  key={t.id}
                  className="showcase-item"
                  onClick={() => onOpenTemplate(t.id)}
                >
                  <div className={`item-dot ${t.dot}`} />
                  <div className="item-info">
                    <span className="item-label">{t.title}</span>
                    <span className="item-meta">
                      {t.category.charAt(0).toUpperCase() + t.category.slice(1)} · Favoritado
                    </span>
                  </div>
                  <button
                    className="fav-btn favorited"
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                  >
                    <Star size={18} weight="fill" />
                  </button>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
