#!/usr/bin/env node
/**
 * activity-logger.cjs — Hook PostToolUse
 * Registra nome da tool usada e timestamp em .claude/logs/activity.log
 */

const fs = require('fs');
const path = require('path');

const toolName = process.env.CLAUDE_TOOL_NAME || 'unknown';
const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
const logDir = path.join(process.cwd(), '.claude', 'logs');
const logFile = path.join(logDir, 'activity.log');

try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  fs.appendFileSync(logFile, `${timestamp} | tool: ${toolName}\n`);
} catch (err) {
  // Silent fail — never block workflow
}

process.exit(0);
