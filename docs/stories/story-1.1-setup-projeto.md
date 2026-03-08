# Story 1.1 — Setup do Projeto e Infraestrutura

**Sprint:** 1 (Fundacao)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @architect, @dev, @devops

---

## Descricao

Como desenvolvedor, preciso de um projeto Node.js/TypeScript configurado com todas as dependencias, linting, testes e estrutura de pastas para poder comecar a implementar os agentes do KING.

## Acceptance Criteria

- [x] package.json com dependencias definidas (Anthropic SDK, BullMQ, googleapis, zod, pino)
- [x] tsconfig.json com strict mode, path aliases (@/*, @agents/*, @services/*, @config/*)
- [x] Estrutura src/ com config/ (logger, env) e agents/diretor/
- [x] Validacao de env com zod (ANTHROPIC_API_KEY, EVOLUTION_API_URL, etc.)
- [x] ESLint configurado
- [x] npm install executado com sucesso
- [x] npm run typecheck passa sem erros
- [x] npm run dev inicia o servidor

## Notas Tecnicas

- Runtime: Node.js >= 20
- Module system: NodeNext (ESM)
- Test framework: Vitest
- Logger: Pino (com pino-pretty em dev)

## File List

- [x] package.json
- [x] tsconfig.json
- [x] src/index.ts
- [x] src/config/logger.ts
- [x] src/config/env.ts
- [x] eslint.config.js
