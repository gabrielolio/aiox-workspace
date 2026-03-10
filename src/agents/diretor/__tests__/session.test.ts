import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SessionManager } from '../session.js';

describe('SessionManager', () => {
  let manager: SessionManager;

  beforeEach(() => {
    manager = new SessionManager();
  });

  afterEach(() => {
    manager.destroy();
  });

  it('returns empty history for unknown session', () => {
    expect(manager.getHistory('unknown')).toEqual([]);
  });

  it('appends messages and retrieves history', () => {
    manager.append('user1', 'user', 'oi');
    manager.append('user1', 'assistant', 'E ai!');
    expect(manager.getHistory('user1')).toEqual([
      { role: 'user', parts: [{ text: 'oi' }] },
      { role: 'model', parts: [{ text: 'E ai!' }] },
    ]);
  });

  it('clears session history', () => {
    manager.append('user1', 'user', 'oi');
    manager.clear('user1');
    expect(manager.getHistory('user1')).toEqual([]);
  });

  it('keeps separate sessions per sessionId', () => {
    manager.append('user1', 'user', 'msg from user1');
    manager.append('user2', 'user', 'msg from user2');
    expect(manager.getHistory('user1')).toHaveLength(1);
    expect(manager.getHistory('user2')).toHaveLength(1);
    expect(manager.getHistory('user1')[0]?.parts[0]?.text).toBe('msg from user1');
  });

  it('trims history to max 20 messages', () => {
    for (let i = 0; i < 25; i++) {
      manager.append('user1', 'user', `msg ${i}`);
    }
    const history = manager.getHistory('user1');
    expect(history.length).toBe(20);
    // Should keep the most recent messages
    expect(history[history.length - 1]?.parts[0]?.text).toBe('msg 24');
  });
});
