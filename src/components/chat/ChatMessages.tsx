import React, { useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType, ChatStatus } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { QuickQuestions } from './QuickQuestions';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  status: ChatStatus;
  isInitialState: boolean;
  onSelectQuestion: (query: string) => void;
  onRetry: (query: string, errorMsgId: string) => void;
}

export const ChatMessages = React.memo(
  ({
    messages,
    status,
    isInitialState,
    onSelectQuestion,
    onRetry,
  }: ChatMessagesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isUserNearBottomRef = useRef(true);
    const prevMessageCountRef = useRef(messages.length);

    const isBusy = status === 'sending' || status === 'streaming';

    const handleScroll = useCallback(() => {
      const el = containerRef.current;
      if (!el) return;
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      isUserNearBottomRef.current = distanceFromBottom < 90;
    }, []);

    // Smart auto-scroll: always scroll when a new message is added by user,
    // and scroll during streaming only if the visitor has not manually scrolled upward.
    useEffect(() => {
      const isNewMessageAdded = messages.length > prevMessageCountRef.current;
      prevMessageCountRef.current = messages.length;

      const lastMsg = messages[messages.length - 1];
      const isUserJustSent = isNewMessageAdded && lastMsg?.role === 'user';

      if (isUserJustSent) {
        isUserNearBottomRef.current = true;
      }

      if (isUserJustSent || isUserNearBottomRef.current) {
        const timer = setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: status === 'streaming' ? 'auto' : 'smooth',
            block: 'end',
          });
        }, 20);
        return () => clearTimeout(timer);
      }
    }, [messages, status]);

    return (
      <div
        ref={containerRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-slate-50/50 dark:bg-[#090b14]/60"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            onRetry={onRetry}
            isBusy={isBusy}
          />
        ))}

        {/* Empty / Initial State Suggested Questions Grid */}
        {isInitialState && !isBusy && (
          <QuickQuestions
            onSelectQuestion={onSelectQuestion}
            disabled={isBusy}
            variant="grid"
          />
        )}

        {/* Real Typing Indicator (shown only while waiting for the first response token) */}
        {status === 'sending' && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';
