import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';

/**
 * Sends an audio/video buffer to Gemini and returns the transcript.
 * filename must include extension (.mp4, .ogg, .mp3, etc.) so the MIME type can be inferred.
 */
export async function transcribeBuffer(buffer: Buffer, filename: string): Promise<string> {
  const env = loadEnv();
  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const mimeType = filename.endsWith('.mp4') ? 'video/mp4' : 'audio/ogg';
  const base64Data = buffer.toString('base64');

  logger.info({ filename, bytes: buffer.length }, 'Sending to Gemini for transcription');

  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType, data: base64Data } },
        { text: 'Transcreva este áudio em português do Brasil. Retorne apenas o texto transcrito, sem formatação extra.' },
      ],
    }],
  });

  const transcript = result.response.text().trim();
  logger.info({ filename, chars: transcript.length }, 'Gemini transcription complete');

  return transcript;
}

/**
 * Infers a filename with extension from a media type.
 * Evolution API returns audio as ogg (opus) and video as mp4.
 */
export function mediaTypeToFilename(mediaType: 'video' | 'audio'): string {
  return mediaType === 'video' ? 'media.mp4' : 'media.ogg';
}
