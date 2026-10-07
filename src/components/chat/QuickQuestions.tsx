import React from 'react';
import { motion } from 'motion/react';
import { SuggestedQuestion } from '../../types/chat';

export const QUICK_QUESTIONS: SuggestedQuestion[] = [
  { label: 'Who is Daniyal?', query: 'Who is Daniyal?' },
  { label: "What are Daniyal's skills?", query: "What are Daniyal's skills?" },
  { label: 'Show me his projects', query: 'Show me his projects' },
  { label: 'What is his GitHub?', query: 'What is his GitHub?' },
  { label: 'Explain React', query: 'Explain React' },
  { label: 'What can you help me with?', query: 'What can you help me with?' },
];

interface QuickQuestionsProps {
  onSelectQuestion: (query: string) => void;
  disabled: boolean;
  variant: 'grid' | 'compact';
}

export const QuickQuestions = React.memo(
  ({ onSelectQuestion, disabled, variant }: QuickQuestionsProps) => {
    if (variant === 'compact') {
      return (
        <div className="px-3 py-2 bg-white dark:bg-[#101322] border-t border-slate-200/80 dark:border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
          {QUICK_QUESTIONS.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => onSelectQuestion(item.query)}
              disabled={disabled}
              className="shrink-0 min-h-[30px] px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-slate-950 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {item.label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="pt-2 space-y-2"
      >
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          Quick Questions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {QUICK_QUESTIONS.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => onSelectQuestion(item.query)}
              disabled={disabled}
              className="text-left px-3 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#141829] hover:bg-cyan-500/10 dark:hover:bg-cyan-500/15 text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }
);

QuickQuestions.displayName = 'QuickQuestions';
