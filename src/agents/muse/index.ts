import Anthropic from '@anthropic-ai/sdk';
import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';
import { inferBrandFromText } from '../guardiao/kb-loader.js';
import type { BrandName } from '../guardiao/kb-loader.js';
import { getWeekContext } from './week-context.js';
import { buildMuseSystemPrompt } from './prompt.js';

const NO_BRAND_MESSAGE = 'Qual marca? Porsche ou GWM? 🚗';
const ERROR_MESSAGE = 'Deu um branco aqui no criativo. Tenta de novo em instantes. 🔄';

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    const env = loadEnv();
    anthropicClient = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

/**
 * Handles creative requests from Vitor by generating 2-3 content ideas.
 * Brand is resolved from: question text → sessionBrand fallback.
 * If no brand can be inferred, returns a clarification message.
 */
export async function handleCreativeRequest(
  question: string,
  sessionBrand: BrandName | null,
): Promise<string> {
  // Resolve brand: question text takes priority over session context
  const brand = inferBrandFromText(question) ?? sessionBrand ?? null;

  if (!brand) {
    logger.warn({ question }, 'Muse: brand not identified');
    return NO_BRAND_MESSAGE;
  }

  const weekContext = getWeekContext();
  logger.info({ brand, weekContext, question }, 'Muse: generating creative ideas');

  try {
    const client = getClient();
    const systemPrompt = buildMuseSystemPrompt(brand, weekContext);

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 350,
      system: systemPrompt,
      messages: [{ role: 'user', content: question }],
    });

    const reply =
      response.content[0]?.type === 'text' ? response.content[0].text.trim() : ERROR_MESSAGE;

    logger.info(
      { brand, weekNumber: weekContext.weekNumber, tokens: response.usage },
      'Muse: ideas generated',
    );

    return reply;
  } catch (error) {
    logger.error({ brand, error: String(error) }, 'Muse: Claude API call failed');
    return ERROR_MESSAGE;
  }
}
