# Status dos Frameworks — Auditoria 2026-03-10

## Resumo Executivo

| Framework | Status | Veredicto |
|-----------|--------|-----------|
| **AIOX (Synkra AIOS)** | Parcialmente instalado | Funciona via skills/hooks do Claude Code, mas `.aios-core` ausente |
| **Paperclip** | Nao encontrado | Nao existe no repositorio nem como dependencia |
| **Squads** | Configurados, nao executaveis remotamente | Scripts Python prontos, mas ambiente cloud bloqueia rede |
| **KING System** | Codigo presente, dependencias nao instaladas | `npm install` necessario + chaves API faltando |

---

## 1. O QUE FUNCIONA HOJE

### Claude Code + AIOX Integration
- **Skills carregadas e ativas:**
  - `pdf-to-markdown` — converte PDFs via OCR local
  - `skill-creator` — meta-skill para criar novas skills
- **Hooks operacionais:**
  - `journey-log.cjs` — loga toda execucao de tool em `.aios/journey.log` (FUNCIONANDO)
  - `synapse-engine.cjs` — carrega contexto do `.synapse/` no prompt (DEPENDE de `.aios-core/` ausente)
  - `precompact-session-digest.cjs` — digest antes de compact (DEPENDE de `.aios-core/` ausente)
- **Synapse (contexto persistente):**
  - `.synapse/constitution` — regras nao-negociaveis (PRESENTE)
  - `.synapse/global` — contexto da agencia (PRESENTE)
  - `.synapse/manifest` — flags de config (PRESENTE)
- **Memory:** `memory/MEMORY.md` — estado completo do projeto (PRESENTE e atualizado)
- **Rules:** 7 arquivos de regras em `.claude/rules/` (ATIVOS)
- **Journey Log:** `.aios/journey.log` — 36KB de auditoria acumulada (FUNCIONANDO)

### Agentes via Skills do Claude Code
Todos os 12 agentes AIOX estao registrados como skills invocaveis:
- `aios-master`, `architect`, `dev`, `qa`, `pm`, `po`, `sm`, `analyst`, `devops`, `ux-design-expert`, `data-engineer`, `squad-creator`

**Status:** Funcionam como "personas" do Claude Code (carregam prompt especializado). NAO sao agentes autonomos — dependem do Claude Code como executor.

### Squads Configurados
- **intel** — pipeline de transcricao (sync Drive → transcribe → extract insights)
- **king-quality-guard** — QA automatizado com 6 checks

**Status:** Configs YAML completas, scripts Python prontos, mas execucao real depende de rede externa (Google Drive, Groq API).

---

## 2. O QUE PRECISA DE CONFIGURACAO

### 2.1 `.aios-core/` — Framework Core AUSENTE

**Impacto:** 2 dos 3 hooks falham silenciosamente (synapse-engine e precompact)

**Causa:** O diretorio `.aios-core/` nao existe neste repositorio. No ambiente local (WSL2), ele estava em `C:\Windows\System32\.aios-core\`. Nunca foi commitado no repo.

**Solucao:**
```bash
# No WSL2 local:
npx aios-core install --quiet --force
# Ou, se renomeado:
npx aiox-core install --quiet --force
```

### 2.2 Chaves API no `.env`

| Variavel | Status | Necessaria para |
|----------|--------|-----------------|
| `GROQ_API_KEY` | PREENCHIDA | Squad intel (transcricao) |
| `GEMINI_API_KEY` | VAZIA | Core IA do KING |
| `EVOLUTION_API_KEY` | VAZIA | WhatsApp bot |
| `GOOGLE_CREDENTIALS_PATH` | Aponta para arquivo inexistente | Google Drive sync |
| `GOOGLE_DRIVE_FOLDER_ID` | VAZIA | Organizador |
| `VITOR_WHATSAPP` | VAZIA | Briefer |
| `ANTHROPIC_API_KEY` | AUSENTE DO .env | Nao listada mas referenciada no MEMORY |
| `OPENAI_API_KEY` | AUSENTE DO .env | Whisper alternativo |

### 2.3 Dependencias Node.js

```bash
npm install  # Nunca executado neste ambiente
```

Dependencias declaradas no `package.json`:
- `@google/generative-ai`, `better-sqlite3`, `googleapis`, `node-cron`, `pino`, `zod`
- DevDeps: `eslint`, `typescript`, `vitest`, `tsx`

### 2.4 Dependencias Python (Squad Intel)

```bash
pip install gdown groq  # Para download Drive + transcricao
```

### 2.5 MCPs (Model Context Protocol)

Nenhum MCP configurado. O MEMORY lista como pendencia critica:
- ClickUp MCP (gestao de tarefas)
- Notion MCP (hub operacional)

---

## 3. O QUE NAO FUNCIONA

| Item | Motivo | Severidade |
|------|--------|------------|
| Hook `synapse-engine.cjs` | Importa `.aios-core/core/synapse/runtime/hook-runtime.js` que nao existe | ALTA |
| Hook `precompact-session-digest.cjs` | Importa `.aios-core/hooks/unified/runners/precompact-runner.js` que nao existe | MEDIA |
| Squad intel (execucao) | Ambiente cloud sem acesso a rede externa (DNS bloqueado) | BLOQUEADO no cloud |
| Squad king-quality-guard | Sem codigo fonte em `src/` para auditar (KING nao instalado) | BLOQUEADO |
| KING System | `npm install` nunca rodou, chaves API vazias | BLOQUEADO |
| `.aios/project-status.yaml` | Mostra `isGitRepo: false`, dados desatualizados (fev/2026) | BAIXA |

---

## 4. ORDEM EXATA DE ACOES PARA DEIXAR TUDO OPERACIONAL

### Fase 1 — Ambiente Local (WSL2, maquina do Gabriel)

```bash
# 1. Instalar framework AIOX core
cd ~/aiox-workspace
npx aiox-core install --quiet --force
# Isso cria .aios-core/ com todos os runtimes

# 2. Instalar dependencias Node.js
npm install

# 3. Instalar dependencias Python
pip install gdown groq

# 4. Preencher .env com chaves reais
#    - GEMINI_API_KEY (obter em aistudio.google.com)
#    - EVOLUTION_API_KEY (da instancia Evolution API)
#    - GOOGLE_DRIVE_FOLDER_ID
#    - VITOR_WHATSAPP
```

### Fase 2 — Validar Hooks

```bash
# Testar se hooks carregam sem erro
node .claude/hooks/synapse-engine.cjs < /dev/null
node .claude/hooks/precompact-session-digest.cjs < /dev/null
node .claude/hooks/journey-log.cjs < /dev/null
```

### Fase 3 — Testar Squad Intel

```bash
# Baixar audio de teste do Drive
python3 squads/intel/scripts/download_drive.py 1PgGabx3m30BNeL4n2U_WCcoQHTXV7v6D --output /tmp/intel/teste-audio.m4a

# Transcrever
python3 squads/intel/scripts/transcribe.py /tmp/intel/teste-audio.m4a
```

### Fase 4 — Configurar MCPs

```bash
# Via Claude Code local:
# @devops *add-mcp clickup
# @devops *add-mcp notion
```

### Fase 5 — KING System (quando priorizado)

```bash
npm run typecheck   # Verificar tipos
npm run lint        # Verificar estilo
npm test            # Rodar testes
npm run dev         # Subir em modo desenvolvimento
```

---

## 5. SOBRE O PAPERCLIP

**Paperclip NAO esta presente no repositorio.** Nao foi encontrado como:
- Binario no PATH
- Pacote pip
- Pacote npm (local ou global)
- Arquivo em qualquer subdiretorio

Ver `docs/pendencias.md` para instrucoes detalhadas de instalacao.

---

*Auditoria realizada em 2026-03-10 por Claude Code (Opus 4.6)*
*Repositorio: gabrielolio/aiox-workspace*
