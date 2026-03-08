# Task: run-quality-check

**Owner:** sentinel
**Trigger:** `*check [story-id]` ou `*check-all`
**Output:** Relatorio completo ✅/❌ em portugues simples
**Interrupcoes durante execucao:** NENHUMA — so fala no final

---

## Objetivo

Executar todos os checks de qualidade para uma story e retornar um relatorio consolidado.
Nunca interromper Gabriel durante a execucao — rodar tudo, reportar so no final.

---

## Passos

### PASSO 1 — Localizar a story

```
SE story-id fornecido:
  Buscar em docs/stories/ por arquivo com story-id no nome
  Ex: "3.1" → docs/stories/story-3.1-guardiao.md
  SE nao encontrar:
    Listar stories disponíveis e pedir qual usar
SE --all:
  Buscar todos os arquivos em docs/stories/ com Status: nao concluida
```

### PASSO 2 — Executar 6 checks (silenciosamente, sem interrupcoes)

Executar na ordem definida em squad.yaml config.check_order, sem perguntar confirmacao:

1. **check-story-criteria** — Acceptance Criteria da story vs codigo
2. **check-typescript** — TypeScript strict, erros, lint, qualidade de tipos
3. **check-integration** — Router Diretor, index.ts, imports, contratos entre modulos
4. **check-architecture** — Fowler: code smells, coupling, 3 camadas, configuracoes hardcoded
5. **check-security** — Hardcoded secrets, SQL injection, path traversal, npm audit
6. **check-observability** — Logging, correlation ID, error handling, DORA snapshot

Coletar resultados de cada check sem mostrar para o usuario ainda.
SE um check falhar com erro inesperado (ex: arquivo nao encontrado) → registrar como ⚠️ e continuar.

### PASSO 3 — Invocar generate-report

Passar todos os resultados para `generate-report.md` e exibir o relatorio final.

---

## Regras de comportamento

- **NUNCA** perguntar "quer que eu continue?" durante os passos 1-3
- **NUNCA** mostrar saidas tecnicas cruas (stack traces, erros de compilador em ingles, etc.)
- **SE** um check falhar com erro inesperado: registrar como `⚠️ check nao executado` e continuar
- **SO** falar com Gabriel quando o relatorio final estiver pronto

---

## Formato de coleta interna (uso interno do squad)

```yaml
check_results:
  story_id: "3.1"
  story_title: "Guardiao: Agente de Brand Guidelines"
  timestamp: "2026-03-06T14:30:00"
  squad_version: "2.0.0"

  # Check 1
  story_criteria:
    status: "⚠️"
    satisfied: 3
    total: 5
    items:
      - id: AC1
        text: "Vitor manda duvida e recebe resposta no WhatsApp"
        status: "⚠️"   # requer verificacao manual
      - id: AC2
        text: "Diretor detecta intencao guideline_query"
        status: "✅"
        detail: "router.ts:34 case 'guideline_query'"

  # Check 2
  typescript:
    status: "❌"
    error_count: 2
    strict_mode: false
    errors:
      - file: "kb-loader.ts"
        line: 47
        message_pt: "Campo 'subtitle_typography' nao existe no tipo esperado"

  # Check 3
  integration:
    status: "✅"
    checks: []

  # Check 4 (NOVO — v2.0)
  architecture:
    status: "⚠️"
    score: "7/10"
    issues: []

  # Check 5 (NOVO — v2.0)
  security:
    status: "✅"
    critical_issues: []

  # Check 6 (NOVO — v2.0)
  observability:
    status: "⚠️"
    logging_score: "3/5"
    issues: []

  # Score final
  overall: "❌"        # ✅ | ❌ | ⚠️
  score: "6/10"
```
