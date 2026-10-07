import React from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, PlusCircle, Trash2, X } from 'lucide-react';
import { ChatMessage as ChatMessageType, ChatStatus } from '../../types/chat';
import { ChatMessages } from './ChatMessages';
import { QuickQuestions } from './QuickQuestions';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  messages: ChatMessageType[];
  status: ChatStatus;
  input: string;
  onInputChange: (value: string) => void;
  onSend: (query: string, retryMessageIdToRemove?: string) => void;
  onNewChat: () => void;
  onClearChat: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ChatWindow = React.memo(
  ({
    messages,
    status,
    input,
    onInputChange,
    onSend,
    onNewChat,
    onClearChat,
    onClose,
    isOpen,
  }: ChatWindowProps) => {
    const isInitialState =
      messages.length <= 1 && messages[0]?.id === 'init-welcome';
    const isBusy = status === 'sending' || status === 'streaming';

    return (
      <motion.section
        role="dialog"
        aria-modal="false"
        aria-label="Dnyl AI — Created by DANIYAL HAYAT"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:right-6 z-50 sm:w-[410px] h-[min(560px,calc(100dvh-6.25rem))] sm:h-[600px] sm:max-h-[calc(100dvh-7rem)] bg-white/98 dark:bg-[#0e111f]/98 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl shadow-black/30 flex flex-col overflow-hidden backdrop-blur-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 dark:bg-[#131729] border-b border-slate-200/80 dark:border-slate-800/90 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400 shrink-0"
              title="Dnyl AI — Created by DANIYAL HAYAT"
            >
              <Bot className="w-5 h-5" />
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#131729]"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
                <span>Dnyl AI</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              </h2>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                Created by DANIYAL HAYAT • EN / اردو / Roman Urdu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onNewChat}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title="New Chat with Dnyl AI"
              aria-label="Start a new chat with Dnyl AI"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClearChat}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title="Clear Dnyl AI Chat History"
              aria-label="Clear Dnyl AI chat history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
              title="Close Dnyl AI (Esc)"
              aria-label="Close Dnyl AI chat panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Log */}
        <ChatMessages
          messages={messages}
          status={status}
          isInitialState={isInitialState}
          onSelectQuestion={(q) => onSend(q)}
          onRetry={(q, errId) => onSend(q, errId)}
        />

        {/* Compact Quick Chips Bar when conversation is active */}
        {!isInitialState && (
          <QuickQuestions
            onSelectQuestion={(q) => onSend(q)}
            disabled={isBusy}
            variant="compact"
          />
        )}

        {/* Input Area */}
        <ChatInput
          input={input}
          onChange={onInputChange}
          onSend={(q) => onSend(q)}
          disabled={isBusy}
          isOpen={isOpen}
        />
      </motion.section>
    );
  }
);

ChatWindow.displayName = 'ChatWindow';
