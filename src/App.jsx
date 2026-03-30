import { useState, useMemo, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ShowcaseBox from './components/ShowcaseBox';
import Categories from './components/Categories';
import SearchBar from './components/SearchBar';
import NicheFilters from './components/NicheFilters';
import TemplateGrid from './components/TemplateGrid';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import RecentsScreen from './components/RecentsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import DesktopShowcase from './components/DesktopShowcase';
import ToastContainer from './components/Toast';
import { TEMPLATES, NICHES } from './data/templates';
import { useFavorites } from './hooks/useFavorites';
import { useRecents } from './hooks/useRecents';
import { useToast } from './hooks/useToast';

export default function App() {
  // 1-7: Standard App state
  const [activeTab, setActiveTab] = useState('recentes');
  const [tabDirection, setTabDirection] = useState(1);
  const [activeCategory, setActiveCategory] = useState('documentos');
  const [activeNiche, setActiveNiche] = useState('geral');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScreen, setActiveScreen] = useState('home');
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  // 8: Custom hook 1 (internal hooks expansion)
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  // 9: Custom hook 2
  const { recents, addRecent, getTimeAgo } = useRecents();
  // 10: Custom hook 3
  const { toasts, showToast } = useToast();

  // 11-12: Additional App state/refs
  const searchTimeoutRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 13-19: Callbacks
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 250);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setTabDirection(tab === 'favoritos' ? 1 : -1);
    setActiveTab(tab);
  }, []);

  const handleToggleFavorite = useCallback((templateId) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    const wasFav = isFavorite(templateId);
    toggleFavorite(templateId);
    showToast(
      wasFav ? `"${template.title}" removido dos favoritos` : `"${template.title}" adicionado aos favoritos!`,
      wasFav ? 'unstar' : 'star'
    );
  }, [isFavorite, toggleFavorite, showToast]);

  const handleOpenTemplate = useCallback((templateId) => {
    addRecent(templateId);
    setEditingTemplateId(templateId);
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) showToast(`Abrindo "${template.title}"...`, 'check');
  }, [addRecent, showToast]);

  const handleCloseEditor = useCallback(() => {
    setEditingTemplateId(null);
  }, []);

  const handleNavChange = useCallback((tab) => {
    setActiveScreen(tab);
  }, []);

  const handleBackToHome = useCallback(() => {
    setActiveScreen('home');
  }, []);

  // 20: Filter memo
  const filteredTemplates = useMemo(() => {
    let result = TEMPLATES.filter(t => t.category === activeCategory);
    if (activeNiche !== 'geral') {
      result = result.filter(t => t.niche === activeNiche);
    }
    if (debouncedSearch.length >= 2) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, activeNiche, debouncedSearch]);

  const editingTemplate = editingTemplateId
    ? TEMPLATES.find(t => t.id === editingTemplateId)
    : null;

  return (
    <>
      {/* ==========================================
          DESKTOP LAYOUT (>= 900px)
          ========================================== */}
      <div className="desktop-layout">
        <Sidebar active={activeScreen} onChange={handleNavChange} />

        <div className="desktop-main">
          <ToastContainer toasts={toasts} />

          {activeScreen === 'home' && (
            <main className="desktop-content">
              <DesktopShowcase
                recents={recents}
                favorites={favorites}
                getTimeAgo={getTimeAgo}
                isFavorite={isFavorite}
                toggleFavorite={handleToggleFavorite}
                onOpenTemplate={handleOpenTemplate}
              />
              <Categories active={activeCategory} onChange={setActiveCategory} />
              <div className="content-scrollable">
                <SearchBar value={searchQuery} onChange={handleSearchChange} />
                <NicheFilters niches={NICHES} active={activeNiche} onChange={setActiveNiche} />
                <TemplateGrid
                  templates={filteredTemplates}
                  isFavorite={isFavorite}
                  toggleFavorite={handleToggleFavorite}
                  onOpen={handleOpenTemplate}
                  searchQuery={debouncedSearch}
                />
              </div>
            </main>
          )}

          {activeScreen === 'recentes' && (
            <main className="desktop-content desktop-tab-panel">
              <RecentsScreen
                recents={recents}
                getTimeAgo={getTimeAgo}
                isFavorite={isFavorite}
                toggleFavorite={handleToggleFavorite}
                onOpen={handleOpenTemplate}
                onBack={handleBackToHome}
              />
            </main>
          )}

          {activeScreen === 'favoritos' && (
            <main className="desktop-content desktop-tab-panel">
              <FavoritesScreen
                favorites={favorites}
                toggleFavorite={handleToggleFavorite}
                onOpen={handleOpenTemplate}
                onBack={handleBackToHome}
              />
            </main>
          )}

          <AnimatePresence>
            {editingTemplate && (
              <Editor
                key={editingTemplate.id}
                template={editingTemplate}
                onClose={handleCloseEditor}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ==========================================
          MOBILE LAYOUT (< 900px)
          ========================================== */}
      <div className="mobile-layout">
        <div className="app-container">
          <ToastContainer toasts={toasts} />
          
          <main style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Header activeTab={activeTab} onTabChange={handleTabChange} />
            <ShowcaseBox
              activeTab={activeTab}
              direction={tabDirection}
              recents={recents}
              favorites={favorites}
              getTimeAgo={getTimeAgo}
              isFavorite={isFavorite}
              toggleFavorite={handleToggleFavorite}
              onOpenTemplate={handleOpenTemplate}
            />
            <Categories active={activeCategory} onChange={setActiveCategory} />
            <div className="content-scrollable">
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
              <NicheFilters niches={NICHES} active={activeNiche} onChange={setActiveNiche} />
              <TemplateGrid
                templates={filteredTemplates}
                isFavorite={isFavorite}
                toggleFavorite={handleToggleFavorite}
                onOpen={handleOpenTemplate}
                searchQuery={debouncedSearch}
              />
            </div>
          </main>

          <AnimatePresence>
            {activeScreen === 'recentes' && (
              <RecentsScreen
                key="recentes-screen"
                recents={recents}
                getTimeAgo={getTimeAgo}
                isFavorite={isFavorite}
                toggleFavorite={handleToggleFavorite}
                onOpen={handleOpenTemplate}
                onBack={handleBackToHome}
              />
            )}
            {activeScreen === 'favoritos' && (
              <FavoritesScreen
                key="favoritos-screen"
                favorites={favorites}
                toggleFavorite={handleToggleFavorite}
                onOpen={handleOpenTemplate}
                onBack={handleBackToHome}
              />
            )}
            {editingTemplate && (
              <Editor
                key={editingTemplate.id}
                template={editingTemplate}
                onClose={handleCloseEditor}
              />
            )}
          </AnimatePresence>

          <BottomNav active={activeScreen} onChange={handleNavChange} />
        </div>
      </div>
    </>
  );
}
