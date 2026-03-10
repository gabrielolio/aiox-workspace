import type { Brand } from './brand.js';

const SESSION_TIMEOUT_MS = 30 * 60 * 1_000; // 30 minutes
const MAX_HISTORY = 20; // messages (user + assistant combined)
const CLEANUP_INTERVAL_MS = 5 * 60 * 1_000; // 5 minutes

type MessageParam = { role: 'user' | 'model'; parts: [{ text: string }] };

interface Session {
  history: MessageParam[];
  lastActivity: number;
  activeBrand: Brand | null;
}

export class SessionManager {
  private readonly sessions = new Map<string, Session>();
  private readonly cleanupTimer: ReturnType<typeof setInterval>;

  constructor() {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, CLEANUP_INTERVAL_MS);

    // Allow process to exit even if timer is active
    this.cleanupTimer.unref?.();
  }

  getHistory(sessionId: string): MessageParam[] {
    const session = this.sessions.get(sessionId);
    if (!session) return [];
    return session.history;
  }

  getBrand(sessionId: string): Brand | null {
    return this.sessions.get(sessionId)?.activeBrand ?? null;
  }

  setBrand(sessionId: string, brand: Brand): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.activeBrand = brand;
    }
  }

  append(sessionId: string, role: 'user' | 'assistant', content: string): void {
    let session = this.sessions.get(sessionId);

    if (!session) {
      session = { history: [], lastActivity: Date.now(), activeBrand: null };
      this.sessions.set(sessionId, session);
    }

    const geminiRole: 'user' | 'model' = role === 'assistant' ? 'model' : 'user';
    session.history.push({ role: geminiRole, parts: [{ text: content }] });
    session.lastActivity = Date.now();

    // Trim to max history (keep most recent messages)
    if (session.history.length > MAX_HISTORY) {
      session.history.splice(0, session.history.length - MAX_HISTORY);
    }
  }

  clear(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
        this.sessions.delete(id);
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupTimer);
    this.sessions.clear();
  }
}

export const sessionManager = new SessionManager();
