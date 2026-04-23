import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, X } from 'lucide-react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-24 right-4 z-[70] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-3 bg-brand-surface-light border border-brand-border rounded-lg px-5 py-3.5 shadow-2xl min-w-[300px]"
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                toast.type === 'wishlist'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-brand-gold/10 text-brand-gold'
              }`}
            >
              {toast.type === 'wishlist' ? (
                <Heart size={14} fill="currentColor" />
              ) : (
                <Check size={14} />
              )}
            </div>
            <p className="text-sm text-white/90 flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-brand-muted hover:text-white transition-colors duration-200"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
