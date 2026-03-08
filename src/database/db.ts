import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from '../config/env.js';
import { logger } from '../config/logger.js';

let db: Database.Database | null = null;

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT    NOT NULL,
    type        TEXT    NOT NULL DEFAULT 'transcription',
    status      TEXT    NOT NULL DEFAULT 'pending',
    payload     TEXT,
    result      TEXT,
    error       TEXT,
    created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at  INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_jobs_session ON jobs(session_id);
  CREATE INDEX IF NOT EXISTS idx_jobs_status  ON jobs(status);

  CREATE TABLE IF NOT EXISTS weekly_feedback (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    week_number  INTEGER NOT NULL,
    year         INTEGER NOT NULL,
    item         TEXT    NOT NULL,
    confirmed    INTEGER NOT NULL DEFAULT 0,
    created_at   INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE INDEX IF NOT EXISTS idx_weekly_feedback_week
    ON weekly_feedback(year, week_number);

  CREATE TABLE IF NOT EXISTS uploads (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp  TEXT    NOT NULL,
    brand      TEXT    NOT NULL,
    type       TEXT    NOT NULL,
    drive_url  TEXT    NOT NULL,
    filename   TEXT    NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_uploads_brand ON uploads(brand);
`;

export function getDb(): Database.Database {
  if (db) return db;

  const env = loadEnv();
  const dbPath = env.DATABASE_URL;

  // Ensure parent directory exists
  const dir = path.dirname(path.resolve(dbPath));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL'); // Better concurrent read performance
  db.pragma('foreign_keys = ON');
  db.exec(SCHEMA);

  logger.info({ path: dbPath }, 'SQLite database ready');
  return db;
}

export type JobStatus = 'pending' | 'processing' | 'done' | 'failed';

export interface Job {
  id: number;
  session_id: string;
  type: string;
  status: JobStatus;
  payload: string | null;
  result: string | null;
  error: string | null;
  created_at: number;
  updated_at: number;
}

export function createJob(sessionId: string, type: string, payload?: object): number {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO jobs (session_id, type, payload) VALUES (?, ?, ?)',
  );
  const info = stmt.run(sessionId, type, payload ? JSON.stringify(payload) : null);
  return info.lastInsertRowid as number;
}

export function updateJob(
  id: number,
  status: JobStatus,
  result?: string,
  error?: string,
): void {
  const db = getDb();
  db.prepare(
    'UPDATE jobs SET status = ?, result = ?, error = ?, updated_at = unixepoch() WHERE id = ?',
  ).run(status, result ?? null, error ?? null, id);
}

export interface WeeklyFeedback {
  id: number;
  week_number: number;
  year: number;
  item: string;
  confirmed: number;
  created_at: number;
}

export function savePendingItem(weekNumber: number, year: number, item: string): void {
  getDb()
    .prepare(
      'INSERT INTO weekly_feedback (week_number, year, item, confirmed) VALUES (?, ?, ?, 0)',
    )
    .run(weekNumber, year, item);
}

export function confirmPendingItem(id: number, confirmed: boolean): void {
  getDb()
    .prepare('UPDATE weekly_feedback SET confirmed = ? WHERE id = ?')
    .run(confirmed ? 1 : 0, id);
}

export function getPendingItems(weekNumber: number, year: number): WeeklyFeedback[] {
  return getDb()
    .prepare(
      'SELECT * FROM weekly_feedback WHERE week_number = ? AND year = ? AND confirmed = 0 ORDER BY id',
    )
    .all(weekNumber, year) as WeeklyFeedback[];
}

export function countDoneJobsInWeek(weekStart: number, weekEnd: number): number {
  const result = getDb()
    .prepare(
      `SELECT COUNT(*) as count FROM jobs
       WHERE status = 'done'
         AND type = 'transcription'
         AND created_at >= ? AND created_at < ?`,
    )
    .get(weekStart, weekEnd) as { count: number };
  return result.count;
}

export interface Upload {
  timestamp: string;
  brand: string;
  type: string;
  drive_url: string;
  filename: string;
}

export function recordUpload(upload: Upload): void {
  getDb()
    .prepare(
      'INSERT INTO uploads (timestamp, brand, type, drive_url, filename) VALUES (?, ?, ?, ?, ?)',
    )
    .run(upload.timestamp, upload.brand, upload.type, upload.drive_url, upload.filename);
}
