import { GoogleGenerativeAI } from '@google/generative-ai';
import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';
import { inferBrandFromText } from '../guardiao/kb-loader.js';
import type { BrandName } from '../guardiao/kb-loader.js';
import { getWeekContext } from './week-context.js';
import { buildMuseSystemPrompt } from './prompt.js';

const NO_BRAND_MESSAGE = 'Qual marca? Porsche ou GWM? 🚗';
const ERROR_MESSAGE = 'Deu um branco aqui no criativo. Tenta de novo em instantes. 🔄';

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
    const env = loadEnv();
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const systemPrompt = buildMuseSystemPrompt(brand, weekContext);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(question);
    const reply = result.response.text().trim() || ERROR_MESSAGE;

    logger.info(
      { brand, weekNumber: weekContext.weekNumber },
      'Muse: ideas generated',
    );

    return reply;
  } catch (error) {
    logger.error({ brand, error: String(error) }, 'Muse: Gemini API call failed');
    return ERROR_MESSAGE;
  }
}
