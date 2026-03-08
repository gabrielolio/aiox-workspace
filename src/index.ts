import { loadEnv } from './config/env.js';
import { logger } from './config/logger.js';
import { WhatsAppClient } from './services/whatsapp/client.js';
import { createWebhookServer } from './services/whatsapp/webhook.js';
import { startBrieferScheduler } from './agents/briefer/scheduler.js';

async function main(): Promise<void> {
  const env = loadEnv();

  logger.info('KING starting...');

  const whatsapp = new WhatsAppClient();

  createWebhookServer(whatsapp, env.PORT);

  try {
    await whatsapp.connect();
  } catch (error) {
    logger.warn({ error: String(error) }, 'Initial WhatsApp connection failed — will retry');
    whatsapp.scheduleReconnect();
  }

  logger.info('KING ready.');
  startBrieferScheduler(whatsapp);

  const shutdown = (): void => {
    logger.info('Shutting down KING...');
    whatsapp.cancelReconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((error: unknown) => {
  logger.error({ error: String(error) }, 'Fatal error during startup');
  process.exit(1);
});
