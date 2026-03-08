import { google } from 'googleapis';
import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';

export type DriveClient = ReturnType<typeof google.drive>;

let driveClient: DriveClient | null = null;

/**
 * Returns a singleton Google Drive v3 client authenticated via Service Account.
 * The service account JSON must be stored in GDRIVE_SERVICE_ACCOUNT_KEY env var.
 */
export function getDriveClient(): DriveClient {
  if (driveClient) return driveClient;

  const env = loadEnv();

  if (!env.GDRIVE_SERVICE_ACCOUNT_KEY) {
    throw new Error('GDRIVE_SERVICE_ACCOUNT_KEY is not configured');
  }

  let credentials: object;
  try {
    credentials = JSON.parse(env.GDRIVE_SERVICE_ACCOUNT_KEY);
  } catch {
    throw new Error('GDRIVE_SERVICE_ACCOUNT_KEY is not valid JSON');
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  driveClient = google.drive({ version: 'v3', auth });
  logger.info('Google Drive client initialised');

  return driveClient;
}

/** Exposed for testing — resets singleton so tests can inject their own mock. */
export function resetDriveClient(): void {
  driveClient = null;
}
