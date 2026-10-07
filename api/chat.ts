import {
  handleChatRequest,
  handleChatStreamRequest,
  injectMandatorySystemMessageIntoBody,
} from '../src/server/chatService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const ip =
      (req.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      '127.0.0.1';

    // Inject mandatory Dnyl AI system message as the first item in the message array at the start of every request
    const payloadWithSystemMessage = injectMandatorySystemMessageIntoBody(req.body);

    const wantsStream =
      req.body?.stream === true ||
      (req.headers?.accept && String(req.headers.accept).includes('text/event-stream'));

    if (wantsStream) {
      await handleChatStreamRequest(payloadWithSystemMessage, ip, res);
      return;
    }

    const result = await handleChatRequest(payloadWithSystemMessage, ip);
    return res.status(result.status).json(result.body);
  } catch (err: unknown) {
    console.error('[API /chat] Serverless handler error:', err);
    return res.status(500).json({
      error: "Sorry, I couldn't process that message right now. Please try again.",
    });
  }
}
