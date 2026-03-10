import { describe, it, expect, vi, beforeEach } from 'vitest';
import { classifyIntent, handleMessage } from '../index.js';
import type { Message } from '../index.js';

// Mock Gemini SDK
vi.mock('@google/generative-ai', () => {
  const mockSendMessage = vi.fn().mockResolvedValue({
    response: { text: () => 'E ai Vitor! Bora!' },
  });
  const mockStartChat = vi.fn().mockReturnValue({ sendMessage: mockSendMessage });
  const mockGetModel = vi.fn().mockReturnValue({ startChat: mockStartChat });
  const MockGoogleGenerativeAI = vi.fn().mockImplementation(() => ({
    getGenerativeModel: mockGetModel,
  }));
  return { GoogleGenerativeAI: MockGoogleGenerativeAI };
});

// Mock env
vi.mock('../../../config/env.js', () => ({
  loadEnv: () => ({ GEMINI_API_KEY: 'test-key' }),
}));

// Mock logger
vi.mock('../../../config/logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn() },
}));

// Mock session manager to avoid cleanup timers
vi.mock('../session.js', () => {
  const history: Array<{ role: string; content: string }> = [];
  return {
    sessionManager: {
      getHistory: vi.fn(() => [...history]),
      append: vi.fn((_, role: string, content: string) => history.push({ role, content })),
      clear: vi.fn(() => history.splice(0)),
      getBrand: vi.fn(() => null),
      setBrand: vi.fn(),
    },
  };
});

function makeMessage(overrides: Partial<Message> = {}): Message {
  return {
    from: '5511999@s.whatsapp.net',
    timestamp: 1_700_000_000,
    ...overrides,
  };
}

describe('classifyIntent', () => {
  it('returns subtitle_request for video', () => {
    expect(classifyIntent(makeMessage({ hasMedia: true, mediaType: 'video' }))).toBe('subtitle_request');
  });

  it('returns subtitle_request for audio', () => {
    expect(classifyIntent(makeMessage({ hasMedia: true, mediaType: 'audio' }))).toBe('subtitle_request');
  });

  it('returns content_idea for "o que posto hoje"', () => {
    expect(classifyIntent(makeMessage({ text: 'o que posto hoje?' }))).toBe('content_idea');
  });

  it('returns content_idea for "me da uma ideia"', () => {
    expect(classifyIntent(makeMessage({ text: 'me da uma ideia' }))).toBe('content_idea');
  });

  it('returns creative_request for "quero algo criativo"', () => {
    expect(classifyIntent(makeMessage({ text: 'quero algo criativo' }))).toBe('creative_request');
  });

  it('returns guideline_question for "posso fazer isso?"', () => {
    expect(classifyIntent(makeMessage({ text: 'posso fazer isso?' }))).toBe('guideline_question');
  });

  it('returns organization for "onde salvou?"', () => {
    expect(classifyIntent(makeMessage({ text: 'onde salvou?' }))).toBe('organization');
  });

  it('returns general_chat as default', () => {
    expect(classifyIntent(makeMessage({ text: 'oi tudo bem' }))).toBe('general_chat');
  });
});

describe('handleMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns Claude API reply', async () => {
    const msg = makeMessage({ text: 'Oi Diretor' });
    const reply = await handleMessage(msg);
    expect(reply).toBe('E ai Vitor! Bora!');
  });

  it('throws when Gemini API fails', async () => {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const mockInstance = new (GoogleGenerativeAI as unknown as ReturnType<typeof vi.fn>)();
    const mockChat = mockInstance.getGenerativeModel().startChat();
    mockChat.sendMessage.mockRejectedValueOnce(new Error('API down'));

    // Re-import to get fresh module state with the rejection
    await expect(handleMessage(makeMessage({ text: 'test' }))).rejects.toThrow();
  });
});
