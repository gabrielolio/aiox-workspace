import { describe, it, expect } from 'vitest';
import { buildUserContent, buildIntentContext } from '../prompt.js';
import type { Message } from '../index.js';

function makeMessage(overrides: Partial<Message> = {}): Message {
  return {
    from: '5511999@s.whatsapp.net',
    timestamp: 1_700_000_000,
    ...overrides,
  };
}

describe('buildUserContent', () => {
  it('returns text when only text is present', () => {
    const msg = makeMessage({ text: 'Oi Diretor' });
    expect(buildUserContent(msg)).toBe('Oi Diretor');
  });

  it('includes media label when hasMedia is true', () => {
    const msg = makeMessage({ hasMedia: true, mediaType: 'video', text: 'Caption aqui' });
    const content = buildUserContent(msg);
    expect(content).toContain('[Midia recebida: video]');
    expect(content).toContain('Caption aqui');
  });

  it('returns fallback when no text and no media', () => {
    const msg = makeMessage();
    expect(buildUserContent(msg)).toBe('[Mensagem sem texto]');
  });

  it('shows media type unknown when mediaType is absent', () => {
    const msg = makeMessage({ hasMedia: true });
    expect(buildUserContent(msg)).toContain('[Midia recebida: arquivo]');
  });
});

describe('buildIntentContext', () => {
  it('returns subtitle context for subtitle_request', () => {
    expect(buildIntentContext('subtitle_request')).toContain('Legendador');
  });

  it('returns briefer context for content_idea', () => {
    expect(buildIntentContext('content_idea')).toContain('Briefer');
  });

  it('returns muse context for creative_request', () => {
    expect(buildIntentContext('creative_request')).toContain('Muse');
  });

  it('returns guardiao context for guideline_question', () => {
    expect(buildIntentContext('guideline_question')).toContain('Guardiao');
  });

  it('returns organizador context for organization', () => {
    expect(buildIntentContext('organization')).toContain('Organizador');
  });

  it('returns general_chat context for general_chat', () => {
    expect(buildIntentContext('general_chat')).toContain('geral');
  });
});
