import cron from 'node-cron';
import { logger } from '../../config/logger.js';
import { loadEnv } from '../../config/env.js';
import {
  buildMondayMessage,
  buildWednesdayMessage,
  buildFridayMessage,
} from './weekly-summary.js';
import { startFeedbackSession } from './index.js';
import type { WhatsAppClient } from '../../services/whatsapp/client.js';

/**
 * Initializes the Briefer scheduler.
 * Sends 3 automated messages per week to Vitor via WhatsApp.
 *
 * Schedule (Brasília time — UTC-3):
 *   Monday    08:00  → weekly opening
 *   Wednesday 17:00  → midweek status check
 *   Friday    17:00  → week closing + pending confirmation
 */
export function startBrieferScheduler(client: WhatsAppClient): void {
  const env = loadEnv();
  const vitorsNumber = env.VITOR_WHATSAPP;

  if (!vitorsNumber) {
    logger.warn('VITOR_WHATSAPP not set — Briefer scheduler disabled');
    return;
  }

  // Monday 08:00 BRT = 11:00 UTC
  cron.schedule('0 11 * * 1', () => {
    void sendBrieferMessage(client, vitorsNumber, 'monday');
  });

  // Wednesday 17:00 BRT = 20:00 UTC
  cron.schedule('0 20 * * 3', () => {
    void sendBrieferMessage(client, vitorsNumber, 'wednesday');
  });

  // Friday 17:00 BRT = 20:00 UTC
  cron.schedule('0 20 * * 5', () => {
    void sendBrieferMessage(client, vitorsNumber, 'friday');
  });

  logger.info({ vitorsNumber }, 'Briefer scheduler started (3 messages/week)');
}

async function sendBrieferMessage(
  client: WhatsAppClient,
  to: string,
  day: 'monday' | 'wednesday' | 'friday',
): Promise<void> {
  try {
    const now = new Date();
    let message: string;

    switch (day) {
      case 'monday':
        message = buildMondayMessage(now);
        break;
      case 'wednesday':
        message = buildWednesdayMessage(now);
        break;
      case 'friday':
        message = buildFridayMessage(now);
        startFeedbackSession(to);
        break;
    }

    await client.sendText(to, message);
    logger.info({ day, to }, 'Briefer message sent');
  } catch (error) {
    logger.error({ day, to, error: String(error) }, 'Briefer: failed to send message');
  }
}
