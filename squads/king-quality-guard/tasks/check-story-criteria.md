# Task: check-story-criteria

**Owner:** story-auditor
**Trigger:** interno (invocado por run-quality-check) ou `*audit [story-id]`
**Output:** Lista de criterios com status ✅/❌/⚠️

---

## Objetivo

Ler o arquivo de story, extrair cada item de Acceptance Criteria e verificar
se o codigo o satisfaz. Esta e a verificacao mais importante — os ACs sao a lei.

---

## Passos

### PASSO 1 — Ler a story

Usar Read tool para ler o arquivo completo da story.
Extrair todos os itens da secao `## Acceptance Criteria`.
Formato dos itens: `- [ ] texto` (nao concluido) ou `- [x] texto` (ja marcado)

### PASSO 2 — Para cada criterio, classificar o tipo

| Tipo | Exemplo | Como verificar |
|------|---------|----------------|
| **comportamental** | "Vitor manda duvida e recebe resposta" | ⚠️ manual |
| **estrutural** | "Arquivo src/agents/guardiao/index.ts existe" | Glob tool |
| **funcional** | "kb-loader le o YAML e busca info" | Read + Grep |
| **integracao** | "Diretor roteia para Guardiao" | Grep em router.ts |
| **dados** | "Consulta registrada no SQLite" | Grep por INSERT/db.run |

### PASSO 3 — Verificar cada criterio

**Para criterios estruturais:**
```
Glob: src/agents/guardiao/kb-loader.ts
SE existe → ✅
SE nao existe → ❌ "Arquivo src/agents/guardiao/kb-loader.ts nao foi criado"
```

**Para criterios funcionais:**
```
Read o arquivo correspondente
Procurar por codigo que implementa o criterio
SE encontrado com evidencia clara → ✅ "kb-loader.ts linha X: [trecho relevante]"
SE nao encontrado → ❌ "Nao encontrei codigo que [descricao do criterio]"
SE ambiguo → ⚠️ "Codigo existe mas nao consigo confirmar automaticamente"
```

**Para criterios comportamentais (requerem teste real):**
```
Sempre → ⚠️ "Verificar manualmente: [instrucao clara do que testar]"
```

### PASSO 4 — Retornar resultados

Retornar lista estruturada para run-quality-check consolidar no relatorio.

---

## Regras importantes

- Citar arquivo + linha quando encontrar evidencia (ex: `kb-loader.ts:47`)
- Nunca marcar ✅ por "achismo" — precisa de evidencia no codigo
- Se o item ja estiver marcado `[x]` na story mas o codigo nao confirmar → ❌
- Descrever problemas em portugues simples, sem jargao tecnico
