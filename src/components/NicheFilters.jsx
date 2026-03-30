import { House, ChartLineUp, Barbell, AppleLogo, Student, ShoppingCart } from '@phosphor-icons/react';

const ICON_MAP = {
  House, ChartLineUp, Barbell, AppleLogo, Student, ShoppingCart,
};

export default function NicheFilters({ niches, active, onChange }) {
  return (
    <div className="niche-filters">
      {niches.map(niche => {
        const Icon = ICON_MAP[niche.icon];
        return (
          <button
            key={niche.id}
            className={`niche-chip ${active === niche.id ? 'active' : ''}`}
            onClick={() => onChange(niche.id)}
          >
            {Icon && <Icon size={16} />}
            {niche.label}
          </button>
        );
      })}
    </div>
  );
}
