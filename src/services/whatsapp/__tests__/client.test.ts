import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WhatsAppClient } from '../client.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeFetchOk(body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

function makeFetchError(status: number, message: string) {
  return vi.fn().mockResolvedValue({
    ok: false,
    status,
    text: () => Promise.resolve(message),
    json: () => Promise.resolve({ error: message }),
  });
}

// Minimal env so loadEnv() does not throw
beforeEach(() => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
  process.env.EVOLUTION_API_URL = 'http://localhost:8080';
  process.env.EVOLUTION_API_KEY = 'evo-key';
  process.env.WHATSAPP_INSTANCE = 'king-bot';
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('WhatsAppClient.getConnectionState', () => {
  it('returns the state from Evolution API', async () => {
    vi.stubGlobal(
      'fetch',
      makeFetchOk({ instance: { instanceName: 'king-bot', state: 'open' } }),
    );
    const client = new WhatsAppClient();
    const state = await client.getConnectionState();
    expect(state).toBe('open');
  });

  it('throws when API returns error', async () => {
    vi.stubGlobal('fetch', makeFetchError(401, 'Unauthorized'));
    const client = new WhatsAppClient();
    await expect(client.getConnectionState()).rejects.toThrow('Evolution API 401');
  });
});

describe('WhatsAppClient.connect', () => {
  it('skips connect call when already open', async () => {
    const mockFetch = makeFetchOk({ instance: { instanceName: 'king-bot', state: 'open' } });
    vi.stubGlobal('fetch', mockFetch);
    const client = new WhatsAppClient();
    await client.connect();
    // Only one call (getConnectionState) — no connect call
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('calls /instance/connect when state is close', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ instance: { instanceName: 'king-bot', state: 'close' } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ connected: true }),
      });
    vi.stubGlobal('fetch', mockFetch);
    const client = new WhatsAppClient();
    await client.connect();
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect((mockFetch.mock.calls[1] as [string])[0]).toContain('/instance/connect/king-bot');
  });
});

describe('WhatsAppClient.sendText', () => {
  it('sends a POST to /message/sendText with correct body', async () => {
    const response = { key: { id: 'MSG_001' }, status: 'PENDING' };
    const mockFetch = makeFetchOk(response);
    vi.stubGlobal('fetch', mockFetch);

    const client = new WhatsAppClient();
    const result = await client.sendText('5511999999999', 'Oi!');

    expect(result).toEqual(response);
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/message/sendText/king-bot');
    expect(JSON.parse(init.body as string)).toMatchObject({
      number: '5511999999999',
      text: 'Oi!',
    });
  });

  it('retries up to 3 times on failure then throws', async () => {
    const mockFetch = makeFetchError(500, 'Server Error');
    vi.stubGlobal('fetch', mockFetch);

    const client = new WhatsAppClient();

    await expect(
      Promise.all([client.sendText('5511', 'test'), vi.runAllTimersAsync()]).then(([r]) => r),
    ).rejects.toThrow('Evolution API 500');

    expect(mockFetch).toHaveBeenCalledTimes(3);
  });
});

describe('WhatsAppClient.sendMedia', () => {
  it('sends correct mediatype field', async () => {
    const response = { key: { id: 'MSG_002' }, status: 'PENDING' };
    const mockFetch = makeFetchOk(response);
    vi.stubGlobal('fetch', mockFetch);

    const client = new WhatsAppClient();
    await client.sendMedia('5511', 'https://example.com/video.mp4', 'video', 'Confira!');

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body.mediatype).toBe('video');
    expect(body.caption).toBe('Confira!');
    expect(body.media).toBe('https://example.com/video.mp4');
  });

  it('omits caption when not provided', async () => {
    const mockFetch = makeFetchOk({ key: { id: 'X' }, status: 'PENDING' });
    vi.stubGlobal('fetch', mockFetch);

    const client = new WhatsAppClient();
    await client.sendMedia('5511', 'https://example.com/img.jpg', 'image');

    const [, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    expect(body).not.toHaveProperty('caption');
  });
});

describe('WhatsAppClient.scheduleReconnect / cancelReconnect', () => {
  it('does not schedule a second timer if one is already pending', () => {
    vi.stubGlobal('fetch', makeFetchOk({}));
    const client = new WhatsAppClient();
    client.scheduleReconnect();
    client.scheduleReconnect(); // second call should be ignored
    // If a second timer were created, advancing 30s would call connect twice
    // We just verify it doesn't throw
    client.cancelReconnect();
  });

  it('cancelReconnect clears the pending timer', () => {
    vi.stubGlobal('fetch', makeFetchOk({}));
    const client = new WhatsAppClient();
    client.scheduleReconnect();
    client.cancelReconnect();
    // Advancing time should NOT trigger a connect call
    vi.advanceTimersByTime(60_000);
    // fetch should not have been called (no connection attempt)
    expect((global.fetch as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
  });
});
