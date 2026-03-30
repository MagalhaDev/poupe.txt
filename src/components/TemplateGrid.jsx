import { AnimatePresence, motion } from 'framer-motion';
import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates, isFavorite, toggleFavorite, onOpen, searchQuery }) {
  return (
    <div className="templates-grid">
      <AnimatePresence mode="popLayout" initial={false}>
        {templates.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.3 }
            }}
            layout
          >
            <TemplateCard
              template={t}
              isFav={isFavorite(t.id)}
              onToggleFav={toggleFavorite}
              onOpen={onOpen}
              searchQuery={searchQuery}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {templates.length === 0 && (
        <div className="empty-state" style={{ padding: '32px 0' }}>
          <p>Nenhum template encontrado.</p>
        </div>
      )}
    </div>
  );
}
