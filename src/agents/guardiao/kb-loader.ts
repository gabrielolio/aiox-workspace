import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../../config/logger.js';

// Whitelist of valid brand names — prevents path traversal attacks
const VALID_BRANDS = ['porsche', 'gwm'] as const;
export type BrandName = (typeof VALID_BRANDS)[number];

const KB_PATH = path.resolve('./knowledge-base/brands');

const BRAND_FILES: Record<BrandName, string> = {
  porsche: 'porsche-brasil-2026.yaml',
  gwm: 'gwm-brasil-2026.yaml',
};

// Simple YAML key-value extractor — avoids a full YAML parser dependency.
// Handles: string values, quoted strings, nested keys (dot notation lookup).
function extractFromYaml(content: string, key: string): string | null {
  const lines = content.split('\n');
  const keyParts = key.split('.');

  // For nested keys, find the parent section first
  if (keyParts.length > 1) {
    const [parentKey, ...childParts] = keyParts;
    const parentIdx = lines.findIndex((l) => l.trimStart().startsWith(`${parentKey}:`));
    if (parentIdx === -1) return null;

    const parentIndent = lines[parentIdx].match(/^(\s*)/)?.[1]?.length ?? 0;
    const sectionLines: string[] = [];

    for (let i = parentIdx + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim() === '' || line.match(/^\s*#/)) {
        sectionLines.push(line);
        continue;
      }
      const lineIndent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
      if (lineIndent <= parentIndent && line.trim()) break;
      sectionLines.push(line);
    }

    return extractFromYaml(sectionLines.join('\n'), childParts.join('.'));
  }

  // Simple key lookup
  for (const line of lines) {
    const match = line.match(new RegExp(`^\\s*${key}:\\s*(.+)$`));
    if (match) {
      return match[1].replace(/^["']|["']$/g, '').trim();
    }
  }

  return null;
}

export interface BrandKnowledge {
  brand: BrandName;
  raw: string;
  get(key: string): string | null;
}

export function loadBrand(brand: BrandName): BrandKnowledge {
  const filename = BRAND_FILES[brand];
  const filePath = path.join(KB_PATH, filename);

  if (!fs.existsSync(filePath)) {
    logger.error({ brand, filePath }, 'Brand YAML file not found');
    throw new Error(`Brand file not found: ${filename}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  logger.info({ brand, filePath }, 'Brand knowledge loaded');

  return {
    brand,
    raw,
    get: (key: string) => extractFromYaml(raw, key),
  };
}

export function inferBrandFromText(text: string): BrandName | null {
  const lower = text.toLowerCase();

  if (lower.match(/porsche|cayenne|taycan|panamera|macan|carrera|911|bamaq/)) {
    return 'porsche';
  }

  if (lower.match(/gwm|haval|h6|tank|tank 300|poer|bamaq gwm/)) {
    return 'gwm';
  }

  return null;
}

export { VALID_BRANDS };
