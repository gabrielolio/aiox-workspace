import { Readable } from 'node:stream';
import { logger } from '../../config/logger.js';
import type { DriveClient } from '../../services/gdrive/client.js';
import type { ResolvedPath } from './path-resolver.js';

const FOLDER_MIME = 'application/vnd.google-apps.folder';

/**
 * Finds an existing folder by name inside a parent, or creates it.
 * Avoids duplicate folders by searching before creating.
 */
async function ensureFolder(
  drive: DriveClient,
  name: string,
  parentId: string,
): Promise<string> {
  const res = await drive.files.list({
    q: `name = '${name}' and '${parentId}' in parents and mimeType = '${FOLDER_MIME}' and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (res.data.files && res.data.files.length > 0) {
    const id = res.data.files[0].id!;
    logger.debug({ name, parentId, id }, 'Drive: folder already exists');
    return id;
  }

  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: FOLDER_MIME,
      parents: [parentId],
    },
    fields: 'id',
  });

  const id = created.data.id!;
  logger.info({ name, parentId, id }, 'Drive: folder created');
  return id;
}

export interface UploadResult {
  fileId: string;
  driveUrl: string;
  filename: string;
}

/**
 * Uploads a file (buffer or stream) to the correct Drive folder,
 * creating the folder hierarchy if needed.
 *
 * Folder hierarchy: KING/{Brand}/{type}/{week}/
 */
export async function uploadToDrive(
  drive: DriveClient,
  rootFolderId: string,
  resolvedPath: ResolvedPath,
  fileContent: Buffer | Readable,
  originalFilename: string,
  mimeType: string,
): Promise<UploadResult> {
  const { brandFolder, typeFolder, weekFolder } = resolvedPath;

  // Build folder hierarchy: root → brand → type → week
  const brandId = await ensureFolder(drive, brandFolder, rootFolderId);
  const typeId = await ensureFolder(drive, typeFolder, brandId);
  const weekId = await ensureFolder(drive, weekFolder, typeId);

  // Timestamp-prefix filename to avoid collisions
  const timestamp = Date.now();
  const filename = `${timestamp}-${originalFilename}`;

  const body = Buffer.isBuffer(fileContent) ? Readable.from(fileContent) : fileContent;

  const uploaded = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [weekId],
    },
    media: {
      mimeType,
      body,
    },
    fields: 'id, webViewLink',
  });

  const fileId = uploaded.data.id!;
  const driveUrl = uploaded.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`;

  logger.info({ filename, fileId, driveUrl }, 'Drive: file uploaded');

  return { fileId, driveUrl, filename };
}
