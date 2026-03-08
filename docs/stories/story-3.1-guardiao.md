# Story 3.1 — Guardiao: Agente de Brand Guidelines

**Sprint:** 3 (Guardiao + Briefer MVP)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como Vitor, quero perguntar pelo WhatsApp sobre as regras das marcas (Porsche ou GWM) e receber uma resposta direta baseada nos guidelines oficiais, para que eu nao precise abrir PDFs ou planilhas no meio do fluxo de trabalho.

## Acceptance Criteria

- [x] Vitor manda uma duvida sobre marca (ex: "posso usar fundo branco no Porsche?" ou "que fonte uso na legenda do Tank 300?")
- [x] O Diretor detecta intencao de consulta de guideline e aciona o Guardiao
- [x] O Guardiao identifica a marca correta (Porsche ou GWM) com base no contexto da pergunta
- [x] O Guardiao le o YAML da marca em knowledge-base/brands/ e busca a informacao relevante
- [x] Resposta chega no WhatsApp do Vitor com a informacao extraida do YAML
- [x] Se a informacao nao estiver no YAML, responde: "Nao tenho essa info — confirma com o briefing oficial"
- [x] O Guardiao nao inventa informacoes — so responde o que esta no YAML
- [x] Consulta registrada no SQLite (tipo: guideline_query, marca, pergunta resumida, timestamp)

## Notas Tecnicas

- Knowledge base: knowledge-base/brands/porsche-brasil-2026.yaml e gwm-brasil-2026.yaml
- Os YAMLs ja contem: restricoes, permissoes, tipografia de legendas (subtitle_typography), tons de voz
- Inferencia de marca: usar mesma logica do Diretor (calendario + palavras-chave)
- O Guardiao nao usa Claude API para responder — le o YAML e formata a resposta diretamente
- Excecao: perguntas abertas ou ambiguas podem usar Claude para interpretar o YAML e formatar
- O Diretor roteara para o Guardiao quando detectar palavras como: "posso", "pode", "permitido", "guideline", "regra", "fonte", "cor", "logo", "tipografia"

## Dependencias

- Story 1.3 (Agente Diretor com router)
- Story 2.1 (SQLite para registro de consultas)
- YAMLs de marca atualizados com subtitle_typography (concluido em 2026-03-06)

## File List

- [x] src/agents/guardiao/kb-loader.ts (carrega e parseia YAMLs de knowledge-base/brands/)
- [x] src/agents/guardiao/responder.ts (busca informacao no YAML e formata resposta — fast path + Claude fallback)
- [x] src/agents/guardiao/index.ts (agente principal — recebe pergunta, retorna resposta, registra no SQLite)
- [x] src/agents/diretor/router.ts (guideline_question retorna null — Guardiao assume diretamente)
- [x] src/agents/diretor/index.ts (intercepta guideline_question antes do Claude, delega ao Guardiao)
- [x] src/agents/diretor/__tests__/router.test.ts (teste atualizado para novo comportamento)
