import http from 'node:http';
import { logger } from '../../config/logger.js';
import { handleMessage, handleMediaMessage } from '../../agents/diretor/index.js';
import type { Message } from '../../agents/diretor/index.js';
import { WhatsAppClient } from './client.js';
import type { EvolutionWebhookData, EvolutionWebhookPayload } from './types.js';

// ─── Parsing ──────────────────────────────────────────────────────────────────

export function parseWebhookMessage(data: EvolutionWebhookData): Message | null {
  if (data.key.fromMe) return null;

  const msg = data.message;
  if (!msg) return null;

  const from = data.key.remoteJid;
  const timestamp =
    typeof data.messageTimestamp === 'number' ? data.messageTimestamp : Date.now();

  if (msg.conversation !== undefined) {
    return { from, text: msg.conversation, timestamp };
  }

  if (msg.imageMessage !== undefined) {
    return { from, hasMedia: true, mediaType: 'image', text: msg.imageMessage.caption, mediaKey: data.key, rawMessage: msg, timestamp };
  }

  if (msg.videoMessage !== undefined) {
    return { from, hasMedia: true, mediaType: 'video', text: msg.videoMessage.caption, mediaKey: data.key, rawMessage: msg, timestamp };
  }

  if (msg.audioMessage !== undefined) {
    return { from, hasMedia: true, mediaType: 'audio', mediaKey: data.key, rawMessage: msg, timestamp };
  }

  if (msg.documentMessage !== undefined) {
    return {
      from,
      hasMedia: true,
      mediaType: 'document',
      text: msg.documentMessage.caption,
      mediaKey: data.key,
      rawMessage: msg,
      timestamp,
    };
  }

  return null;
}

// ─── Server ───────────────────────────────────────────────────────────────────

export function createWebhookServer(client: WhatsAppClient, port: number): http.Server {
  const server = http.createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/webhook') {
      res.writeHead(404);
      res.end();
      return;
    }

    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      void handleRequest(body, client, res);
    });
  });

  server.listen(port, () => {
    logger.info({ port, path: '/webhook' }, 'Webhook server listening');
  });

  return server;
}

async function handleRequest(
  body: string,
  client: WhatsAppClient,
  res: http.ServerResponse,
): Promise<void> {
  let payload: EvolutionWebhookPayload;

  try {
    payload = JSON.parse(body) as EvolutionWebhookPayload;
  } catch {
    logger.warn('Webhook received invalid JSON');
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Bad Request' }));
    return;
  }

  // Acknowledge immediately — Evolution API expects fast 200
  res.writeHead(200);
  res.end(JSON.stringify({ ok: true }));

  if (payload.event !== 'messages.upsert') return;

  const message = parseWebhookMessage(payload.data);
  if (!message) return;

  logger.info(
    {
      from: message.from,
      hasMedia: message.hasMedia ?? false,
      mediaType: message.mediaType,
    },
    'Incoming WhatsApp message',
  );

  // Media messages (video/audio) use async pattern: acknowledge immediately, process in background
  if (message.hasMedia && (message.mediaType === 'video' || message.mediaType === 'audio')) {
    const ack = message.mediaType === 'video'
      ? 'Recebi o vídeo! Processando a legenda... já te mando 🎬'
      : 'Recebi o áudio! Transcrevendo... já te mando 🎙️';

    try {
      await client.sendText(message.from, ack);
    } catch (error) {
      logger.error({ error: String(error) }, 'Failed to send media acknowledgment');
    }

    void handleMediaAsync(message, client);
    return;
  }

  // Text and other messages: handle synchronously
  try {
    const reply = await handleMessage(message);
    await client.sendText(message.from, reply);
    logger.info({ to: message.from }, 'Reply sent');
  } catch (error) {
    logger.error({ error: String(error), to: message.from }, 'Failed to handle or reply');
    client.scheduleReconnect();
  }
}

async function handleMediaAsync(message: Message, client: WhatsAppClient): Promise<void> {
  try {
    const result = await handleMediaMessage(message, client);
    await client.sendText(message.from, result);
    logger.info({ to: message.from }, 'Media reply sent');
  } catch (error) {
    logger.error({ error: String(error), to: message.from }, 'Media processing failed');
    try {
      await client.sendText(
        message.from,
        'Não consegui processar esse arquivo. Tenta de novo? 🙈',
      );
    } catch {
      // If we can't even send the error, just log it
    }
  }
}
