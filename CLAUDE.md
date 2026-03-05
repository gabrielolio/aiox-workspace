# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## PRINCÍPIOS DE VETERANO
*Destilado de +10.000 sessões reais de Claude Code*

### O Mantra
> "Never take the lazy path. Do the hard work now. The shortcut is forbidden."

Atalho hoje = debugging amanhã. Sem exceção.

### A Equação que Governa Tudo
**30 minutos de análise agora = 10 horas de debugging evitadas depois**

O trabalho da IA é devolver tempo ao humano:
- Análise sempre profunda e completa
- Relatórios que reduzem carga cognitiva do decisor
- Nunca otimizar para menos tokens às custas de profundidade

Atalhos criam dívida invisível. Dívida invisível cobra juros compostos.

---

### Gradiente de Permissão
```
READ     → Livre (faça sem perguntar)
MOVE     → Após aprovação de direção
CREATE   → Verificar se similar existe primeiro
DELETE   → SEMPRE confirmar
```
Aprovação de direção = execute até completar. Nunca "Quer que eu continue?" após aprovação já dada.

### A Regra do 2x
Se o usuário repetiu algo 2x → você não entendeu. PARE e faça EXATAMENTE o que foi pedido.

### Verificação Física Antes de Teoria
1. Arquivo existe onde o código espera? → `ls -la /caminho/exato/`
2. Servidor serve? → `curl -I http://localhost:PORT/path`
3. Usuário repetiu input 2x? → PARE, faça EXATAMENTE o que ele disse
4. Testou com hard refresh? → Cmd+Shift+R

### Leitura Completa ou Nada
NUNCA leia arquivos parcialmente. `Read(file, limit: 100)` + Edit = conflitos e quebras.

### Discovery Antes de Implementação
Antes de criar, verifique o que existe. Apresente findings no formato:
```
Existente: [o que já existe + stats]
Gap: [o que realmente falta]
Opções: 1. Estender | 2. Criar novo | 3. Não fazer nada
Recomendação: [número] porque [uma frase]
```

### Opções Antes de Implementação
NUNCA implemente direto. Apresente 3 opções com trade-offs, recomende uma, aguarde escolha.

### Determinismo Primeiro
Script/código > SQL > Regex > LLM. LLM é último recurso — apenas quando criatividade é necessária.

### Só o que Foi Pedido
```
FAÇA: Exatamente o que foi solicitado
NÃO FAÇA: "Também adicionei X já que estava mexendo"
```

### Debugging por Hipótese
Gere 3 hipóteses ordenadas por probabilidade. Para cada: como verificar + o que fazer se for. Confirme a causa antes de tentar consertar.

### O Fluxo
```
VERIFICAR → REUSAR → PRECISAR → SIMPLIFICAR → PRESERVAR → FOCAR → SILÊNCIO
```

---

## Project Overview

This is **Synkra AIOS** — an AI-Orchestrated System for full-stack development. The framework lives in `.aios-core/` (`@aios-fullstack/core` v4.31.1) and orchestrates specialized AI agents via Claude Code slash commands.

---

## Key Directories

```
.aios-core/            ← Framework core (Node.js package)
  core/synapse/        ← Synapse Engine (runs on every prompt via hook)
  core-config.yaml     ← Master project configuration
  constitution.md      ← Non-negotiable framework principles
  development/agents/  ← Agent source definitions (canonical)
.claude/
  commands/AIOS/agents/ ← Synced agent files (consumed by Claude Code)
  hooks/               ← synapse-engine.cjs (UserPromptSubmit), precompact-session-digest.cjs
  rules/mcp-usage.md   ← MCP governance rules
docs/
  stories/             ← Development stories (all work starts here)
  prd/, architecture/  ← Sharded PRD and architecture docs
  framework/           ← coding-standards.md, tech-stack.md, source-tree.md (auto-loaded for @dev)
.ai/                   ← Decision logs (ADR format)
.aios/project-status.yaml ← Auto-loaded on agent activation
outputs/minds/         ← PvMind context files
```

---

## Agent System

### Activation
- Agents: `@dev`, `@qa`, `@architect`, `@pm`, `@po`, `@sm`, `@analyst`, `@devops`, `@data-engineer`, `@ux-design-expert`, `@squad-creator`
- Master: `@aios-master`
- Agent commands use `*` prefix: `*help`, `*create-story`, `*task {name}`, `*workflow {name}`, `*exit`

### Agent Authority (from constitution — non-negotiable)

| Authority | Exclusive Agent |
|-----------|----------------|
| `git push` to remote | `@devops` only |
| Create Pull Requests | `@devops` only |
| Create releases/tags | `@devops` only |
| Create stories | `@sm` or `@po` only |
| Architecture decisions | `@architect` only |
| Quality verdicts | `@qa` only |
| MCP management (`*add-mcp`, `*list-mcps`) | `@devops` only |

---

## Development Workflow

All development is story-driven. The flow is:
```
@po/@sm creates story → @dev implements → @qa validates → @devops pushes/creates PR
```

Stories live in `docs/stories/`. When implementing:
1. Mark checkboxes as complete: `[ ]` → `[x]`
2. Keep the **File List** section updated in the story
3. Implement exactly what acceptance criteria specify — nothing more

---

## Quality Gates (constitution — non-negotiable)

Before any story is "Done":
```bash
npm run lint       # must pass without errors
npm run typecheck  # must pass without errors
npm test           # must pass without failures
npm run build      # must complete successfully
```

CodeRabbit pre-push review (via WSL):
```bash
wsl bash -c 'cd ${PROJECT_ROOT} && ~/.local/bin/coderabbit --prompt-only -t uncommitted'
```

---

## MCP Architecture

Docker MCP Toolkit gateway runs at `http://localhost:8080/mcp`.

**Always prefer native Claude Code tools over MCP** (see `.claude/rules/mcp-usage.md`):
- Read/write files → `Read`, `Write`, `Edit` tools
- Run commands → `Bash` tool
- Search → `Grep`, `Glob` tools
- Web search → EXA via `mcp__docker-gateway__web_search_exa`
- Library docs → Context7 via `mcp__docker-gateway__resolve-library-id`

Gateway health check: `curl http://localhost:8080/health`

---

## Hooks Architecture

Two active hooks in `.claude/hooks/`:

1. **`synapse-engine.cjs`** — fires on every `UserPromptSubmit`. Reads context from `.synapse/` directory, injects `<synapse-rules>` XML into the prompt. Delegates to `.aios-core/core/synapse/runtime/hook-runtime.js`. Silent exit if `.synapse/` missing.

2. **`precompact-session-digest.cjs`** — fires on `PreCompact`. Creates session digest before context compression. Delegates to `.aios-core/hooks/unified/runners/precompact-runner.js`.

---

## IDESync

Agent source files live in `.aios-core/development/agents/`. They are synced to multiple IDEs:
- Claude Code: `.claude/commands/AIOS/agents/` (format: full-markdown-yaml)
- Cursor: `.cursor/rules/agents/` (format: condensed-rules)
- Gemini: `.gemini/rules/AIOS/agents/`
- Codex: `.codex/agents/`
- GitHub Copilot: `.github/agents/`

**Edit agent definitions in `.aios-core/development/agents/`, then sync** — do not edit the IDE-specific copies directly.

---

## Constitution Non-Negotiables

From `.aios-core/constitution.md`:

- **CLI First**: Every feature must work 100% via CLI before any UI. Dashboards only observe, never control.
- **No Invention**: Every statement in specs must trace to a FR-*, NFR-*, or CON-* requirement. Never add unspecified features.
- **Story-Driven**: No code without an associated story.
- **Absolute Imports**: Use `@/` alias, not relative paths (`../../../`). Exception: imports within the same module.

---

## Project Configuration

`.aios-core/core-config.yaml` is the master config. Key paths derived from it:
- Stories: `docs/stories/`
- PRD: `docs/prd/` (sharded, pattern `epic-{n}*.md`)
- Architecture: `docs/architecture/` (sharded)
- Decision logs: `.ai/` (ADR format, index at `.ai/decision-logs-index.md`)
- Project status: `.aios/project-status.yaml`
- Tools: `.aios-core/tools/`
- Squads templates: `templates/squad/`
