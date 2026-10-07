import { analyzeIntentAndRetrieveContext, KnowledgeMode } from '../data/portfolio';
import { generateSmartPortfolioReply } from '../data/portfolioContext';
import {
  generateAIResponse,
  ChatTurn,
  MANDATORY_DNYL_AI_SYSTEM_INSTRUCTION,
  buildMessagesWithMandatorySystemPrompt,
  buildSystemPromptForMode,
} from './aiProvider';

export interface IncomingChatMessage {
  role: string;
  content: string;
}

export interface ChatServiceResult {
  status: number;
  body: {
    reply?: string;
    provider?: string;
    model?: string;
    mode?: KnowledgeMode;
    error?: string;
  };
}

// Rate Limiting State (per IP, sliding 60s window)
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 30;
const ipRequestTimestamps = new Map<string, number[]>();

export function checkChatRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestTimestamps.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipRequestTimestamps.set(ip, recent);
  return true;
}

/**
 * Normalizes conversation history:
 * 1. Strips empty/non-string messages and untrusted client system prompts.
 * 2. Strips leading assistant messages so the first conversational turn is 'user'.
 * 3. Merges consecutive messages of the same role so turns strictly alternate 'user' <-> 'assistant'.
 * 4. Truncates to the most recent 14 conversational turns.
 */
export function normalizeConversationTurns(rawMessages: unknown[]): ChatTurn[] {
  const cleaned: ChatTurn[] = [];

  for (const item of rawMessages) {
    if (!item || typeof item !== 'object') continue;
    const msg = item as Record<string, unknown>;
    if (msg.role === 'system') continue; // Ignore any client-sent system messages

    const rawContent = typeof msg.content === 'string' ? msg.content.trim() : '';
    if (!rawContent) continue;

    const safeText = rawContent.slice(0, 2000);
    const role: 'user' | 'assistant' = msg.role === 'user' ? 'user' : 'assistant';

    if (cleaned.length === 0 && role === 'assistant') {
      continue;
    }

    const prev = cleaned[cleaned.length - 1];
    if (prev && prev.role === role) {
      prev.content = `${prev.content}\n\n${safeText}`;
    } else {
      cleaned.push({ role, content: safeText });
    }
  }

  while (cleaned.length > 0 && cleaned[cleaned.length - 1].role !== 'user') {
    cleaned.pop();
  }

  let sliced = cleaned.slice(-14);
  if (sliced.length > 0 && sliced[0].role !== 'user') {
    sliced = sliced.slice(1);
  }

  return sliced;
}

/**
 * Validates incoming request payload and returns normalized turns or error.
 */
export function validateAndNormalizePayload(body: unknown): {
  valid: boolean;
  error?: string;
  turns?: ChatTurn[];
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request payload.' };
  }

  const payload = body as Record<string, unknown>;
  const rawMessages = payload.messages;

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { valid: false, error: 'Please provide a valid message to send.' };
  }

  if (rawMessages.length > 55) {
    return { valid: false, error: 'Conversation history exceeds maximum allowed length.' };
  }

  const nonSystemMessages = rawMessages.filter(
    (m) => m && typeof m === 'object' && (m as Record<string, unknown>).role !== 'system'
  );

  const lastItem = nonSystemMessages[nonSystemMessages.length - 1] as
    | Record<string, unknown>
    | undefined;
  if (!lastItem || typeof lastItem.content !== 'string' || !lastItem.content.trim()) {
    return { valid: false, error: 'Message cannot be empty.' };
  }

  if (lastItem.content.length > 2000) {
    return {
      valid: false,
      error: 'Message is too long. Please keep messages under 2,000 characters.',
    };
  }

  const turns = normalizeConversationTurns(nonSystemMessages);
  if (turns.length === 0) {
    return { valid: false, error: 'Message cannot be empty.' };
  }

  return { valid: true, turns };
}

/**
 * Injects the mandatory Dnyl AI system message at the start (index 0) of an incoming request body's
 * messages array before processing.
 */
export function injectMandatorySystemMessageIntoBody(body: unknown): unknown {
  if (!body || typeof body !== 'object') return body;
  const payload = body as Record<string, unknown>;
  if (!Array.isArray(payload.messages)) return body;

  const userAndAssistantMessages = payload.messages.filter(
    (m) => m && typeof m === 'object' && (m as Record<string, unknown>).role !== 'system'
  );

  return {
    ...payload,
    messages: [
      {
        role: 'system',
        content: MANDATORY_DNYL_AI_SYSTEM_INSTRUCTION,
      },
      ...userAndAssistantMessages,
    ],
  };
}

/**
 * Handles a standard JSON chat request from Express (/api/chat) or Vercel Serverless (api/chat.ts).
 * Injects the mandatory system message defining 'Dnyl AI, the AI assistant for Daniyal Hayat’s portfolio, created by DANIYAL HAYAT'
 * as the first item in the message array passed to the AI model API.
 */
export async function handleChatRequest(
  rawBody: unknown,
  clientIp = '127.0.0.1'
): Promise<ChatServiceResult> {
  if (!checkChatRateLimit(clientIp)) {
    return {
      status: 429,
      body: {
        error: "Sorry, I couldn't process that right now. Please try again.",
      },
    };
  }

  const body = injectMandatorySystemMessageIntoBody(rawBody);
  const validation = validateAndNormalizePayload(body);
  if (!validation.valid || !validation.turns) {
    return {
      status: 400,
      body: { error: validation.error || 'Invalid request payload.' },
    };
  }

  const turns = validation.turns;
  const intent = analyzeIntentAndRetrieveContext(turns);
  const latestQuery = turns[turns.length - 1]?.content || '';
  const systemPrompt = buildSystemPromptForMode(intent, latestQuery);

  // Prepend mandatory system message as the first item (index 0) in the message array
  const messagesWithSystemFirst = buildMessagesWithMandatorySystemPrompt(turns, systemPrompt);

  try {
    const result = await generateAIResponse(messagesWithSystemFirst, intent);
    return {
      status: 200,
      body: {
        reply: result.reply,
        provider: result.provider,
        model: result.model,
        mode: result.mode,
      },
    };
  } catch {
    if (intent.mode === 'DANIYAL_MODE') {
      const fallbackReply = generateSmartPortfolioReply(turns);
      return {
        status: 200,
        body: {
          reply: fallbackReply,
          provider: 'DANIYAL HAYAT',
          model: 'Dnyl AI',
          mode: intent.mode,
        },
      };
    }

    return {
      status: 503,
      body: {
        error: "Sorry, I couldn't process that right now. Please try again.",
      },
    };
  }
}

/**
 * Streams an AI response progressively via Server-Sent Events (SSE).
 * Injects the mandatory system message as the first item in the message array passed to the AI model API.
 */
export async function handleChatStreamRequest(
  rawBody: unknown,
  clientIp: string,
  res: {
    status: (code: number) => any;
    setHeader: (name: string, value: string) => void;
    write: (chunk: string) => void;
    end: () => void;
    json: (data: any) => any;
  }
): Promise<void> {
  if (!checkChatRateLimit(clientIp)) {
    res.status(429).json({
      error: "Sorry, I couldn't process that right now. Please try again.",
    });
    return;
  }

  const body = injectMandatorySystemMessageIntoBody(rawBody);
  const validation = validateAndNormalizePayload(body);
  if (!validation.valid || !validation.turns) {
    res.status(400).json({ error: validation.error || 'Invalid request payload.' });
    return;
  }

  const turns = validation.turns;
  const intent = analyzeIntentAndRetrieveContext(turns);
  const latestQuery = turns[turns.length - 1]?.content || '';
  const systemPrompt = buildSystemPromptForMode(intent, latestQuery);

  // Prepend mandatory system message as the first item (index 0) in the message array
  const messagesWithSystemFirst = buildMessagesWithMandatorySystemPrompt(turns, systemPrompt);

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  try {
    const result = await generateAIResponse(messagesWithSystemFirst, intent, (delta) => {
      res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    });

    res.write(
      `data: ${JSON.stringify({
        done: true,
        reply: result.reply,
        provider: result.provider,
        model: result.model,
        mode: result.mode,
      })}\n\n`
    );
    res.end();
  } catch {
    if (intent.mode === 'DANIYAL_MODE') {
      const reply = generateSmartPortfolioReply(turns);
      const tokens = reply.match(/\S+\s*|\n+/g) || [reply];
      for (let i = 0; i < tokens.length; i += 3) {
        const delta = tokens.slice(i, i + 3).join('');
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
      res.write(
        `data: ${JSON.stringify({
          done: true,
          reply,
          provider: 'DANIYAL HAYAT',
          model: 'Dnyl AI',
          mode: intent.mode,
        })}\n\n`
      );
      res.end();
      return;
    }

    res.write(
      `data: ${JSON.stringify({
        error: "Sorry, I couldn't process that right now. Please try again.",
      })}\n\n`
    );
    res.end();
  }
}
