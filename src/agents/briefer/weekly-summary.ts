import { countDoneJobsInWeek, getPendingItems, savePendingItem } from '../../database/db.js';

// Bamaq calendar: Porsche = Mon/Wed/Fri (3), GWM = Tue/Thu (2)
const EXPECTED_PORSCHE_PER_WEEK = 3;
const EXPECTED_GWM_PER_WEEK = 2;
const EXPECTED_TOTAL_PER_WEEK = EXPECTED_PORSCHE_PER_WEEK + EXPECTED_GWM_PER_WEEK;

export interface WeekInfo {
  weekNumber: number;
  year: number;
  weekStart: number; // unix timestamp (Monday 00:00)
  weekEnd: number;   // unix timestamp (Sunday 23:59)
}

/** Returns ISO week number and year for a given date. */
export function getWeekInfo(date: Date = new Date()): WeekInfo {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay() || 7; // ISO: Mon=1, Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  // Compute Monday of this week
  const monday = new Date(date);
  const dow = date.getDay() || 7;
  monday.setDate(date.getDate() - (dow - 1));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    weekNumber,
    year: d.getUTCFullYear(),
    weekStart: Math.floor(monday.getTime() / 1000),
    weekEnd: Math.floor(sunday.getTime() / 1000),
  };
}

/** Returns how many expected posts remain for the rest of the current week (from today). */
function getExpectedRemaining(date: Date): number {
  const dow = date.getDay() || 7; // Mon=1 … Sun=7
  // Porsche days (1=Mon,3=Wed,5=Fri) remaining from today (inclusive)
  const porscheDays = [1, 3, 5].filter((d) => d >= dow).length;
  // GWM days (2=Tue,4=Thu) remaining from today (inclusive)
  const gwmDays = [2, 4].filter((d) => d >= dow).length;
  return porscheDays + gwmDays;
}

// ─── Monday message ────────────────────────────────────────────────────────────

export function buildMondayMessage(date: Date = new Date()): string {
  const { weekNumber, weekStart, weekEnd, year } = getWeekInfo(date);
  const pending = getPendingItems(weekNumber - 1, year); // last week's leftovers

  let msg = `📋 *Semana ${weekNumber}* — ${EXPECTED_TOTAL_PER_WEEK} conteúdos previstos\n`;
  msg += `Porsche: ${EXPECTED_PORSCHE_PER_WEEK} (seg/qua/sex) · GWM: ${EXPECTED_GWM_PER_WEEK} (ter/qui)\n`;

  if (pending.length > 0) {
    const items = pending.map((p) => `• ${p.item}`).join('\n');
    msg += `\n⚠️ *Da semana passada:*\n${items}\n`;
  }

  msg += `\nPor onde você começa? 🚀`;

  // Save this week's expected items for Friday tracking
  const items = [
    `Porsche — ${EXPECTED_PORSCHE_PER_WEEK} posts (seg/qua/sex)`,
    `GWM — ${EXPECTED_GWM_PER_WEEK} reels (ter/qui)`,
  ];
  for (const item of items) {
    savePendingItem(weekNumber, year, item);
  }

  void weekStart; void weekEnd; // used indirectly via getWeekInfo
  return msg;
}

// ─── Wednesday message ─────────────────────────────────────────────────────────

export function buildWednesdayMessage(date: Date = new Date()): string {
  const { weekNumber, weekStart, weekEnd } = getWeekInfo(date);
  const done = countDoneJobsInWeek(weekStart, weekEnd);
  const remaining = getExpectedRemaining(date);
  const total = EXPECTED_TOTAL_PER_WEEK;

  if (done >= total) {
    return `✅ *Semana ${weekNumber}* em dia!\nTodos os ${total} conteúdos já entregues. 🎉`;
  }

  const left = total - done;
  const emoji = done === 0 ? '🔴' : done < total / 2 ? '🟡' : '🟢';

  return (
    `${emoji} *Check semana ${weekNumber}* — ${done} de ${total} feitos\n` +
    `Faltam ${left} conteúdos · ${remaining} dias úteis restantes\n` +
    `O que está travando?`
  );
}

// ─── Friday message ────────────────────────────────────────────────────────────

export function buildFridayMessage(date: Date = new Date()): string {
  const { weekNumber, year, weekStart, weekEnd } = getWeekInfo(date);
  const done = countDoneJobsInWeek(weekStart, weekEnd);
  const total = EXPECTED_TOTAL_PER_WEEK;
  const pending = getPendingItems(weekNumber, year);

  if (done >= total) {
    return `🏆 *Semana ${weekNumber} fechada!* Todos os ${total} conteúdos entregues. Bom descanso! 🎉`;
  }

  const left = total - done;
  let msg = `📊 *Fechamento semana ${weekNumber}* — ${done}/${total} entregues\n`;

  if (pending.length > 0) {
    msg += `\nFicou pendente:\n`;
    pending.forEach((p, i) => {
      msg += `${i + 1}. ${p.item}\n`;
    });
    msg += `\nRolam pra semana que vem? Responde *sim* ou *não* para cada item.`;
  } else {
    msg += `\n${left} conteúdo(s) não registrado(s). Ficam pra próxima? (*sim* / *não*)`;
  }

  return msg;
}
