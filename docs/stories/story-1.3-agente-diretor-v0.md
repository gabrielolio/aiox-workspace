# Story 1.3 — Agente Diretor v0

**Sprint:** 1 (Fundacao)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como Vitor, quero que o KING entenda o que eu quero quando mando uma mensagem (legenda, ideia, duvida de guidelines, etc.) e me responda de forma natural, para que eu sinta que estou conversando com um parceiro criativo.

## Acceptance Criteria

- [x] Classificador de intencao funcional (6 intents: subtitle_request, content_idea, creative_request, guideline_question, organization, general_chat)
- [x] Integracao com Claude API para respostas contextuais
- [x] System prompt do Diretor com persona definida (tom informal, motivador)
- [x] Memoria de sessao (contexto da conversa atual)
- [x] Roteamento para agentes especializados (stubs por enquanto)
- [x] Resposta consolidada ao Vitor via WhatsApp

## Notas Tecnicas

- Classificacao de intencao: regex basico (v0), Claude API (v1)
- Persona do Diretor definida em docs/agents/diretor.yaml
- Stubs para agentes especializados (retornam mensagem padrao)
- Timeout de sessao: 30 minutos de inatividade

## Dependencias

- Story 1.2 (bot WhatsApp)
- Claude API key configurada
- docs/agents/diretor.yaml (persona)

## File List

- [x] src/agents/diretor/index.ts (classificador de intencao)
- [x] src/agents/diretor/router.ts (roteamento para agentes)
- [x] src/agents/diretor/prompt.ts (system prompt + persona)
- [x] src/agents/diretor/session.ts (memoria de conversa)
