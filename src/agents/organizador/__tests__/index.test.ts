import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Mocks ---
vi.mock('../../../services/gdrive/client.js', () => ({
  getDriveClient: vi.fn(),
  resetDriveClient: vi.fn(),
}));

vi.mock('../drive-uploader.js', () => ({
  uploadToDrive: vi.fn().mockResolvedValue({
    fileId: 'file-123',
    driveUrl: 'https://drive.google.com/file/d/file-123/view',
    filename: '1741300000000-media-video',
  }),
}));

vi.mock('../../../database/db.js', () => ({
  recordUpload: vi.fn(),
}));

vi.mock('../../../config/env.js', () => ({
  loadEnv: () => ({
    ANTHROPIC_API_KEY: 'test',
    GDRIVE_SERVICE_ACCOUNT_KEY: '{"type":"service_account"}',
    GDRIVE_ROOT_FOLDER_ID: 'root-folder-id',
  }),
}));

vi.mock('../../../config/logger.js', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

import { handleOrganization } from '../index.js';
import type { Message } from '../../diretor/index.js';

function makeMessage(overrides: Partial<Message> = {}): Message {
  return {
    from: '5511999999999',
    timestamp: Date.now(),
    text: 'salva esse vídeo da Porsche',
    hasMedia: false,
    ...overrides,
  };
}

describe('handleOrganization', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns clarification message when no brand is identified', async () => {
    const msg = makeMessage({ text: 'salva esse arquivo' });
    const result = await handleOrganization(msg, null);
    expect(result).toBe('Qual marca? Porsche ou GWM? 📁');
  });

  it('infers brand from message text (Porsche)', async () => {
    const msg = makeMessage({ text: 'salva esse vídeo do Cayenne' });
    const result = await handleOrganization(msg, null);
    expect(result).toContain('Porsche');
    expect(result).toContain('Salvo!');
  });

  it('infers brand from message text (GWM)', async () => {
    const msg = makeMessage({ text: 'guarda esse do Tank 300' });
    const result = await handleOrganization(msg, null);
    expect(result).toContain('GWM');
    expect(result).toContain('Salvo!');
  });

  it('uses session brand when question has no brand signals', async () => {
    const msg = makeMessage({ text: 'salva esse arquivo' });
    const result = await handleOrganization(msg, 'gwm');
    expect(result).toContain('Salvo!');
    expect(result).toContain('GWM');
  });

  it('returns error message when uploadToDrive throws', async () => {
    const { uploadToDrive } = await import('../drive-uploader.js');
    vi.mocked(uploadToDrive).mockRejectedValueOnce(new Error('Network error'));

    const msg = makeMessage({ text: 'salva esse do Cayenne' });
    const result = await handleOrganization(msg, null);
    expect(result).toBe('Não consegui salvar agora. Tenta de novo em instantes. 🔄');
  });
});
