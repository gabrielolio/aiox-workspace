import type { BrandName } from '../guardiao/kb-loader.js';

export type MediaType = 'videos' | 'fotos' | 'roteiros';

const BRAND_FOLDER: Record<BrandName, string> = {
  porsche: 'Porsche',
  gwm: 'GWM',
};

/**
 * Returns the ISO week number for a given date (ISO 8601).
 * Week 1 = the week containing the year's first Thursday.
 */
function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7; // Mon=1 … Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export interface ResolvedPath {
  brandFolder: string;  // e.g. "Porsche"
  typeFolder: MediaType; // e.g. "videos"
  weekFolder: string;   // e.g. "2026-W10"
  /** Human-readable breadcrumb for the WhatsApp confirmation message */
  breadcrumb: string;   // e.g. "Porsche > videos > 2026-W10"
}

/**
 * Resolves the Drive folder path for an upload.
 *
 * @param brand  Detected brand
 * @param type   Media type (videos | fotos | roteiros)
 * @param now    Reference date (defaults to Date.now() — injectable for tests)
 */
export function resolvePath(
  brand: BrandName,
  type: MediaType,
  now: Date = new Date(),
): ResolvedPath {
  const brandFolder = BRAND_FOLDER[brand];
  const week = isoWeekNumber(now);
  const year = now.getFullYear();
  const weekFolder = `${year}-W${String(week).padStart(2, '0')}`;
  const breadcrumb = `${brandFolder} > ${type} > ${weekFolder}`;

  return { brandFolder, typeFolder: type, weekFolder, breadcrumb };
}

/**
 * Infers the media type from the WhatsApp message mediaType field.
 * Falls back to 'roteiros' for text or unknown types.
 */
export function inferMediaType(
  mediaType: 'image' | 'video' | 'audio' | 'document' | undefined,
  hasText: boolean,
): MediaType {
  if (mediaType === 'video' || mediaType === 'audio') return 'videos';
  if (mediaType === 'image') return 'fotos';
  // documents and long-text messages → roteiros
  if (mediaType === 'document' || hasText) return 'roteiros';
  return 'roteiros';
}
