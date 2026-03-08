import type { BrandName } from '../guardiao/kb-loader.js';

export interface WeekContext {
  dayOfWeek: string;
  brandOfDay: BrandName | null;
  weekNumber: number;
}

/**
 * Returns ISO week number for a given date.
 * Week 1 = the week containing the first Thursday of the year.
 */
function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Bamaq calendar:
 * Porsche → Mon (1), Wed (3), Fri (5)
 * GWM     → Tue (2), Thu (4)
 * Sat/Sun → null
 */
const DAY_NAMES: Record<number, string> = {
  0: 'domingo',
  1: 'segunda',
  2: 'terça',
  3: 'quarta',
  4: 'quinta',
  5: 'sexta',
  6: 'sábado',
};

const BRAND_OF_DAY: Record<number, BrandName | null> = {
  0: null,
  1: 'porsche',
  2: 'gwm',
  3: 'porsche',
  4: 'gwm',
  5: 'porsche',
  6: null,
};

export function getWeekContext(now: Date = new Date()): WeekContext {
  const dayIndex = now.getDay();
  return {
    dayOfWeek: DAY_NAMES[dayIndex],
    brandOfDay: BRAND_OF_DAY[dayIndex],
    weekNumber: getISOWeekNumber(now),
  };
}
