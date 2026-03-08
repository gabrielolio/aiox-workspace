import { describe, it, expect } from 'vitest';
import { getAgentContext } from '../router.js';

describe('getAgentContext', () => {
  it('returns Legendador stub for subtitle_request', () => {
    const ctx = getAgentContext('subtitle_request');
    expect(ctx).not.toBeNull();
    expect(ctx).toContain('Legendador');
  });

  it('returns Briefer stub for content_idea', () => {
    expect(getAgentContext('content_idea')).toContain('Briefer');
  });

  it('returns null for creative_request (Muse handles directly, no Claude context needed)', () => {
    expect(getAgentContext('creative_request')).toBeNull();
  });

  it('returns null for guideline_question (Guardiao handles directly, no Claude context needed)', () => {
    expect(getAgentContext('guideline_question')).toBeNull();
  });

  it('returns null for organization (Organizador handles directly, no Claude context needed)', () => {
    expect(getAgentContext('organization')).toBeNull();
  });

  it('returns null for general_chat (no specialist needed)', () => {
    expect(getAgentContext('general_chat')).toBeNull();
  });
});
