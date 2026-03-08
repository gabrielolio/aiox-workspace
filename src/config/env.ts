import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.string().default('info'),

  // Core APIs
  ANTHROPIC_API_KEY: z.string().min(1),
  OPENAI_API_KEY: z.string().optional(),

  // WhatsApp
  EVOLUTION_API_URL: z.string().url().default('http://localhost:8080'),
  EVOLUTION_API_KEY: z.string().optional(),
  WHATSAPP_INSTANCE: z.string().default('king-bot'),

  // Database
  DATABASE_URL: z.string().default('./data/king.db'),

  // Google Drive
  GOOGLE_CREDENTIALS_PATH: z.string().optional(),
  GOOGLE_DRIVE_FOLDER_ID: z.string().optional(),
  GDRIVE_SERVICE_ACCOUNT_KEY: z.string().optional(),
  GDRIVE_ROOT_FOLDER_ID: z.string().optional(),

  // Scheduler
  VITOR_WHATSAPP: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  return envSchema.parse(process.env);
}
