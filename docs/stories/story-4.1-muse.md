# Story 4.1 — Muse: Consultor Criativo

**Status:** Ready for Review

**Executor:** @dev
**Quality Gate:** @qa

---

## Story

**As a** Vitor (produtor de conteúdo),
**I want** receber ideias criativas e roteiros diferenciados quando pedir ao KING,
**so that** eu não fique travado na mesma fórmula de conteúdo e entregue posts que saem do óbvio para o Porsche e GWM.

---

## Acceptance Criteria

1. Vitor manda uma mensagem com pedido criativo (ex: "me dá uma ideia diferente pra Porsche", "preciso de um roteiro pro Tank 300", "tô sem ideia pra hoje")
2. O Diretor detecta a intenção `creative_request` e chama o Muse
3. O Muse identifica a marca relevante (Porsche ou GWM) a partir do texto ou do contexto da sessão
4. O Muse gera entre 2 e 3 opções de ideias/roteiros — cada uma com: título curto, formato sugerido (Reel, Stories, Post foto), e descrição de 2-4 linhas
5. A resposta chega no WhatsApp do Vitor formatada de forma legível (com emojis e separadores visuais)
6. Se nenhuma marca for identificada, o Muse pede clareza: "Qual marca? Porsche ou GWM?"
7. O Muse usa contexto da semana atual (dia da semana, marca do dia no calendário Bamaq) para tornar as ideias mais relevantes

---

## Tasks / Subtasks

- [x] Criar arquivo `src/agents/muse/index.ts` com a função `handleCreativeRequest(question, brand, weekContext)`
  - [x] Recebe a pergunta do Vitor, brand inferida e contexto da semana
  - [x] Chama Claude API com system prompt do Muse
  - [x] Retorna string formatada com 2-3 ideias
- [x] Criar `src/agents/muse/prompt.ts` com o system prompt do personagem Muse
  - [x] Tom: consultor criativo, direto, cheio de referências do segmento automotivo
  - [x] Instrução para gerar ideias fora do óbvio, mas viáveis para um produtor solo
  - [x] Instrução para usar o formato WhatsApp (sem markdown, com emojis e quebras de linha)
- [x] Criar `src/agents/muse/week-context.ts` com lógica para calcular contexto da semana
  - [x] Dia da semana atual → marca do calendário Bamaq (Porsche: seg/qua/sex | GWM: ter/qui)
  - [x] Exportar `getWeekContext(): { dayOfWeek: string; brandOfDay: BrandName | null; weekNumber: number }`
- [x] Integrar Muse no Diretor (`src/agents/diretor/index.ts`)
  - [x] Importar `handleCreativeRequest` do Muse
  - [x] No bloco `creative_request` do `handleMessage`, chamar o Muse antes de passar para Claude
  - [x] Substituir o stub no `router.ts` pelo retorno real do Muse
- [x] Atualizar `src/agents/diretor/router.ts`
  - [x] Remover o stub `[Muse stub]` do case `creative_request`
  - [x] Retornar `null` (o Muse será chamado diretamente no `handleMessage`, como o Guardião)

---

## Dev Notes

### Estrutura de pastas esperada

```
src/agents/
  muse/
    index.ts          ← ponto de entrada, função handleCreativeRequest()
    prompt.ts         ← system prompt do Muse
    week-context.ts   ← lógica do calendário Bamaq
```

### Padrão de integração — seguir o Guardião

O Guardião (`src/agents/guardiao/index.ts`) é o modelo de referência:
- É chamado diretamente no `handleMessage` do Diretor (não via `getAgentContext`)
- Recebe a pergunta e o brand da sessão
- Retorna uma string pronta para enviar ao WhatsApp
- Erros retornam mensagem amigável ao usuário

Ver como o Guardião está integrado em `src/agents/diretor/index.ts`:
- Import no topo: `import { handleGuidelineQuestion } from '../guardiao/index.js'`
- Chamada condicional no fluxo de `handleMessage` antes de chamar o Claude

### Calendário Bamaq (lógica de marca do dia)

```
Segunda → Porsche
Terça   → GWM
Quarta  → Porsche
Quinta  → GWM
Sexta   → Porsche
Sáb/Dom → sem marca definida
```

### Formato de resposta esperado (WhatsApp)

```
🎨 *3 ideias pra você hoje:*

1️⃣ *Título da ideia*
Formato: Reel 30s
O quê: Descrição breve do conceito em 2-3 linhas. Precisa ser viável pra um produtor solo.

2️⃣ *Título da segunda ideia*
Formato: Stories
O quê: Descrição breve...

3️⃣ *Título da terceira ideia*
Formato: Post foto
O quê: Descrição breve...
```

### Claude API — já configurado no projeto

O cliente Anthropic já existe em `src/agents/diretor/index.ts`. O Muse deve instanciar o seu próprio cliente da mesma forma:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { loadEnv } from '../../config/env.js';

const client = new Anthropic({ apiKey: loadEnv().ANTHROPIC_API_KEY });
```

### Brand inference

A lógica de inferir marca pelo texto já existe em `src/agents/guardiao/kb-loader.ts` → `inferBrandFromText()`. O Muse pode reutilizá-la.

### Testing

- Pasta de testes: seguir convenção do projeto (ao lado dos arquivos ou em `__tests__/`)
- Testar: inferência de marca, cálculo do `week-context`, e que a função `handleCreativeRequest` retorna string não-vazia

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-07 | 1.0 | Story criada | River (sm) |

---

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
Sem issues — implementação direta seguindo padrão do Guardião.

### Completion Notes
- `handleCreativeRequest` recebe `(question, sessionBrand)` — o `weekContext` é calculado internamente, não passado como parâmetro, para manter a interface simples
- Brand inference: texto da pergunta tem prioridade sobre sessionBrand (mesmo padrão do Guardião)
- Teste existente no router atualizado: `creative_request` agora retorna `null` (não stub)
- 64/64 testes passando

### File List
- `src/agents/muse/index.ts` (criado)
- `src/agents/muse/prompt.ts` (criado)
- `src/agents/muse/week-context.ts` (criado)
- `src/agents/muse/__tests__/index.test.ts` (criado)
- `src/agents/muse/__tests__/week-context.test.ts` (criado)
- `src/agents/diretor/index.ts` (modificado — import + bloco creative_request)
- `src/agents/diretor/router.ts` (modificado — stub removido)
- `src/agents/diretor/__tests__/router.test.ts` (modificado — teste atualizado para null)

---

## QA Results

*(preenchido pelo @qa após revisão)*
