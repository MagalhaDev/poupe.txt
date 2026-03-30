import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaretLeft, Export } from '@phosphor-icons/react';
import * as storage from '../services/storageService';

export default function Editor({ template, onClose }) {
  const [title, setTitle] = useState(template.title);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Load saved content from storageService
  useEffect(() => {
    let active = true;
    setLoading(true);
    storage.getEditorContent(template.id).then(data => {
      if (active) {
        setTitle(data.title || template.title);
        setContent(data.content || '');
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [template.id, template.title]);

  // Auto-save on change
  useEffect(() => {
    if (loading) return; // don't overwrite if still loading initial content
    const timer = setTimeout(() => {
      storage.saveEditorContent(template.id, { title, content });
    }, 500);
    return () => clearTimeout(timer);
  }, [title, content, template.id, loading]);

  return (
    <motion.div
      className="editor-screen"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="editor-header">
        <button className="editor-back-btn" onClick={onClose}>
          <CaretLeft size={18} /> Voltar
        </button>
        <button className="btn-export">
          <Export size={16} /> Exportar
        </button>
      </header>
      <div className="editor-body">
        <input
          className="editor-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Sem Título"
        />
        <textarea
          className="editor-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Escreva algo brilhante aqui ou use o sinal '/' para comandos..."
        />
      </div>
    </motion.div>
  );
}
