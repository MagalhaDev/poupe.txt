import { useRef, useEffect } from 'react';
import { CATEGORIES } from '../data/templates';

export default function Categories({ active, onChange }) {
  const navRef = useRef(null);
  const lineRef = useRef(null);
  const btnRefs = useRef({});

  useEffect(() => {
    const btn = btnRefs.current[active];
    if (btn && lineRef.current && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      lineRef.current.style.left = `${btnRect.left - navRect.left + 20}px`;
      lineRef.current.style.width = `${btnRect.width}px`;
    }
  }, [active]);

  return (
    <div className="categories-wrapper">
      <nav className="categories-nav" ref={navRef}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            ref={el => btnRefs.current[cat.id] = el}
            className={`category-btn ${active === cat.id ? 'active' : ''}`}
            onClick={() => onChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>
      <div className="category-line" ref={lineRef} />
    </div>
  );
}
