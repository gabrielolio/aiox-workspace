import type { Intent } from './index.js';

/**
 * Returns a context string injected into the Diretor's prompt when routing
 * to a specialized agent. These are stubs — future sprints will call the
 * real agent implementations and return their actual output.
 */
export function getAgentContext(intent: Intent): string | null {
  switch (intent) {
    case 'subtitle_request':
      // Stub: Legendador will transcribe video/audio and return subtitles
      return '[Legendador stub] Processando midia... (transcricao sera integrada no Sprint 2)';

    case 'briefer_feedback':
      // Handled directly in handleMessage — Briefer processes the sim/nao response
      return null;

    case 'content_idea':
      // Stub: Briefer will generate content ideas based on brand calendar
      return '[Briefer stub] Consultando calendario de conteudo... (briefing sera integrado no Sprint 2)';

    case 'creative_request':
      // Handled directly in handleMessage — Muse returns the answer before Claude is called
      return null;

    case 'guideline_question':
      // Handled directly in handleMessage — Guardiao returns the answer before Claude is called
      return null;

    case 'organization':
      // Handled directly in handleMessage — Organizador uploads to Google Drive
      return null;

    case 'general_chat':
      // No specialist needed — Diretor handles directly
      return null;
  }
}
