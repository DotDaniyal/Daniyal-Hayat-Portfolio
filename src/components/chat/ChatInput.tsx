import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Send, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  input: string;
  onChange: (value: string) => void;
  onSend: (query: string) => void;
  disabled: boolean;
  isOpen: boolean;
}

export const ChatInput = React.memo(
  ({ input, onChange, onSend, disabled, isOpen }: ChatInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focus textarea when opened
    useEffect(() => {
      if (!isOpen) return;
      const focusTimer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 180);
      return () => clearTimeout(focusTimer);
    }, [isOpen]);

    // Auto-resize textarea height
    const adjustTextareaHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 108)}px`;
    }, []);

    useEffect(() => {
      adjustTextareaHeight();
    }, [input, adjustTextareaHeight]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (input.trim() && !disabled) {
          onSend(input);
        }
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="p-2.5 sm:p-3 bg-white dark:bg-[#101322] border-t border-slate-200/80 dark:border-slate-800 shrink-0"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Dnyl AI anything (coding, React, Python, or about Daniyal)..."
            aria-label="Message Dnyl AI — Created by DANIYAL HAYAT"
            className="flex-1 min-h-[42px] max-h-[108px] px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors resize-none leading-snug"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.94 }}
            disabled={!input.trim() || disabled}
            aria-label="Send message to Dnyl AI"
            title="Send to Dnyl AI (Enter)"
            className="inline-flex items-center justify-center min-w-[42px] min-h-[42px] rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 transition-colors shrink-0 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="mt-1.5 px-1 hidden sm:flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="w-2.5 h-2.5" /> Enter to send • Shift+Enter for new line
          </span>
          <span>Dnyl AI • Created by DANIYAL HAYAT</span>
        </div>
      </form>
    );
  }
);

ChatInput.displayName = 'ChatInput';
