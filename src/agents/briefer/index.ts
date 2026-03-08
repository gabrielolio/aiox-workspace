import { logger } from '../../config/logger.js';
import { getPendingItems, confirmPendingItem } from '../../database/db.js';
import { getWeekInfo } from './weekly-summary.js';

// State: track whether we're awaiting feedback and which items need responses
interface FeedbackSession {
  items: Array<{ id: number; item: string }>;
  currentIndex: number;
}

const feedbackSessions = new Map<string, FeedbackSession>();

/**
 * Starts a feedback collection session for a user after the Friday message.
 * Call this after sending the Friday message.
 */
export function startFeedbackSession(from: string): void {
  const { weekNumber, year } = getWeekInfo();
  const pending = getPendingItems(weekNumber, year);
  if (pending.length === 0) return;

  feedbackSessions.set(from, {
    items: pending.map((p) => ({ id: p.id, item: p.item })),
    currentIndex: 0,
  });

  logger.info({ from, count: pending.length }, 'Briefer: feedback session started');
}

/**
 * Returns true if there's an active feedback session for this user.
 */
export function hasFeedbackSession(from: string): boolean {
  return feedbackSessions.has(from);
}

/**
 * Processes a sim/não reply from Vitor.
 * Returns the next question or a closing message.
 */
export function handleFeedbackResponse(from: string, text: string): string {
  const session = feedbackSessions.get(from);
  if (!session) {
    return 'Não entendi — você está respondendo sobre os pendentes da semana? Manda *sim* ou *não*.';
  }

  const confirmed = normalizeAnswer(text);
  if (confirmed === null) {
    return 'Responde com *sim* (fica pra semana que vem) ou *não* (descarta).';
  }

  const current = session.items[session.currentIndex];
  confirmPendingItem(current.id, confirmed);

  logger.info(
    { from, item: current.item, confirmed },
    'Briefer: feedback recorded',
  );

  session.currentIndex += 1;

  // More items?
  if (session.currentIndex < session.items.length) {
    const next = session.items[session.currentIndex];
    return `Registrado! E esse:\n*${next.item}* — fica pra semana que vem?`;
  }

  // Done
  feedbackSessions.delete(from);
  const keptCount = session.items.filter((_, i) => {
    const wasConfirmed = i < session.currentIndex;
    return wasConfirmed && confirmed; // rough — last item's value
  }).length;

  void keptCount;
  return '✅ Tudo registrado! Na segunda-feira o resumo já considera o que ficou pendente. Bom fim de semana! 🌙';
}

function normalizeAnswer(text: string): boolean | null {
  const clean = text.trim().toLowerCase().replace(/[^a-záãâàéêíóõôú]/g, '');
  if (['sim', 's', 'yes', 'ok', 'pode', 'claro', 'confirma'].includes(clean)) return true;
  if (['nao', 'n', 'no', 'nope', 'cancela', 'descarta'].includes(clean)) return false;
  return null;
}
