export type ChatStatus = 'idle' | 'sending' | 'streaming' | 'success' | 'error';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
  isStreaming?: boolean;
  retryQuery?: string;
}

export interface SuggestedQuestion {
  label: string;
  query: string;
}
