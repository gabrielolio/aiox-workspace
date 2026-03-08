import Anthropic from '@anthropic-ai/sdk';
import { loadEnv } from '../../config/env.js';
import { logger } from '../../config/logger.js';
import type { BrandKnowledge, BrandName } from './kb-loader.js';

const FALLBACK_MESSAGE =
  'Não tenho essa info aqui — confirma com o briefing oficial da marca. 📋';

// Keywords that map to YAML paths to try first (fast path — no Claude needed)
const FAST_PATH_PATTERNS: Array<{ pattern: RegExp; keys: string[] }> = [
  {
    pattern: /fonte|tipografia|typography/,
    keys: ['subtitle_typography.fonte_alternativa', 'subtitle_typography.fonte_oficial'],
  },
  {
    pattern: /cor|color|hex|paleta/,
    keys: ['identity.cores_principais', 'subtitle_typography.cor_texto'],
  },
  {
    pattern: /legenda|subtitle|caption/,
    keys: ['subtitle_typography.caixa_captions', 'subtitle_typography.contorno'],
  },
  {
    pattern: /logo|crest|brasao/,
    keys: ['identity.restricoes_logo'],
  },
  {
    pattern: /uppercase|caixa alta|all caps/,
    keys: ['subtitle_typography.caixa_taglines', 'subtitle_typography.caixa_captions'],
  },
  {
    pattern: /sombra|shadow|outline|contorno/,
    keys: ['subtitle_typography.sombra', 'subtitle_typography.contorno'],
  },
];

function tryFastPath(question: string, knowledge: BrandKnowledge): string | null {
  for (const { pattern, keys } of FAST_PATH_PATTERNS) {
    if (pattern.test(question.toLowerCase())) {
      const results: string[] = [];
      for (const key of keys) {
        const value = knowledge.get(key);
        if (value && value !== 'null') {
          results.push(`*${key.split('.').pop()}:* ${value}`);
        }
      }
      if (results.length > 0) return results.join('\n');
    }
  }
  return null;
}

async function askClaude(
  question: string,
  brand: BrandName,
  yamlContent: string,
): Promise<string> {
  const env = loadEnv();
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const brandLabel = brand === 'porsche' ? 'Porsche' : 'GWM';

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: `Você é um assistente especialista em brand guidelines.
Responda APENAS com informações presentes no YAML abaixo — não invente nada.
Se a informação não estiver no YAML, responda exatamente: "${FALLBACK_MESSAGE}"
Seja direto e conciso. Use no máximo 3 linhas. Responda em português.
Marca: ${brandLabel}

YAML:
${yamlContent}`,
    messages: [{ role: 'user', content: question }],
  });

  return response.content[0]?.type === 'text'
    ? response.content[0].text.trim()
    : FALLBACK_MESSAGE;
}

export async function answerGuidelineQuestion(
  question: string,
  knowledge: BrandKnowledge,
): Promise<string> {
  // 1. Try fast path (no API call)
  const fastAnswer = tryFastPath(question, knowledge);
  if (fastAnswer) {
    logger.info({ brand: knowledge.brand, path: 'fast' }, 'Guardiao: fast path answer');
    return fastAnswer;
  }

  // 2. Delegate to Claude with the YAML as context
  logger.info({ brand: knowledge.brand, path: 'claude' }, 'Guardiao: delegating to Claude');
  try {
    return await askClaude(question, knowledge.brand, knowledge.raw);
  } catch (error) {
    logger.error({ error: String(error) }, 'Guardiao: Claude call failed');
    return FALLBACK_MESSAGE;
  }
}
