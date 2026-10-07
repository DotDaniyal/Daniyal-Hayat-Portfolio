import React from 'react';
import { motion } from 'motion/react';
import { Bot, User, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types/chat';

/**
 * Safely parses inline Markdown (**bold**, *italic*, `code`, [label](url), and bare URLs/emails)
 * into React nodes without dangerouslySetInnerHTML to guarantee zero XSS risk.
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const tokenRegex =
    /(`[^`]+`)|(\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*|#[a-zA-Z0-9_-]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(https?:\/\/[^\s<>()]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [
      fullMatch,
      inlineCode,
      ,
      linkLabel,
      linkHref,
      ,
      boldText,
      ,
      italicText,
      bareUrl,
      bareEmail,
    ] = match;

    if (inlineCode) {
      nodes.push(
        <code
          key={`code-${keyCounter++}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 font-mono text-[0.82em]"
        >
          {inlineCode.slice(1, -1)}
        </code>
      );
    } else if (linkLabel && linkHref) {
      const isInternalHash = linkHref.startsWith('#');
      nodes.push(
        <a
          key={`link-${keyCounter++}`}
          href={linkHref}
          target={isInternalHash || linkHref.startsWith('mailto:') ? undefined : '_blank'}
          rel={isInternalHash || linkHref.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          onClick={(e) => {
            if (isInternalHash) {
              e.preventDefault();
              const target = document.getElementById(linkHref.slice(1));
              target?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-0.5 font-semibold text-cyan-600 dark:text-cyan-400 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-500 transition-colors"
        >
          <span>{linkLabel}</span>
          {!isInternalHash && !linkHref.startsWith('mailto:') && (
            <ExternalLink className="w-3 h-3 inline shrink-0" />
          )}
        </a>
      );
    } else if (boldText) {
      nodes.push(
        <strong
          key={`bold-${keyCounter++}`}
          className="font-bold text-slate-950 dark:text-white"
        >
          {boldText}
        </strong>
      );
    } else if (italicText) {
      nodes.push(
        <em key={`italic-${keyCounter++}`} className="italic opacity-95">
          {italicText}
        </em>
      );
    } else if (bareUrl) {
      const cleanUrl = bareUrl.replace(/[.,;!?]+$/, '');
      const trailing = bareUrl.slice(cleanUrl.length);
      nodes.push(
        <a
          key={`url-${keyCounter++}`}
          href={cleanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-cyan-600 dark:text-cyan-400 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-500 break-all"
        >
          <span>{cleanUrl}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0" />
        </a>
      );
      if (trailing) nodes.push(trailing);
    } else if (bareEmail) {
      nodes.push(
        <a
          key={`email-${keyCounter++}`}
          href={`mailto:${bareEmail}`}
          className="font-semibold text-cyan-600 dark:text-cyan-400 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-500"
        >
          {bareEmail}
        </a>
      );
    } else {
      nodes.push(fullMatch);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Safely renders block-level Markdown (headings, paragraphs, bullet lists, numbered lists, code blocks).
 */
export const SafeMarkdownContent = React.memo(
  ({ content, isUser }: { content: string; isUser: boolean }) => {
    if (isUser) {
      return <div className="whitespace-pre-wrap break-words">{content}</div>;
    }

    const segments = content.split(/(```[\s\S]*?```)/g);

    return (
      <div className="space-y-2 break-words">
        {segments.map((segment, segIdx) => {
          if (segment.startsWith('```') && segment.endsWith('```')) {
            const lines = segment.slice(3, -3).trim().split('\n');
            const firstLine = lines[0]?.trim() || '';
            const hasLangTag = /^[a-zA-Z0-9_-]+$/.test(firstLine) && lines.length > 1;
            const codeContent = hasLangTag ? lines.slice(1).join('\n') : lines.join('\n');

            return (
              <pre
                key={`pre-${segIdx}`}
                className="p-2.5 rounded-xl bg-slate-900 dark:bg-black/60 border border-slate-800 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto"
              >
                <code>{codeContent}</code>
              </pre>
            );
          }

          const lines = segment.split('\n');
          const blocks: React.ReactNode[] = [];
          let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

          const flushList = (keyPrefix: string) => {
            if (!currentList) return;
            if (currentList.type === 'ul') {
              blocks.push(
                <ul
                  key={`${keyPrefix}-ul`}
                  className="space-y-1 pl-4 list-disc marker:text-cyan-500"
                >
                  {currentList.items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {renderInlineMarkdown(item)}
                    </li>
                  ))}
                </ul>
              );
            } else {
              blocks.push(
                <ol
                  key={`${keyPrefix}-ol`}
                  className="space-y-1 pl-4 list-decimal marker:text-cyan-500 marker:font-mono marker:text-xs"
                >
                  {currentList.items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {renderInlineMarkdown(item)}
                    </li>
                  ))}
                </ol>
              );
            }
            currentList = null;
          };

          lines.forEach((rawLine, lineIdx) => {
            const line = rawLine.trim();
            if (!line) {
              flushList(`seg-${segIdx}-line-${lineIdx}`);
              return;
            }

            const headingMatch = /^(#{1,4})\s+(.*)$/.exec(line);
            const ulMatch = /^[-*•]\s+(.*)$/.exec(line);
            const olMatch = /^\d+[.)]\s+(.*)$/.exec(line);

            if (headingMatch) {
              flushList(`seg-${segIdx}-line-${lineIdx}`);
              blocks.push(
                <h3
                  key={`h-${segIdx}-${lineIdx}`}
                  className="font-bold text-slate-950 dark:text-white text-xs sm:text-[13px] pt-1"
                >
                  {renderInlineMarkdown(headingMatch[2])}
                </h3>
              );
            } else if (ulMatch) {
              if (currentList && currentList.type !== 'ul') {
                flushList(`seg-${segIdx}-line-${lineIdx}`);
              }
              if (!currentList) {
                currentList = { type: 'ul', items: [] };
              }
              currentList.items.push(ulMatch[1]);
            } else if (olMatch) {
              if (currentList && currentList.type !== 'ol') {
                flushList(`seg-${segIdx}-line-${lineIdx}`);
              }
              if (!currentList) {
                currentList = { type: 'ol', items: [] };
              }
              currentList.items.push(olMatch[1]);
            } else {
              flushList(`seg-${segIdx}-line-${lineIdx}`);
              blocks.push(
                <p key={`p-${segIdx}-${lineIdx}`} className="leading-relaxed">
                  {renderInlineMarkdown(line)}
                </p>
              );
            }
          });

          flushList(`seg-${segIdx}-end`);
          return <React.Fragment key={`frag-${segIdx}`}>{blocks}</React.Fragment>;
        })}
      </div>
    );
  }
);

SafeMarkdownContent.displayName = 'SafeMarkdownContent';

export interface ChatMessageProps {
  msg: ChatMessageType;
  onRetry?: (query: string, errorMsgId: string) => void;
  isBusy: boolean;
}

export const ChatMessage = React.memo(({ msg, onRetry, isBusy }: ChatMessageProps) => {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        aria-hidden="true"
        title={isUser ? 'You' : 'Dnyl AI — Created by DANIYAL HAYAT'}
        className={`flex items-center justify-center w-7 h-7 rounded-xl shrink-0 mt-0.5 ${
          isUser
            ? 'bg-cyan-500 text-slate-950 shadow-xs'
            : msg.isError
            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-500'
            : 'bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400'
        }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : msg.isError ? (
          <AlertCircle className="w-3.5 h-3.5" />
        ) : (
          <Bot className="w-3.5 h-3.5" />
        )}
      </div>

      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
          isUser
            ? 'bg-cyan-500 text-slate-950 rounded-tr-sm font-medium'
            : msg.isError
            ? 'bg-rose-500/10 dark:bg-rose-950/30 text-slate-800 dark:text-slate-200 border border-rose-500/30 rounded-tl-sm'
            : 'bg-white dark:bg-[#141829] text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800/90 rounded-tl-sm'
        }`}
      >
        <SafeMarkdownContent content={msg.content} isUser={isUser} />

        {msg.isError && msg.retryQuery && onRetry && (
          <div className="mt-2.5 pt-2 border-t border-rose-500/20 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onRetry(msg.retryQuery!, msg.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-[11px] transition-colors disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';
