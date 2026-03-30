import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Star } from '@phosphor-icons/react';

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {toast.icon === 'star' && <Star size={18} weight="fill" color="#FFD54F" />}
            {toast.icon === 'unstar' && <Star size={18} color="#9BA1B0" />}
            {toast.icon === 'check' && <CheckCircle size={18} weight="fill" color="#66BB6A" />}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
