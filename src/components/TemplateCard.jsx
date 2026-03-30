import { motion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';

function highlightText(text, query) {
  if (!query || query.length < 2) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <span key={i} className="highlight">{part}</span> : part
  );
}

export default function TemplateCard({ template, isFav, onToggleFav, onOpen, searchQuery, index }) {
  return (
    <motion.article
      className="template-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      layout
    >
      <div className={`card-glow ${template.glow}`} />
      <div className="card-content">
        <div className="card-header-row">
          <h3>{highlightText(template.title, searchQuery)}</h3>
          <motion.button
            className={`card-fav-btn ${isFav ? 'favorited' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFav(template.id); }}
            whileTap={{ scale: 1.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {isFav ? <Star size={20} weight="fill" /> : <Star size={20} />}
          </motion.button>
        </div>
        <p>{highlightText(template.description, searchQuery)}</p>
        <button className="btn-open" onClick={() => onOpen(template.id)}>
          Abrir
        </button>
      </div>
    </motion.article>
  );
}
