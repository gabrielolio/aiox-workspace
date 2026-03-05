# MEMORY — Projeto AIOX (C:\Windows\system32)

## Preferências do Usuário

- **Gemini para escrita pesada** — usar Gemini (via subagente ou API) para tarefas de geração de conteúdo extenso, pesquisa aprofundada e escrita de documentos longos. Não gastar tokens Claude desnecessariamente nessas operações.
- **Idioma:** Português brasileiro
- **Explicações ao final de atividades** — sempre encerrar com resumo informal e simples, sem jargão técnico, usando analogias do dia a dia. O usuário não programa e precisa entender o que foi feito e por quê importa.

## Estado do Framework

- Framework: Synkra AIOX (renomeado de AIOS em 04/03/2026)
- Versão local: `4.4.6` (atualizada em 04/03/2026 via rsync manual do npm package)
- Package: `aios-core@4.4.6` (instalado globalmente)
- Diretório: `C:\Windows\system32\.aios-core\`
- Nota: `aios update` CLI tem bug de validação (`.minisig` ausente) — usar rsync via WSL como workaround

## Base de Dados Alan Nicolas

- Localização: `/Documents/Obsidian Vault/BASE DE DADOS/Alan Nicolas/DOSSIES/`
- 6 arquivos criados em 04/03/2026
- Vídeos cobertos: p1d7jvT_fuw, gEUtUdqiAyk, Vgrs6EA4kCg, pqtLLYyztc8
- Limitação: YouTube bloqueia transcrição automática — transcrições manuais via botão "Transcrição" no YouTube
- 21 configurações pendentes identificadas e priorizadas

## Hub Notion — Central da Agência

- Hub: "🏢 Central da Agência" — page_id: `31aff01f-f66b-8191-801d-fd2ca520d28f`
- Clientes DB — data-source: `e1253c21-a799-4d12-8f14-121608b80e25`
- Projetos DB — data-source: `63861429-1dc1-4f8f-929b-e80ae8dc0fb5` (relation → Clientes)
- Tarefas AIOX DB — data-source: `8f7c65ac-7840-4c1d-b5fe-b098aeb1fff5` (relation → Projetos)
- Squads — page_id: `31aff01f-f66b-8184-9440-db4173606aea`
- Base de Conhecimento — page_id: `31aff01f-f66b-81b1-9357-c097cb9a00c2`

## Configurações Críticas Pendentes (AIOX) — Fonte: Análise cruzada 4 vídeos primários

### CRÍTICAS ✅ IMPLEMENTADAS (05/03/2026)
- ✅ Journey Log: `.claude/hooks/journey-log.cjs` — PostToolUse (Bash/Write/Edit/Task) → `.aios/journey.log`
- ✅ Skills framework: `.claude/skills/` — skill-creator.md + pdf-to-markdown.md + README.md criados

### CRÍTICAS PENDENTES
- MCPs: nenhum configurado — começar por ClickUp MCP (via @devops `*add-mcp`)
- Open Router: não configurado — rotear via openrouter.ai (modificar synapse-engine ou settings)

### ALTAS
- Workers: implementar scripts determinísticos para 80% das tarefas repetitivas
- Comando `handoff` entre agentes
- Tradutor N8N → AIOX workflow

### MÉDIAS
- Alias `brownfield-discovery` atalho
- Calculadora de Squads
- Agente noturno (cron job)
- Task `review-de-tarefas`

## Materiais de Apoio dos Vídeos
- aitpl.com — repositório de agents/skills/comandos prontos
- openrouter.ai — roteador de LLMs
- coderabbit.ai — revisão automática de PRs
- Atomic Design (Brad Frost) — metodologia do agente ux-design-expert

## Arquivos KB Criados (04/03/2026)
- DOSSIE_PRIMARIO_p1d7jvT_fuw_20260205.md — Claude Code é Fácil (32k palavras)
- DOSSIE_PRIMARIO_gEUtUdqiAyk_20260212.md — AIOS Squad (42k palavras)
- DOSSIE_PRIMARIO_Vgrs6EA4kCg_20260219.md — R$86k Dev (40k palavras)
- DOSSIE_PRIMARIO_pqtLLYyztc8_20260304.md — AIOX Exército (40k palavras)
- ANALISE_CRUZADA_4_VIDEOS_20260304.md — gap analysis + plano implementação
- MATERIAIS_APOIO_VIDEOS_20260304.md — materiais mencionados nos vídeos
