import React from 'react';
import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

export const TypingIndicator = React.memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-2.5"
      aria-label="Dnyl AI is typing"
      title="Dnyl AI — Created by DANIYAL HAYAT"
      role="status"
    >
      <div
        aria-hidden="true"
        className="flex items-center justify-center w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5"
      >
        <Bot className="w-3.5 h-3.5" />
      </div>
      <div className="bg-white dark:bg-[#141829] border border-slate-200/90 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-xs flex items-center gap-1.5">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-cyan-500 rounded-full"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0.2 }}
          className="w-2 h-2 bg-cyan-500 rounded-full"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0.4 }}
          className="w-2 h-2 bg-cyan-500 rounded-full"
        />
      </div>
    </motion.div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';
