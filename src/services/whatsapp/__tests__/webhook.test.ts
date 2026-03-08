import { describe, it, expect } from 'vitest';
import { parseWebhookMessage } from '../webhook.js';
import type { EvolutionWebhookData } from '../types.js';

function makeData(overrides: Partial<EvolutionWebhookData> = {}): EvolutionWebhookData {
  return {
    key: { remoteJid: '5511999999999@s.whatsapp.net', fromMe: false, id: 'MSG_001' },
    messageTimestamp: 1_700_000_000,
    ...overrides,
  };
}

describe('parseWebhookMessage', () => {
  it('returns null for own messages (fromMe: true)', () => {
    const data = makeData({ key: { remoteJid: 'X', fromMe: true, id: 'Y' } });
    expect(parseWebhookMessage(data)).toBeNull();
  });

  it('returns null when message field is absent', () => {
    const data = makeData({ message: undefined });
    expect(parseWebhookMessage(data)).toBeNull();
  });

  it('returns null for unknown message type', () => {
    const data = makeData({ message: {} });
    expect(parseWebhookMessage(data)).toBeNull();
  });

  it('parses a text (conversation) message', () => {
    const data = makeData({ message: { conversation: 'Oi KING' } });
    const msg = parseWebhookMessage(data);
    expect(msg).not.toBeNull();
    expect(msg?.text).toBe('Oi KING');
    expect(msg?.hasMedia).toBeUndefined();
    expect(msg?.from).toBe('5511999999999@s.whatsapp.net');
    expect(msg?.timestamp).toBe(1_700_000_000);
  });

  it('parses an image message', () => {
    const data = makeData({ message: { imageMessage: { caption: 'Foto do carro' } } });
    const msg = parseWebhookMessage(data);
    expect(msg?.hasMedia).toBe(true);
    expect(msg?.mediaType).toBe('image');
    expect(msg?.text).toBe('Foto do carro');
  });

  it('parses a video message', () => {
    const data = makeData({ message: { videoMessage: { caption: undefined } } });
    const msg = parseWebhookMessage(data);
    expect(msg?.hasMedia).toBe(true);
    expect(msg?.mediaType).toBe('video');
    expect(msg?.text).toBeUndefined();
  });

  it('parses an audio message (no text)', () => {
    const data = makeData({ message: { audioMessage: {} } });
    const msg = parseWebhookMessage(data);
    expect(msg?.hasMedia).toBe(true);
    expect(msg?.mediaType).toBe('audio');
    expect(msg?.text).toBeUndefined();
  });

  it('parses a document message', () => {
    const data = makeData({ message: { documentMessage: { caption: 'Contrato' } } });
    const msg = parseWebhookMessage(data);
    expect(msg?.hasMedia).toBe(true);
    expect(msg?.mediaType).toBe('document');
    expect(msg?.text).toBe('Contrato');
  });

  it('uses Date.now() when messageTimestamp is not a number', () => {
    const data = makeData({
      message: { conversation: 'oi' },
      messageTimestamp: 'bad' as unknown as number,
    });
    const before = Date.now();
    const msg = parseWebhookMessage(data);
    const after = Date.now();
    expect(msg?.timestamp).toBeGreaterThanOrEqual(before);
    expect(msg?.timestamp).toBeLessThanOrEqual(after);
  });
});
