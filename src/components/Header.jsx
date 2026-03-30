import { useRef, useEffect } from 'react';

export default function Header({ activeTab, onTabChange }) {
  const recentesRef = useRef(null);
  const favoritosRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const activeRef = activeTab === 'recentes' ? recentesRef : favoritosRef;
    if (activeRef.current && sliderRef.current) {
      const btn = activeRef.current;
      const parent = btn.parentElement;
      const left = btn.offsetLeft;
      const width = btn.offsetWidth;
      sliderRef.current.style.left = `${left}px`;
      sliderRef.current.style.width = `${width}px`;
    }
  }, [activeTab]);

  return (
    <header className="app-header">
      <div className="header-toggle">
        <button
          ref={recentesRef}
          className={`toggle-btn ${activeTab === 'recentes' ? 'active' : ''}`}
          onClick={() => onTabChange('recentes')}
        >
          Recentes
        </button>
        <button
          ref={favoritosRef}
          className={`toggle-btn ${activeTab === 'favoritos' ? 'active' : ''}`}
          onClick={() => onTabChange('favoritos')}
        >
          Favoritos
        </button>
        <div ref={sliderRef} className="toggle-slider" />
      </div>
    </header>
  );
}
