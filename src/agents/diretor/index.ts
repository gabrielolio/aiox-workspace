import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../../config/logger.js';
import { loadEnv } from '../../config/env.js';
import { SYSTEM_PROMPT, buildUserContent, buildIntentContext, buildBrandContext } from './prompt.js';
import { sessionManager } from './session.js';
import { inferBrand } from './brand.js';
import { getAgentContext } from './router.js';
import { processMediaMessage } from '../legendador/index.js';
import { handleGuidelineQuestion } from '../guardiao/index.js';
import { hasFeedbackSession, handleFeedbackResponse } from '../briefer/index.js';
import { handleCreativeRequest } from '../muse/index.js';
import { handleOrganization } from '../organizador/index.js';
import type { WhatsAppClient } from '../../services/whatsapp/client.js';

export interface Message {
  from: string;
  text?: string;
  hasMedia?: boolean;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
  // Raw Evolution API data needed to download media (present when hasMedia=true)
  mediaKey?: import('../../services/whatsapp/types.js').EvolutionWebhookKey;
  rawMessage?: import('../../services/whatsapp/types.js').EvolutionWebhookMessage;
  timestamp: number;
}

export type Intent =
  | 'subtitle_request'
  | 'content_idea'
  | 'creative_request'
  | 'guideline_question'
  | 'briefer_feedback'
  | 'organization'
  | 'general_chat';

export function classifyIntent(message: Message): Intent {
  if (message.hasMedia && message.mediaType === 'video') {
    return 'subtitle_request';
  }

  if (message.hasMedia && message.mediaType === 'audio') {
    return 'subtitle_request';
  }

  // Active Briefer feedback session takes precedence for short replies
  if (hasFeedbackSession(message.from)) {
    return 'briefer_feedback';
  }

  const text = (message.text || '').toLowerCase();

  if (text.match(/o que post|ideia|briefing|sugest/)) {
    return 'content_idea';
  }

  if (text.match(/criativ|diferente|serie|roteiro/)) {
    return 'creative_request';
  }

  if (text.match(/posso|guideline|pode|permitido|regra/)) {
    return 'guideline_question';
  }

  if (text.match(/onde salv|organiz|drive|arquivo/)) {
    return 'organization';
  }

  return 'general_chat';
}

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    const env = loadEnv();
    anthropicClient = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

/**
 * Handles media messages (video/audio) by delegating to the Legendador agent.
 * Called asynchronously — the acknowledgment is sent before this runs.
 */
export async function handleMediaMessage(
  message: Message,
  whatsappClient: WhatsAppClient,
): Promise<string> {
  return processMediaMessage(message, whatsappClient);
}

/**
 * Handles text messages via the Diretor agent (Claude Haiku).
 */
export async function handleMessage(message: Message): Promise<string> {
  const intent = classifyIntent(message);
  logger.info({ intent, from: message.from }, 'Message classified');

  const sessionId = message.from;

  // Infer active brand (3-layer: content > session > calendar > default)
  const { brand, source } = inferBrand(message.text ?? '', sessionManager.getBrand(sessionId));
  if (source === 'content' || source === 'calendar') {
    sessionManager.setBrand(sessionId, brand);
  }
  logger.info({ brand, source, from: message.from }, 'Brand inferred');

  // Guideline questions: delegate directly to Guardiao — no Claude call needed
  if (intent === 'guideline_question') {
    const answer = await handleGuidelineQuestion(message.text ?? '', brand);
    logger.info({ intent, from: message.from }, 'Guardiao handled guideline question');
    return answer;
  }

  // Briefer feedback (sim/nao after Friday message): delegate to Briefer
  if (intent === 'briefer_feedback') {
    const answer = handleFeedbackResponse(message.from, message.text ?? '');
    logger.info({ intent, from: message.from }, 'Briefer handled feedback response');
    return answer;
  }

  // Creative requests: delegate directly to Muse — no Claude Diretor call needed
  if (intent === 'creative_request') {
    const answer = await handleCreativeRequest(message.text ?? '', brand);
    logger.info({ intent, from: message.from }, 'Muse handled creative request');
    return answer;
  }

  // Organization requests: delegate directly to Organizador — uploads to Google Drive
  if (intent === 'organization') {
    const answer = await handleOrganization(message, brand);
    logger.info({ intent, from: message.from }, 'Organizador handled organization request');
    return answer;
  }

  const userContent = buildUserContent(message);
  const brandContext = buildBrandContext(brand, source);
  const intentContext = buildIntentContext(intent);
  const agentContext = getAgentContext(intent);

  // Build user message with brand, intent and agent context injected
  const userParts = [brandContext, intentContext, agentContext, userContent].filter(Boolean).join('\n');

  sessionManager.append(sessionId, 'user', userParts);

  const history = sessionManager.getHistory(sessionId);

  try {
    const client = getClient();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: history,
    });

    const reply =
      response.content[0]?.type === 'text'
        ? response.content[0].text
        : 'Opa, deu um erro aqui. Tenta de novo?';

    sessionManager.append(sessionId, 'assistant', reply);

    logger.info({ intent, from: message.from, tokens: response.usage }, 'Diretor responded');

    return reply;
  } catch (error) {
    logger.error({ error: String(error), from: message.from }, 'Claude API call failed');

    // Remove the failed user message to avoid poisoning context
    const currentHistory = sessionManager.getHistory(sessionId);
    currentHistory.pop();

    throw error;
  }
}
