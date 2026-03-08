# Senior Developer Knowledge Base
# King Quality Guard Squad — Repertório de Referência
# Compilado de: pesquisa web + fontes primárias verificadas
# Data: 2026-03-06

---

## MARTIN FOWLER — ThoughtWorks

**Fonte:** martinfowler.com + Refactoring (2nd ed, 2018) + Patterns of Enterprise Application Architecture

### Princípios fundamentais

**Sobre arquitetura:**
> "Architecture is about the important stuff. Whatever that is."
— Martin Fowler

Arquitetura não é o diagrama mais bonito. É sobre quais decisões são difíceis de reverter
e quais delas importam para a evolução do sistema.

**Evolutionary Architecture:**
- Software é *soft* — deve poder ser mudado depois de entregue, não só antes
- O sistema está saudável quando pode ser modificado com segurança em passos pequenos
- Continuous Delivery + feedback loops rápidos transformam evolução de evento arriscado em hábito normal

**Refinement Code Review:**
- Revisões não devem acontecer só quando o código é adicionado
- Devem acontecer toda vez que o código é *lido* — porque problemas reais aparecem no uso
- Todo desenvolvedor que lê o código se torna um revisor

**Code Smells (Fowler, Refactoring):**

| Smell | O que é | Sinal de alerta |
|-------|---------|-----------------|
| Long Method | Função de 50+ linhas | Fazendo coisas demais |
| Feature Envy | Módulo que usa mais dados de outro do que os próprios | Acoplamento alto |
| Duplicate Code | Mesmo lógica em 3+ lugares | Candidato a extração |
| Magic Numbers | Números sem nome (ex: `if (status === 3)`) | Dificulta manutenção |
| Comments that explain *what* | Comentário descrevendo o que o código faz | Código não auto-explicativo |
| Primitive Obsession | Usar string/number onde deveria ter um tipo | Fragilidade de tipos |

---

## NODE.JS BEST PRACTICES — Yoni Goldberg

**Fonte:** github.com/goldbergyoni/nodebestpractices (100k+ stars, considerado o guia definitivo)

### Estrutura de projeto

```
✅ CORRETO: estrutura por feature (component-first)
src/
  agents/
    guardiao/
      index.ts        ← entry point
      responder.ts    ← domain logic
      kb-loader.ts    ← data access

❌ EVITAR: estrutura por tipo técnico
src/
  controllers/
    guardiao-controller.ts
  services/
    guardiao-service.ts
  repositories/
    guardiao-repository.ts
```

**Por quê?** Feature folders permitem que cada agente seja desenvolvido, testado e
implantado de forma independente. Estrutura por tipo cria acoplamento horizontal desnecessário.

### As 3 camadas obrigatórias

1. **Entry point** (index.ts): recebe input, valida, delega, retorna output
2. **Domain** (responder.ts, kb-loader.ts): lógica pura do negócio — sem HTTP, sem DB direto
3. **Data access**: tudo que acessa recursos externos (SQLite, YAML files, APIs)

**Regra de ouro:** Lógica de domínio NUNCA deve ter chamadas diretas ao banco.
A separação permite testar a lógica sem precisar do banco.

### TypeScript no Node.js

Goldbergyoni: *"Coding without type safety is no longer an option — but TypeScript
is also a double-edged sword that can encourage complexity with its ~50 keywords."*

- Use `strict: true` no tsconfig — sem exceção
- Evite `any` — se precisar de flexibilidade, use `unknown` com type guards
- Tipos avançados (conditional types, mapped types) só quando há necessidade real
- Interfaces para contratos entre módulos — são versionáveis e documentáveis

---

## MICROSOFT ENGINEERING PLAYBOOK

**Fonte:** microsoft.github.io/code-with-engineering-playbook

### Code Review Checklist (TypeScript)

**Type Safety — verificar sempre:**
- [ ] `any` usado? Justificado? Pode ser `unknown` com type guard?
- [ ] Type assertions (`as Foo`) — existe type guard correspondente?
- [ ] Funções exportadas têm tipo de retorno explícito?
- [ ] `null` e `undefined` tratados explicitamente?
- [ ] tsconfig com `strictNullChecks: true`?

**Testes — padrão AAA:**
- [ ] Arrange: preparação do cenário
- [ ] Act: execução da operação
- [ ] Assert: verificação do resultado
- [ ] Mocks têm tipos reais (não `any` ou `Partial<>` incompleto)?

**Tooling obrigatório:**
- ESLint + Prettier (consistência automática)
- Extensão TypeScript ESLint (`@typescript-eslint/eslint-plugin`)
- Husky para pre-commit hooks (garante que lint passa antes do commit)

---

## DORA METRICS — Google Research (2024-2025)

**Fonte:** dora.dev — pesquisa anual com 33.000+ profissionais

### As 5 métricas (nova 5ª métrica adicionada em 2025)

| Métrica | O que mede | Elite performers |
|---------|-----------|-----------------|
| Deployment Frequency | Com que frequência deploya | Múltiplas vezes/dia |
| Lead Time for Changes | Commit → produção | < 1 hora |
| Change Failure Rate | % deploys que causam falha | < 5% |
| Failed Deployment Recovery Time | Tempo para recuperar de falha | < 1 hora |
| **Reliability** *(novo 2025)* | Sistema atende seus SLOs? | 99.9%+ |

### Insight crítico de 2025

AI aumenta documentação +7.5%, qualidade de código +3.4%, velocidade de review +3.1%...
**mas reduz estabilidade de entrega em 7.2%.**

Conclusão: AI acelera o desenvolvimento mas exige mais testes e quality gates
para compensar a redução de estabilidade.

### Para o KING System (contexto real)

O KING ainda não tem deploy automatizado — está em desenvolvimento. As métricas DORA
relevantes agora são:

- **Lead Time**: quanto tempo da story pronta até funcionando no WhatsApp do Victor?
- **Change Failure Rate**: de cada 10 implementações, quantas precisam de correção?
- **Reliability**: quando o KING estiver em produção, fica disponível?

---

## OWASP TOP 10 — Vulnerabilidades mais comuns

**Adaptado para Node.js + SQLite + WhatsApp**

| # | Vulnerabilidade | No KING System |
|---|----------------|----------------|
| A01 | Broken Access Control | — |
| A02 | Cryptographic Failures | Credenciais da Claude API no .env — nunca no código |
| A03 | Injection | SQL injection em queries SQLite com input do usuário |
| A04 | Insecure Design | Path traversal no kb-loader (marca como input) |
| A05 | Security Misconfiguration | tsconfig sem strict, .env commitado |
| A06 | Vulnerable Components | Dependências desatualizadas (npm audit) |
| A09 | Security Logging Failures | Logs sem context, dados sensíveis em logs |

---

## OBSERVABILIDADE — Google SRE + Netflix

### Os 3 pilares (simplificado para KING)

1. **Logs** — o que aconteceu? (pino/winston, não console.log)
2. **Traces** — o que causou o problema? (correlation ID entre agentes)
3. **Metrics** — o sistema está saudável? (contadores, timers)

### Para o KING especificamente

O sistema recebe mensagens de WhatsApp e aciona agentes. Sem observabilidade:
- Victor manda mensagem, não recebe resposta — ninguém sabe onde travou
- Uma pergunta sobre Porsche vai para o Guardião via Diretor — sem trace, impossível debugar

Mínimo viável de observabilidade:
```
[messageId] Mensagem recebida do WhatsApp — {from, preview}
[messageId] Diretor detectou intenção: {intencao}
[messageId] Guardião acionado — buscando em {yaml_path}
[messageId] Resposta enviada — {chars} caracteres em {ms}ms
```

---

## FONTES E LINKS

- Martin Fowler: [martinfowler.com](https://martinfowler.com) | [Refinement Code Review](https://martinfowler.com/bliki/RefinementCodeReview.html)
- Node.js Best Practices: [github.com/goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices)
- Tao of Node: [alexkondov.com/tao-of-node](https://alexkondov.com/tao-of-node/)
- Microsoft Engineering Playbook: [microsoft.github.io/code-with-engineering-playbook](https://microsoft.github.io/code-with-engineering-playbook/code-reviews/recipes/javascript-and-typescript/)
- DORA Metrics: [dora.dev](https://dora.dev/guides/dora-metrics-four-keys/)
- DORA 5 Metrics (2025): [cd.foundation/blog/2025/10/16/dora-5-metrics](https://cd.foundation/blog/2025/10/16/dora-5-metrics/)
- TypeScript Code Review Guide: [kodus.io](https://kodus.io/en/typescript-code-review-guide/)
- Bito Code Review Checklist: [bito.ai](https://bito.ai/blog/code-review-checklist/)
