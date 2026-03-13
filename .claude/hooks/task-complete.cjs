#!/usr/bin/env node
/**
 * task-complete.cjs — Hook Stop
 * Notifica no terminal quando uma tarefa AIOX é concluída.
 */

const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
process.stdout.write(`\n✅ AIOX Task Complete: ${now}\n`);
process.exit(0);
