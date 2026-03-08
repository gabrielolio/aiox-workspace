import { describe, it, expect } from 'vitest';
import { getWeekContext } from '../week-context.js';

describe('getWeekContext', () => {
  it('returns Porsche on Monday', () => {
    // 2026-03-02 is a Monday
    const ctx = getWeekContext(new Date('2026-03-02T10:00:00Z'));
    expect(ctx.brandOfDay).toBe('porsche');
    expect(ctx.dayOfWeek).toBe('segunda');
  });

  it('returns GWM on Tuesday', () => {
    // 2026-03-03 is a Tuesday
    const ctx = getWeekContext(new Date('2026-03-03T10:00:00Z'));
    expect(ctx.brandOfDay).toBe('gwm');
    expect(ctx.dayOfWeek).toBe('terça');
  });

  it('returns Porsche on Wednesday', () => {
    // 2026-03-04 is a Wednesday
    const ctx = getWeekContext(new Date('2026-03-04T10:00:00Z'));
    expect(ctx.brandOfDay).toBe('porsche');
    expect(ctx.dayOfWeek).toBe('quarta');
  });

  it('returns GWM on Thursday', () => {
    // 2026-03-05 is a Thursday
    const ctx = getWeekContext(new Date('2026-03-05T10:00:00Z'));
    expect(ctx.brandOfDay).toBe('gwm');
    expect(ctx.dayOfWeek).toBe('quinta');
  });

  it('returns Porsche on Friday', () => {
    // 2026-03-06 is a Friday
    const ctx = getWeekContext(new Date('2026-03-06T10:00:00Z'));
    expect(ctx.brandOfDay).toBe('porsche');
    expect(ctx.dayOfWeek).toBe('sexta');
  });

  it('returns null on Saturday', () => {
    // 2026-03-07 is a Saturday
    const ctx = getWeekContext(new Date('2026-03-07T10:00:00Z'));
    expect(ctx.brandOfDay).toBeNull();
    expect(ctx.dayOfWeek).toBe('sábado');
  });

  it('returns null on Sunday', () => {
    // 2026-03-08 is a Sunday
    const ctx = getWeekContext(new Date('2026-03-08T10:00:00Z'));
    expect(ctx.brandOfDay).toBeNull();
    expect(ctx.dayOfWeek).toBe('domingo');
  });

  it('returns a positive week number', () => {
    const ctx = getWeekContext(new Date('2026-03-07T10:00:00Z'));
    expect(ctx.weekNumber).toBeGreaterThan(0);
    expect(ctx.weekNumber).toBeLessThanOrEqual(53);
  });
});
