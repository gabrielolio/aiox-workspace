// ─── Evolution API — Webhook Payload ─────────────────────────────────────────

export interface EvolutionWebhookKey {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}

export interface EvolutionWebhookMessage {
  conversation?: string;
  imageMessage?: { caption?: string };
  videoMessage?: { caption?: string };
  audioMessage?: Record<string, unknown>;
  documentMessage?: { caption?: string; title?: string };
}

export interface EvolutionWebhookData {
  key: EvolutionWebhookKey;
  message?: EvolutionWebhookMessage;
  messageTimestamp: number;
  pushName?: string;
}

// ─── Evolution API — Media Download ───────────────────────────────────────────

export interface MediaDownloadRequest {
  message: {
    key: EvolutionWebhookKey;
    message: EvolutionWebhookMessage;
  };
}

export interface MediaDownloadResponse {
  base64: string;
  mimetype: string;
}

export interface EvolutionWebhookPayload {
  event: string;
  instance: string;
  data: EvolutionWebhookData;
}

// ─── Evolution API — Connection ───────────────────────────────────────────────

export type ConnectionStateValue = 'open' | 'close' | 'connecting';

export interface ConnectionState {
  instance: {
    instanceName: string;
    state: ConnectionStateValue;
  };
}

// ─── Evolution API — Send Requests ───────────────────────────────────────────

export interface SendTextRequest {
  number: string;
  text: string;
}

export interface SendMediaRequest {
  number: string;
  mediatype: 'image' | 'video' | 'audio' | 'document';
  media: string;
  caption?: string;
  fileName?: string;
}

export interface SendResponse {
  key: {
    id: string;
  };
  status: string;
}
