# Story 2.2 — Legendador: Transcricao e Entrega

**Sprint:** 2 (Legendador)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como Vitor, quero mandar um video ou audio pelo WhatsApp e receber de volta a legenda formatada, para que eu possa usar direto no conteudo sem ter que digitar nada.

## Acceptance Criteria

- [x] Vitor manda video/audio e recebe confirmacao imediata ("Recebi! Processando...")
- [x] Bot baixa a midia da Evolution API
- [x] Audio/video e enviado para a API Whisper da OpenAI
- [x] Transcricao retorna formatada em blocos de legendas para WhatsApp
- [x] Resposta final chega no WhatsApp do Vitor com a legenda completa
- [x] Erros de processamento retornam mensagem clara ao Vitor ("Nao consegui processar. Tenta de novo?")
- [x] Job registrado no SQLite com status final (done ou failed)

## Notas Tecnicas

- Evolution API: endpoint POST /chat/getBase64FromMediaMessage/{instance}
- OpenAI Whisper: endpoint POST https://api.openai.com/v1/audio/transcriptions
- Modelo Whisper: whisper-1, idioma: pt
- Formato de saida: blocos de ~45 chars por linha (padrao Instagram/TikTok)
- O Diretor envia a resposta — Legendador retorna o texto, Diretor envia via WhatsApp

## Dependencias

- Story 2.1 (SQLite setup)
- OPENAI_API_KEY configurada no .env

## File List

- [x] src/agents/legendador/transcriber.ts (download + Whisper API)
- [x] src/agents/legendador/formatter.ts (formatar legenda para WhatsApp)
- [x] src/agents/legendador/index.ts (agente principal)
- [x] src/agents/diretor/router.ts (substituir stub pelo Legendador real)
- [x] src/services/whatsapp/types.ts (adicionar campos para download de midia)
- [x] src/services/whatsapp/client.ts (metodo downloadMedia)
- [x] src/agents/diretor/index.ts (atualizar tipo Message para carregar info de midia)
