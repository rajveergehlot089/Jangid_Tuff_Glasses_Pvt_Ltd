'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CircleAlert } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, variant = 'success' }) {
  const isError = variant === 'error';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-[#08233f] text-white px-6 py-4 shadow-2xl text-sm font-medium flex items-center gap-3 border border-white/10"
          role={isError ? 'alert' : 'status'}
          aria-live={isError ? 'assertive' : 'polite'}
        >
          {isError ? (
            <CircleAlert className="w-5 h-5 text-amber-300 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
