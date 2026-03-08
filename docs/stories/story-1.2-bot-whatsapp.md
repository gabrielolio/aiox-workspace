# Story 1.2 — Bot WhatsApp Basico

**Sprint:** 1 (Fundacao)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como Vitor, quero enviar uma mensagem no WhatsApp e receber uma resposta do KING, para que eu possa interagir com o sistema pelo canal que ja uso no dia a dia.

## Acceptance Criteria

- [x] Conexao com Evolution API estabelecida
- [x] Bot recebe mensagens de texto
- [x] Bot recebe mensagens de midia (imagem, video, audio)
- [x] Bot envia mensagens de texto de volta
- [x] Bot envia mensagens de midia de volta
- [x] Reconexao automatica em caso de queda
- [x] Logs estruturados de todas as mensagens (pino)

## Notas Tecnicas

- Evolution API como gateway WhatsApp
- Webhook para receber mensagens
- Retry com backoff exponencial em falhas de envio
- Nao armazenar conteudo de midia em log (privacidade)

## Dependencias

- Story 1.1 (setup do projeto)
- Evolution API rodando (local ou cloud)
- Numero WhatsApp dedicado pro KING

## File List

- [x] src/services/whatsapp/client.ts
- [x] src/services/whatsapp/webhook.ts
- [x] src/services/whatsapp/types.ts
