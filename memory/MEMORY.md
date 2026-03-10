# MEMORY — Workspace AIOX (C:\Windows\system32)

## Preferências do Usuário

- **Idioma:** Português brasileiro — sempre
- **Explicações simples ao final** — encerrar com resumo informal, sem jargão técnico, usando analogias do dia a dia
- **Gabriel não programa** — toda implementação deve ser explicada em linguagem acessível
- **Gemini para escrita pesada** — conteúdo extenso, pesquisa aprofundada, documentos longos

## Repositórios

- **aiox-workspace** (GitHub: gabrielolio/aiox-workspace) — fonte da verdade, backup completo
- **claudio-core** (GitHub: gabrielolio/claudio-core, branch `claude/continue-king-config-uB5lS`) — KING system

## Estado do Framework

- Framework: Synkra AIOX v4.4.6 (renomeado de AIOS em 04/03/2026)
- Instalado em: `C:\Windows\System32\.aios-core\`
- Bug: `aios update` falha (`.minisig` ausente) — workaround: rsync via WSL

## Projeto KING — Sistema de Automação WhatsApp

**Objetivo:** Bot WhatsApp para Victor (social media Bamaq) automatizar produção de conteúdo Porsche + GWM

### 6 Agentes KING
| Agente | Função |
|--------|--------|
| Diretor | Classifica intenção e roteia para o agente certo |
| Legendador | Transcreve áudio/vídeo via Whisper + subtítulos |
| Briefer | PM do conteúdo: planeja semana, 3 mensagens semanais |
| Guardião | Valida conteúdo contra diretrizes das marcas |
| Muse | Geração de copy e sugestões criativas |
| Organizador | Arquivamento e sync com Google Drive |

### Stack KING
- TypeScript + better-sqlite3 (sem Redis — simplicidade)
- WhatsApp via Evolution API | Anthropic SDK + OpenAI SDK (Whisper)

### Status Stories KING
| Story | Status |
|-------|--------|
| 1.1 Setup | ✅ CONCLUÍDA |
| 1.2 Bot WhatsApp | ✅ CONCLUÍDA |
| 1.3 Diretor v0 | ✅ CONCLUÍDA |
| 2.1 SQLite | ✅ CONCLUÍDA |
| 2.2 Legendador | ✅ CONCLUÍDA |
| 3.1 Guardião | ✅ CONCLUÍDA |
| 3.2 Briefer MVP | ✅ CONCLUÍDA |
| 4.1 Muse | 🔄 Ready for Review |
| 4.2 Organizador | 🔄 Ready for Review |

### Decisão Arquitetural: Inferência de Marca (sem perguntar a Victor)
1. Calendário: Seg/Qua/Sex=Porsche, Ter/Qui=GWM (~70% acerto)
2. Conteúdo: Cayenne/911→Porsche, Tank/Haval→GWM (+20%)
3. Confirmação passiva na resposta (Victor corrige se errado)

## Envolvidos
| Pessoa | Papel |
|--------|-------|
| Gabriel | Fundador, visão estratégica |
| Victor (Vitor King) | Social media Bamaq (Porsche + GWM), usuário final do KING |
| Jucilene Diass | Cliente Fialho Motors (Campo Grande/MS, R$800-1.200/mês) |

## Hub Notion — Central da Agência

- Hub: "🏢 Central da Agência" — page_id: `31aff01f-f66b-8191-801d-fd2ca520d28f`
- Clientes DB — data-source: `e1253c21-a799-4d12-8f14-121608b80e25`
- Projetos DB — data-source: `63861429-1dc1-4f8f-929b-e80ae8dc0fb5`
- Tarefas AIOX DB — data-source: `8f7c65ac-7840-4c1d-b5fe-b098aeb1fff5`
- Squads — page_id: `31aff01f-f66b-8184-9440-db4173606aea`
- Base de Conhecimento — page_id: `31aff01f-f66b-81b1-9357-c097cb9a00c2`

## Base de Dados Alan Nicolas

- Localização: `knowledge-base/alan-nicolas/` — 90 dossiês
- Vídeos cobertos: p1d7jvT_fuw, gEUtUdqiAyk, Vgrs6EA4kCg, pqtLLYyztc8
- Limitação: YouTube bloqueia transcrição automática — usar botão "Transcrição" manualmente

## Configurações AIOX — Status

### ✅ IMPLEMENTADAS (05/03/2026)
- Journey Log: `.claude/hooks/journey-log.cjs` → `.aios/journey.log`
- Skills: `.claude/skills/` — skill-creator.md + pdf-to-markdown.md
- Hooks: synapse-engine.cjs + precompact-session-digest.cjs

### CRÍTICAS PENDENTES
- MCPs: nenhum — começar por ClickUp MCP (`@devops *add-mcp`)
- Open Router: não configurado (openrouter.ai)
- .env KING: ANTHROPIC_API_KEY, OPENAI_API_KEY, EVOLUTION_API_URL vazias

### ALTAS
- Workers: scripts determinísticos para 80% tarefas repetitivas
- Comando `handoff` entre agentes
- Número WhatsApp dedicado pro KING (decisão pendente)

### MÉDIAS
- Alias `brownfield-discovery`, calculadora de squads, agente noturno, task `review-de-tarefas`

## Fontes de Dados Externas

### Google Drive — Audios Fialho Motors
- **URL:** https://drive.google.com/drive/folders/1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY
- **Folder ID:** `1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY`
- **Conteudo:** Audios .m4a de conversas Gabriel + Vitor + Jucilene
- **Squad responsavel:** `intel` (`squads/intel/`)
- **Output:** `knowledge-base/conversas/`
- **Comando:** `*intel` (pipeline completo) ou `*sync` + `*transcribe`
- **Engine de transcricao:** Groq Whisper (modelo: whisper-large-v3, gratis)
- **Pre-requisitos locais:** gdown, groq SDK (`pip install groq`), ffmpeg opcional
- **API Key:** GROQ_API_KEY configurada no .env
- **Arquivo de teste:** `1PgGabx3m30BNeL4n2U_WCcoQHTXV7v6D` (pendente execucao local)
- **Adicionado:** 2026-03-10

## Materiais de Referência
- aitpl.com — repositório de agents/skills prontos
- openrouter.ai — roteador de LLMs (70-80% redução custo)
- coderabbit.ai — revisão automática de PRs
- Atomic Design (Brad Frost) — metodologia do agente ux-design-expert

## Knowledge-Base KING
- `knowledge-base/brands/` — gwm-brasil-2026.yaml, porsche-brasil-2026.yaml, PDFs Porsche
- `knowledge-base/clients/` — bamaq.yaml, fialho-motors.yaml
- `knowledge-base/profiles/` — vitor-king.yaml
- `knowledge-base/conversas/` — transcricoes de audios processados pelo squad intel
