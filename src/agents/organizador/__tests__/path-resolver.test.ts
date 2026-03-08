import { describe, it, expect } from 'vitest';
import { resolvePath, inferMediaType } from '../path-resolver.js';

describe('resolvePath', () => {
  // 2026-03-07 is Saturday of ISO week 10
  const saturday = new Date('2026-03-07T10:00:00Z');

  it('resolves Porsche video path correctly', () => {
    const result = resolvePath('porsche', 'videos', saturday);
    expect(result.brandFolder).toBe('Porsche');
    expect(result.typeFolder).toBe('videos');
    expect(result.weekFolder).toBe('2026-W10');
    expect(result.breadcrumb).toBe('Porsche > videos > 2026-W10');
  });

  it('resolves GWM fotos path correctly', () => {
    const result = resolvePath('gwm', 'fotos', saturday);
    expect(result.brandFolder).toBe('GWM');
    expect(result.typeFolder).toBe('fotos');
    expect(result.weekFolder).toBe('2026-W10');
    expect(result.breadcrumb).toBe('GWM > fotos > 2026-W10');
  });

  it('resolves roteiros path correctly', () => {
    const result = resolvePath('porsche', 'roteiros', saturday);
    expect(result.typeFolder).toBe('roteiros');
    expect(result.breadcrumb).toBe('Porsche > roteiros > 2026-W10');
  });

  it('pads single-digit week numbers', () => {
    // 2026-01-05 is ISO week 2
    const earlyJan = new Date('2026-01-05T10:00:00Z');
    const result = resolvePath('gwm', 'videos', earlyJan);
    expect(result.weekFolder).toBe('2026-W02');
  });
});

describe('inferMediaType', () => {
  it('maps video mediaType to videos', () => {
    expect(inferMediaType('video', false)).toBe('videos');
  });

  it('maps audio mediaType to videos', () => {
    expect(inferMediaType('audio', false)).toBe('videos');
  });

  it('maps image mediaType to fotos', () => {
    expect(inferMediaType('image', false)).toBe('fotos');
  });

  it('maps document mediaType to roteiros', () => {
    expect(inferMediaType('document', false)).toBe('roteiros');
  });

  it('maps long text (hasText=true) to roteiros', () => {
    expect(inferMediaType(undefined, true)).toBe('roteiros');
  });

  it('defaults to roteiros when undefined and no text', () => {
    expect(inferMediaType(undefined, false)).toBe('roteiros');
  });
});
