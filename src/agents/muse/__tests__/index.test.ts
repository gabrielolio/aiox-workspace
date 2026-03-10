import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Gemini before importing the module under test
vi.mock('@google/generative-ai', () => {
  const mockGenerateContent = vi.fn().mockResolvedValue({
    response: { text: () => '🎨 3 ideias pra você hoje:\n\n1️⃣ Ideia teste\nFormato: Reel 30s\nO quê: Descrição de teste.' },
  });
  const mockGetModel = vi.fn().mockReturnValue({ generateContent: mockGenerateContent });
  const MockGoogleGenerativeAI = vi.fn().mockImplementation(() => ({
    getGenerativeModel: mockGetModel,
  }));
  return { GoogleGenerativeAI: MockGoogleGenerativeAI };
});

vi.mock('../../../config/env.js', () => ({
  loadEnv: () => ({ GEMINI_API_KEY: 'test-key' }),
}));

vi.mock('../../../config/logger.js', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { handleCreativeRequest } from '../index.js';

describe('handleCreativeRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns clarification message when no brand is identified', async () => {
    const result = await handleCreativeRequest('tô sem ideia', null);
    expect(result).toBe('Qual marca? Porsche ou GWM? 🚗');
  });

  it('infers Porsche from question text', async () => {
    const result = await handleCreativeRequest('ideia pro Cayenne', null);
    expect(result).toContain('ideias');
    expect(result).not.toBe('Qual marca? Porsche ou GWM? 🚗');
  });

  it('infers GWM from question text', async () => {
    const result = await handleCreativeRequest('preciso de um roteiro pro Tank 300', null);
    expect(result).not.toBe('Qual marca? Porsche ou GWM? 🚗');
  });

  it('uses session brand when question has no brand signals', async () => {
    const result = await handleCreativeRequest('me dá uma ideia diferente', 'gwm');
    expect(result).not.toBe('Qual marca? Porsche ou GWM? 🚗');
  });

  it('question brand overrides session brand', async () => {
    // Question says Porsche, session says GWM — Porsche should win
    const result = await handleCreativeRequest('ideia pro Taycan', 'gwm');
    expect(result).not.toBe('Qual marca? Porsche ou GWM? 🚗');
  });

  it('returns non-empty string on successful API call', async () => {
    const result = await handleCreativeRequest('roteiro criativo pro Porsche', null);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
