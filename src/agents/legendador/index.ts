import { logger } from '../../config/logger.js';
import { createJob, updateJob } from '../../database/db.js';
import { transcribeBuffer, mediaTypeToFilename } from './transcriber.js';
import { formatAsSubtitles } from './formatter.js';
import type { Message } from '../diretor/index.js';
import type { WhatsAppClient } from '../../services/whatsapp/client.js';

/**
 * Processes a media message (video or audio):
 * 1. Downloads the media from Evolution API
 * 2. Sends to Whisper API for transcription
 * 3. Formats the result as subtitles
 * 4. Returns the formatted text (caller sends it via WhatsApp)
 */
export async function processMediaMessage(
  message: Message,
  whatsappClient: WhatsAppClient,
): Promise<string> {
  if (!message.mediaKey || !message.rawMessage || !message.mediaType) {
    throw new Error('Message is missing media data required for download');
  }

  const mediaType = message.mediaType as 'video' | 'audio';
  const jobId = createJob(message.from, 'transcription', { mediaType });

  logger.info({ jobId, from: message.from, mediaType }, 'Legendador: job started');

  try {
    // Step 1: Download media from Evolution API
    updateJob(jobId, 'processing');
    const buffer = await whatsappClient.downloadMedia(message.mediaKey, message.rawMessage);
    logger.info({ jobId, bytes: buffer.length }, 'Media downloaded');

    // Step 2: Transcribe with Whisper
    const filename = mediaTypeToFilename(mediaType);
    const transcript = await transcribeBuffer(buffer, filename);

    // Step 3: Format as subtitles
    const formatted = formatAsSubtitles(transcript);

    updateJob(jobId, 'done', formatted);
    logger.info({ jobId }, 'Legendador: job done');

    return formatted;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    updateJob(jobId, 'failed', undefined, errorMsg);
    logger.error({ jobId, error: errorMsg }, 'Legendador: job failed');
    throw error;
  }
}
