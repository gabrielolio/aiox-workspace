#!/usr/bin/env node
/**
 * Journey Log Hook — PostToolUse
 *
 * Logs every tool execution to .aios/journey.log for full auditability.
 * Part of AIOX gap implementation: "Journey Log" (CRÍTICA priority).
 *
 * Format: ISO_TIMESTAMP | SESSION | TOOL     | DETAIL
 * Exit 0 always — never blocks operations.
 */
'use strict';

const fs = require('fs');
const path = require('path');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch { resolve({}); }
    });
    process.stdin.on('error', () => resolve({}));
  });
}

async function main() {
  const input = await readStdin();
  const { tool_name, tool_input, session_id, cwd } = input;

  if (!tool_name) return;

  const projectRoot = cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const logDir = path.join(projectRoot, '.aios');
  const logFile = path.join(logDir, 'journey.log');

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  } catch {
    return;
  }

  const timestamp = new Date().toISOString();
  const sessionShort = session_id ? String(session_id).substring(0, 8) : '--------';

  let detail = '';
  if (tool_name === 'Bash') {
    detail = (tool_input?.command || '').substring(0, 160).replace(/\n/g, ' ').trim();
  } else if (tool_name === 'Write' || tool_name === 'Edit') {
    detail = tool_input?.file_path || tool_input?.path || '';
  } else if (tool_name === 'Read') {
    detail = tool_input?.file_path || '';
  } else if (tool_name === 'Glob') {
    detail = `pattern=${tool_input?.pattern || ''} path=${tool_input?.path || ''}`;
  } else if (tool_name === 'Grep') {
    detail = `"${(tool_input?.pattern || '').substring(0, 60)}" in ${tool_input?.path || '.'}`;
  } else if (tool_name === 'Task') {
    detail = `[subagent] ${(tool_input?.description || tool_input?.prompt || '').substring(0, 100)}`;
  } else {
    detail = JSON.stringify(tool_input || {}).substring(0, 100);
  }

  const entry = `${timestamp} | ${sessionShort} | ${(tool_name || 'UNKNOWN').padEnd(8)} | ${detail}\n`;

  try {
    fs.appendFileSync(logFile, entry, 'utf8');
  } catch {
    /* silent fail — never block tool usage */
  }
}

main().catch(() => process.exit(0));
