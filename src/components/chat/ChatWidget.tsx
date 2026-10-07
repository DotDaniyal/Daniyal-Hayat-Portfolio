import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, ChevronDown } from 'lucide-react';
import { ChatMessage as ChatMessageType, ChatStatus } from '../../types/chat';
import { soundManager } from '../../utils/sound';
import { portfolioContext } from '../../data/portfolioContext';
import { ChatWindow } from './ChatWindow';

const STORAGE_KEY = 'daniyal_dnyl_ai_history_v4';
const MAX_STORED_MESSAGES = 40;
const REQUEST_TIMEOUT_MS = 18000;

const createInitialMessage = (): ChatMessageType => ({
  id: 'init-welcome',
  role: 'assistant',
  content: `Hi! 👋 I'm **Dnyl AI**, the AI assistant for **${portfolioContext.identity.name}'s** portfolio, created by **DANIYAL HAYAT**.\n\nYou can ask me **general questions** (*JavaScript, React, Python, SQL, CSS, coding*) or anything about **Daniyal** (*his projects, skills, services, GitHub, or contact details*) in English, Urdu (اردو), or Roman Urdu.`,
  timestamp: new Date().toISOString(),
});

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ChatbotErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare state: ErrorBoundaryState;
  declare props: Readonly<ErrorBoundaryProps>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>(() => {
    try {
      // Purge any legacy chat history keys so stale model branding never persists
      localStorage.removeItem('daniyal_ask_daniyal_history');
      localStorage.removeItem('daniyal_ask_daniyal_history_v2');
      localStorage.removeItem('daniyal_dnyl_ai_history_v3');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed
            .filter(
              (m: unknown): m is Record<string, unknown> =>
                Boolean(m) &&
                typeof m === 'object' &&
                typeof (m as Record<string, unknown>).content === 'string' &&
                Boolean(((m as Record<string, unknown>).content as string).trim()) &&
                ((m as Record<string, unknown>).role === 'user' ||
                  (m as Record<string, unknown>).role === 'assistant')
            )
            .map((m) => ({
              id: String(m.id || Date.now()),
              role: m.role as 'user' | 'assistant',
              content: String(m.content),
              timestamp:
                typeof m.timestamp === 'string'
                  ? m.timestamp
                  : new Date().toISOString(),
              isError: Boolean(m.isError),
              retryQuery: typeof m.retryQuery === 'string' ? m.retryQuery : undefined,
            }));

          if (valid.length > 0) {
            return valid.slice(-MAX_STORED_MESSAGES);
          }
        }
      }
    } catch {
      // ignore corrupted storage
    }
    return [createInitialMessage()];
  });

  const inFlightRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Persist conversation in localStorage safely (capped to MAX_STORED_MESSAGES)
  useEffect(() => {
    try {
      const toStore = messages
        .filter((m) => !m.isStreaming && m.content.trim().length > 0)
        .slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // ignore storage quota errors
    }
  }, [messages]);

  // Support Escape key to close popup
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessageToAssistant = useCallback(
    async (rawQuery: string, retryMessageIdToRemove?: string) => {
      const trimmedQuery = rawQuery.trim();
      if (
        !trimmedQuery ||
        inFlightRef.current ||
        status === 'sending' ||
        status === 'streaming'
      ) {
        return;
      }

      inFlightRef.current = true;
      soundManager.playClick();

      const userMessage: ChatMessageType = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmedQuery,
        timestamp: new Date().toISOString(),
      };

      let updatedHistory: ChatMessageType[] = [];
      setMessages((prev) => {
        const filtered = retryMessageIdToRemove
          ? prev.filter((m) => m.id !== retryMessageIdToRemove)
          : prev;

        const lastMsg = filtered[filtered.length - 1];
        if (
          retryMessageIdToRemove &&
          lastMsg &&
          lastMsg.role === 'user' &&
          lastMsg.content === trimmedQuery
        ) {
          updatedHistory = filtered;
          return filtered;
        }

        updatedHistory = [...filtered, userMessage];
        return updatedHistory;
      });

      if (!retryMessageIdToRemove) {
        setInput('');
      }

      setStatus('sending');

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const streamMsgId = `assistant-${Date.now()}`;

      try {
        const historyForApi = (
          updatedHistory.length > 0 ? updatedHistory : [...messages, userMessage]
        )
          .filter((m) => !m.isError && m.id !== 'init-welcome')
          .slice(-14)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream, application/json',
          },
          body: JSON.stringify({ messages: historyForApi, stream: true }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
          let errText = "Sorry, I couldn't process that message right now. Please try again.";
          if (contentType.includes('application/json')) {
            const errData = await response.json().catch(() => null);
            if (response.status === 429 && errData?.error) {
              errText = errData.error;
            }
          }
          throw new Error(errText);
        }

        // Progressive SSE stream handling
        if (contentType.includes('text/event-stream') && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let accumulated = '';
          let hasCreatedStreamBubble = false;

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split('\n\n');
            buffer = events.pop() || '';

            for (const evt of events) {
              const line = evt.trim();
              if (!line.startsWith('data:')) continue;
              const jsonStr = line.slice(5).trim();
              if (!jsonStr) continue;

              let payload: Record<string, unknown> | null = null;
              try {
                payload = JSON.parse(jsonStr);
              } catch {
                continue;
              }

              if (!payload) continue;

              if (typeof payload.error === 'string' && payload.error) {
                throw new Error(payload.error);
              }

              if (typeof payload.delta === 'string' && payload.delta) {
                accumulated += payload.delta;
                if (!hasCreatedStreamBubble) {
                  hasCreatedStreamBubble = true;
                  setStatus('streaming');
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: streamMsgId,
                      role: 'assistant',
                      content: accumulated,
                      timestamp: new Date().toISOString(),
                      isStreaming: true,
                    },
                  ]);
                } else {
                  const currentContent = accumulated;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === streamMsgId ? { ...m, content: currentContent } : m
                    )
                  );
                }
              }

              if (payload.done) {
                const finalReply =
                  typeof payload.reply === 'string' && payload.reply.trim()
                    ? payload.reply.trim()
                    : accumulated.trim();

                if (!finalReply) {
                  throw new Error("Sorry, I couldn't process that right now. Please try again.");
                }

                if (!hasCreatedStreamBubble) {
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: streamMsgId,
                      role: 'assistant',
                      content: finalReply,
                      timestamp: new Date().toISOString(),
                      isStreaming: false,
                    },
                  ]);
                } else {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === streamMsgId
                        ? { ...m, content: finalReply, isStreaming: false }
                        : m
                    )
                  );
                }
              }
            }
          }

          if (!accumulated.trim() && !hasCreatedStreamBubble) {
            throw new Error("Sorry, I couldn't process that message right now. Please try again.");
          }

          setStatus('success');
        } else if (contentType.includes('application/json')) {
          const data = await response.json();
          if (!data || typeof data.reply !== 'string' || !data.reply.trim()) {
            throw new Error("Sorry, I couldn't process that message right now. Please try again.");
          }

          setMessages((prev) => [
            ...prev,
            {
              id: streamMsgId,
              role: 'assistant',
              content: data.reply.trim(),
              timestamp: new Date().toISOString(),
            },
          ]);
          setStatus('success');
        } else {
          throw new Error("Sorry, I couldn't process that message right now. Please try again.");
        }
      } catch (err: unknown) {
        clearTimeout(timeoutId);

        const friendlyError =
          err instanceof Error && err.message.includes('too quickly')
            ? err.message
            : "Sorry, I couldn't process that message right now. Please try again.";

        setMessages((prev) => {
          const withoutPartial = prev.filter((m) => m.id !== streamMsgId);
          return [
            ...withoutPartial,
            {
              id: `err-${Date.now()}`,
              role: 'assistant',
              content: friendlyError,
              timestamp: new Date().toISOString(),
              isError: true,
              retryQuery: trimmedQuery,
            },
          ];
        });
        setStatus('error');
      } finally {
        inFlightRef.current = false;
      }
    },
    [status, messages]
  );

  const handleNewConversation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    soundManager.playClick();
    inFlightRef.current = false;
    setStatus('idle');
    setMessages([createInitialMessage()]);
    setInput('');
  }, []);

  const handleClearHistory = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    soundManager.playClick();
    inFlightRef.current = false;
    setStatus('idle');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
    setMessages([createInitialMessage()]);
    setInput('');
  }, []);

  const handleClose = useCallback(() => {
    soundManager.playClick();
    setIsOpen(false);
  }, []);

  return (
    <ChatbotErrorBoundary>
      {/* Floating Chat Trigger Bubble */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50">
        <motion.button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setIsOpen((prev) => !prev);
          }}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 dark:focus:ring-offset-[#090a0f] transition-colors cursor-pointer"
          aria-label={
            isOpen
              ? 'Close Dnyl AI by DANIYAL HAYAT'
              : 'Open Dnyl AI by DANIYAL HAYAT'
          }
          title="Dnyl AI — Created by DANIYAL HAYAT"
          aria-expanded={isOpen}
        >
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#090a0f]"
          />
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close-icon"
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open-icon"
                initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Desktop Tooltip */}
          {!isOpen && (
            <span className="hidden sm:inline-flex items-center gap-1.5 absolute right-full mr-3 px-3 py-1.5 bg-slate-900/95 dark:bg-slate-800/95 text-white text-xs font-medium rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700/60">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dnyl AI • By DANIYAL HAYAT</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            status={status}
            input={input}
            onInputChange={setInput}
            onSend={sendMessageToAssistant}
            onNewChat={handleNewConversation}
            onClearChat={handleClearHistory}
            onClose={handleClose}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </ChatbotErrorBoundary>
  );
}
