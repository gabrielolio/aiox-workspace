# Task: check-integration

**Owner:** sentinel
**Trigger:** interno (invocado por run-quality-check)
**Output:** ✅ integracao ok | ❌ pontos faltando (em portugues)

---

## Objetivo

Verificar se os novos modulos estao corretamente conectados ao resto do sistema KING.
Os pontos de integracao criticos do KING System sao conhecidos e sao sempre verificados.

---

## Pontos de integracao criticos do KING System

### 1. Router do Diretor (src/agents/diretor/router.ts)
- Cada novo agente precisa de uma rota no Diretor
- Verificar: o novo agente esta no switch/case ou mapa de intencoes?

### 2. Registro no SQLite (src/db/ ou similar)
- Agentes que gravam dados precisam de chamada ao banco
- Verificar: existe codigo de INSERT ou chamada ao SQLite para o novo agente?

### 3. Exports e imports
- Novos arquivos precisam ser exportados pelo index.ts do modulo
- Verificar: o novo arquivo esta sendo importado onde e usado?

### 4. Entry point do agente (index.ts)
- Cada agente precisa de um index.ts que exporta a funcao principal
- Verificar: src/agents/[novo-agente]/index.ts existe?

---

## Passos

### PASSO 1 — Identificar novos arquivos da story

Ler a secao `## File List` do arquivo de story para saber quais arquivos foram criados.

### PASSO 2 — Para cada novo agente, verificar integracao

**Verificar rota no Diretor:**
```
Grep em src/agents/diretor/router.ts por nome do agente
SE encontrado → ✅
SE nao encontrado → ❌ "O Diretor nao tem rota configurada para o [nome-agente]"
```

**Verificar index.ts:**
```
Glob: src/agents/[novo-agente]/index.ts
SE existe → ✅
SE nao existe → ❌ "Falta o arquivo principal (index.ts) do agente [nome-agente]"
```

**Verificar imports onde e usado:**
```
Grep no codebase pelo nome do modulo
SE tem pelo menos uma importacao no local correto → ✅
SE nao tem → ❌ "O modulo [nome] foi criado mas nao esta sendo importado em nenhum lugar"
```

### PASSO 3 — Retornar resultado

```yaml
integration_result:
  status: "✅" | "❌" | "⚠️"
  checks:
    - name: "Rota no Diretor"
      status: "✅" | "❌"
      detail: "router.ts:34 tem case 'guideline_query'"
    - name: "index.ts do agente"
      status: "✅" | "❌"
      detail: "src/agents/guardiao/index.ts existe"
    - name: "Import no local correto"
      status: "⚠️"
      detail: "Nao encontrei importacao — verificar manualmente"
```
