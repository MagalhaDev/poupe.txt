import { motion } from 'framer-motion';
import { House, ClockCounterClockwise, Star, Gear, MagnifyingGlass } from '@phosphor-icons/react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'recentes', label: 'Recentes', Icon: ClockCounterClockwise },
  { id: 'favoritos', label: 'Favoritos', Icon: Star },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">N</div>
        <span className="brand-name">Nimbus</span>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Menu</span>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onChange(item.id)}
            >
              {isActive && (
                <motion.div
                  className="sidebar-active-bg"
                  layoutId="sidebarActive"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.Icon size={20} weight={isActive ? 'fill' : 'regular'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item">
          <Gear size={20} />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
}
