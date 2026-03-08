# King Quality Guard

> Squad de qualidade autonomo para o KING System.
> Voce implementa. A gente confere. Sem perguntas no meio.

## O que e isso?

O King Quality Guard e um squad de agentes AIOS que roda automaticamente
no final de cada implementacao do KING System e entrega um laudo completo
em portugues simples — sem interromper Gabriel no meio do trabalho.

## Como usar

```
@sentinel *check story-3.1
```

So isso. O squad faz o resto e volta com o relatorio.

## Comandos disponiveis

| Comando | O que faz |
|---------|-----------|
| `@sentinel *check [story-id]` | Quality check completo para uma story |
| `@sentinel *check-all` | Roda para todas as stories nao concluidas |
| `@sentinel *audit [story-id]` | Verifica so os Acceptance Criteria (sem check de codigo) |
| `@sentinel *status` | Historico de checks desta sessao |

## O que o squad verifica

1. **Acceptance Criteria** — cada criterio da story contra o codigo real
2. **Codigo** — erros de TypeScript e lint, em portugues simples
3. **Integracao** — se os novos modulos estao conectados ao sistema

## Agentes

- **Sentinel** (lider) — orquestra tudo e entrega o relatorio
- **Story Auditor** — especialista em Acceptance Criteria

## Estrutura

```
squads/king-quality-guard/
├── squad.yaml              ← Manifest do squad
├── README.md               ← Este arquivo
├── agents/
│   ├── sentinel.md         ← Agente lider
│   └── story-auditor.md    ← Especialista em ACs
├── tasks/
│   ├── run-quality-check.md       ← Ponto de entrada
│   ├── check-story-criteria.md    ← Verifica ACs
│   ├── check-typescript.md        ← Verifica codigo
│   ├── check-integration.md       ← Verifica integracao
│   └── generate-report.md         ← Gera relatorio
└── checklists/
    └── story-dod.md               ← Definition of Done
```
