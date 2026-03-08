import { logger } from '../../config/logger.js';
import { loadEnv } from '../../config/env.js';
import type {
  ConnectionState,
  ConnectionStateValue,
  EvolutionWebhookKey,
  EvolutionWebhookMessage,
  MediaDownloadResponse,
  SendMediaRequest,
  SendResponse,
  SendTextRequest,
} from './types.js';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1_000;
const RECONNECT_DELAY_MS = 30_000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class WhatsAppClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly instance: string;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const env = loadEnv();
    this.baseUrl = env.EVOLUTION_API_URL;
    this.apiKey = env.EVOLUTION_API_KEY ?? '';
    this.instance = env.WHATSAPP_INSTANCE;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: this.apiKey,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Evolution API ${response.status}: ${text}`);
    }

    return response.json() as Promise<T>;
  }

  private async withRetry<T>(operation: () => Promise<T>, label: string): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (attempt === MAX_RETRIES) break;
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
        logger.warn({ label, attempt, delay, error: String(error) }, 'Retrying after failure');
        await sleep(delay);
      }
    }

    throw lastError;
  }

  async getConnectionState(): Promise<ConnectionStateValue> {
    const data = await this.request<ConnectionState>(
      'GET',
      `/instance/connectionState/${this.instance}`,
    );
    return data.instance.state;
  }

  async connect(): Promise<void> {
    const state = await this.getConnectionState();

    if (state === 'open') {
      logger.info({ instance: this.instance }, 'WhatsApp already connected');
      return;
    }

    logger.info({ instance: this.instance, state }, 'Connecting WhatsApp...');
    await this.request('GET', `/instance/connect/${this.instance}`);
    logger.info({ instance: this.instance }, 'WhatsApp connection initiated');
  }

  scheduleReconnect(): void {
    if (this.reconnectTimer) return;

    logger.warn({ delayMs: RECONNECT_DELAY_MS }, 'Scheduling WhatsApp reconnect');

    this.reconnectTimer = setTimeout(async () => {
      this.reconnectTimer = null;
      try {
        await this.connect();
        logger.info('WhatsApp reconnected successfully');
      } catch (error) {
        logger.error({ error: String(error) }, 'Reconnect failed — scheduling again');
        this.scheduleReconnect();
      }
    }, RECONNECT_DELAY_MS);
  }

  cancelReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  async sendText(to: string, text: string): Promise<SendResponse> {
    return this.withRetry(
      () =>
        this.request<SendResponse>('POST', `/message/sendText/${this.instance}`, {
          number: to,
          text,
        } satisfies SendTextRequest),
      `sendText to ${to}`,
    );
  }

  async downloadMedia(
    key: EvolutionWebhookKey,
    message: EvolutionWebhookMessage,
  ): Promise<Buffer> {
    const response = await this.withRetry(
      () =>
        this.request<MediaDownloadResponse>(
          'POST',
          `/chat/getBase64FromMediaMessage/${this.instance}`,
          { message: { key, message } },
        ),
      `downloadMedia from ${key.remoteJid}`,
    );
    return Buffer.from(response.base64, 'base64');
  }

  async sendMedia(
    to: string,
    mediaUrl: string,
    type: 'image' | 'video' | 'audio' | 'document',
    caption?: string,
  ): Promise<SendResponse> {
    return this.withRetry(
      () =>
        this.request<SendResponse>('POST', `/message/sendMedia/${this.instance}`, {
          number: to,
          mediatype: type,
          media: mediaUrl,
          ...(caption !== undefined ? { caption } : {}),
        } satisfies SendMediaRequest),
      `sendMedia(${type}) to ${to}`,
    );
  }
}
