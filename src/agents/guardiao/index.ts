import { logger } from '../../config/logger.js';
import { getDb } from '../../database/db.js';
import { loadBrand, inferBrandFromText } from './kb-loader.js';
import { answerGuidelineQuestion } from './responder.js';
import type { BrandName } from './kb-loader.js';

const UNKNOWN_BRAND_MESSAGE =
  'Não identifiquei a marca na sua pergunta. Menciona Porsche ou GWM e repito a busca. 👀';

export async function handleGuidelineQuestion(
  question: string,
  sessionBrand?: BrandName | null,
): Promise<string> {
  // 1. Identify brand: question text first, then session context
  const brand = inferBrandFromText(question) ?? sessionBrand ?? null;

  if (!brand) {
    logger.warn({ question }, 'Guardiao: brand not identified');
    return UNKNOWN_BRAND_MESSAGE;
  }

  logger.info({ brand, question }, 'Guardiao: handling guideline question');

  try {
    // 2. Load knowledge base for this brand
    const knowledge = loadBrand(brand);

    // 3. Answer the question
    const answer = await answerGuidelineQuestion(question, knowledge);

    // 4. Register query in SQLite
    recordQuery(brand, question, answer);

    return answer;
  } catch (error) {
    logger.error({ brand, error: String(error) }, 'Guardiao: failed to answer');
    return 'Não consegui consultar os guidelines agora. Tenta de novo em instantes. 🔄';
  }
}

function recordQuery(brand: BrandName, question: string, answer: string): void {
  try {
    const db = getDb();
    db.prepare(
      `INSERT INTO jobs (session_id, type, status, payload, result)
       VALUES (?, ?, ?, ?, ?)`,
    ).run(
      `guardiao_${brand}`,
      'guideline_query',
      'done',
      JSON.stringify({ brand, question: question.slice(0, 200) }),
      answer.slice(0, 500),
    );
  } catch (error) {
    // Non-critical — log and continue
    logger.warn({ error: String(error) }, 'Guardiao: failed to record query in SQLite');
  }
}
