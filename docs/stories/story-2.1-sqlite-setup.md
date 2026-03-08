# Story 2.1 — Setup SQLite e Remocao do Redis

**Sprint:** 2 (Legendador)
**Status:** [x] Concluida
**Prioridade:** CRITICA (bloqueante para todo o Sprint 2)
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como desenvolvedor do KING, preciso remover a dependencia do Redis (bullmq + ioredis) e substituir por SQLite como unico banco de dados, para que o sistema seja mais simples, robusto e sem servicos externos desnecessarios.

## Acceptance Criteria

- [x] bullmq e ioredis removidos do package.json
- [x] better-sqlite3 instalado como dependencia
- [x] Diretorio ./data/ criado para o arquivo king.db
- [x] Schema inicial do banco criado (tabela jobs)
- [x] Camada de banco exporta funcao getDb() reutilizavel
- [x] REDIS_URL removido do env.ts
- [x] Testes passando apos as mudancas (50 testes passing)

## Notas Tecnicas

- better-sqlite3 e sincrono — nao usa async/await, o que simplifica o codigo
- A tabela jobs guarda o estado de processamento de midia (pending, processing, done, failed)
- O arquivo do banco fica em ./data/king.db (criado automaticamente se nao existir)

## Dependencias

- Story 1.1 (setup do projeto)

## File List

- [x] package.json (remover bullmq/ioredis, adicionar better-sqlite3)
- [x] src/database/db.ts (conexao e schema)
- [x] src/config/env.ts (remover REDIS_URL)
