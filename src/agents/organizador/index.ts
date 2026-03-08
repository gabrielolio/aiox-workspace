import { logger } from '../../config/logger.js';
import { loadEnv } from '../../config/env.js';
import { inferBrandFromText } from '../guardiao/kb-loader.js';
import type { BrandName } from '../guardiao/kb-loader.js';
import { getDriveClient } from '../../services/gdrive/client.js';
import { resolvePath, inferMediaType } from './path-resolver.js';
import { uploadToDrive } from './drive-uploader.js';
import { recordUpload } from '../../database/db.js';
import type { Message } from '../diretor/index.js';

const NO_BRAND_MESSAGE = 'Qual marca? Porsche ou GWM? 📁';
const ERROR_MESSAGE = 'Não consegui salvar agora. Tenta de novo em instantes. 🔄';

/**
 * Handles organization requests from Vitor by uploading media or text
 * to the correct Google Drive folder and recording the upload in SQLite.
 *
 * Returns a WhatsApp-ready confirmation or error string.
 */
export async function handleOrganization(
  message: Message,
  sessionBrand: BrandName | null,
): Promise<string> {
  // Resolve brand: message text first, then session context
  const brand = inferBrandFromText(message.text ?? '') ?? sessionBrand ?? null;

  if (!brand) {
    logger.warn({ from: message.from }, 'Organizador: brand not identified');
    return NO_BRAND_MESSAGE;
  }

  const mediaType = inferMediaType(
    message.mediaType,
    Boolean(message.text && message.text.length > 50),
  );

  const resolvedPath = resolvePath(brand, mediaType);

  logger.info({ brand, mediaType, path: resolvedPath.breadcrumb }, 'Organizador: uploading');

  try {
    const env = loadEnv();

    if (!env.GDRIVE_ROOT_FOLDER_ID) {
      logger.error('Organizador: GDRIVE_ROOT_FOLDER_ID not configured');
      return ERROR_MESSAGE;
    }

    const drive = getDriveClient();

    // For now, when there is no actual binary (text-only organization request),
    // we store a placeholder text file containing the message text.
    const isTextOnly = !message.hasMedia;
    const content = Buffer.from(isTextOnly ? (message.text ?? '') : '[media]');
    const originalFilename = isTextOnly
      ? `roteiro-${Date.now()}.txt`
      : `media-${message.mediaType ?? 'file'}`;
    const mime = isTextOnly ? 'text/plain' : 'application/octet-stream';

    const result = await uploadToDrive(
      drive,
      env.GDRIVE_ROOT_FOLDER_ID,
      resolvedPath,
      content,
      originalFilename,
      mime,
    );

    // Persist to SQLite
    recordUpload({
      timestamp: new Date().toISOString(),
      brand,
      type: mediaType,
      drive_url: result.driveUrl,
      filename: result.filename,
    });

    logger.info(
      { brand, filename: result.filename, driveUrl: result.driveUrl },
      'Organizador: upload complete',
    );

    return `Salvo! 📁 ${resolvedPath.breadcrumb}`;
  } catch (error) {
    logger.error({ brand, error: String(error) }, 'Organizador: upload failed');
    return ERROR_MESSAGE;
  }
}
