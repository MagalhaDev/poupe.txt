import { motion, AnimatePresence } from 'framer-motion';
import { House, ClockCounterClockwise, Star } from '@phosphor-icons/react';

const TABS = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'recentes', label: 'Recentes', Icon: ClockCounterClockwise },
  { id: 'favoritos', label: 'Favoritos', Icon: Star },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <div className="nav-icon-wrapper">
              <tab.Icon size={24} weight={isActive ? 'fill' : 'regular'} />
              {isActive && (
                <motion.div
                  className="nav-active-dot"
                  layoutId="navDot"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
            <motion.span
              animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {tab.label}
            </motion.span>
          </button>
        );
      })}
    </nav>
  );
}
