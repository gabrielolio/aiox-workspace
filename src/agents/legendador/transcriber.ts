import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';

const WHISPER_URL = 'https://api.openai.com/v1/audio/transcriptions';
const WHISPER_MODEL = 'whisper-1';

/**
 * Sends an audio/video buffer to OpenAI Whisper API and returns the transcript.
 * filename must include extension (.mp4, .ogg, .mp3, etc.) so Whisper knows the format.
 */
export async function transcribeBuffer(buffer: Buffer, filename: string): Promise<string> {
  const env = loadEnv();

  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured — cannot transcribe');
  }

  const formData = new FormData();
  formData.append('file', new Blob([buffer]), filename);
  formData.append('model', WHISPER_MODEL);
  formData.append('language', 'pt');
  formData.append('response_format', 'text');

  logger.info({ filename, bytes: buffer.length }, 'Sending to Whisper API');

  const response = await fetch(WHISPER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Whisper API ${response.status}: ${error}`);
  }

  const transcript = await response.text();
  logger.info({ filename, chars: transcript.length }, 'Whisper transcription complete');

  return transcript.trim();
}

/**
 * Infers a filename with extension from a media type.
 * Evolution API returns audio as ogg (opus) and video as mp4.
 */
export function mediaTypeToFilename(mediaType: 'video' | 'audio'): string {
  return mediaType === 'video' ? 'media.mp4' : 'media.ogg';
}
