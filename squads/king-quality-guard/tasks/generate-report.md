# Task: generate-report

**Owner:** sentinel
**Trigger:** interno — ultimo passo do run-quality-check
**Output:** Relatorio formatado em markdown, em portugues simples

---

## Objetivo

Pegar todos os resultados dos checks e montar um relatorio claro, direto e em
portugues simples para Gabriel. Sem jargao tecnico. Com proximo passo claro.

---

## Formato do relatorio (VERSAO ENRIQUECIDA — inclui arquitetura, seguranca, observabilidade)

```markdown
## 🛡️ Relatorio de Qualidade — Story [ID]: [Titulo]
**Data:** [data-hora]   **Score geral:** [X]/10

**Status geral:** ✅ Tudo certo | ❌ Tem problemas | ⚠️ Verificacao manual necessaria

---

### ✅ Acceptance Criteria ([X] de [Total] satisfeitos)

✅ O Guardiao identifica a marca correta com base na pergunta
✅ O YAML da marca e lido e a informacao e buscada corretamente
❌ A consulta nao esta sendo registrada no banco de dados
   → src/agents/guardiao/responder.ts nao tem codigo de gravacao
⚠️ Resposta chegou no WhatsApp do Victor — verificar manualmente

---

### 💻 Codigo ([X erros] | Sem erros)

✅ TypeScript: sem erros de compilacao
❌ Qualidade: 2 problemas encontrados
   - kb-loader.ts:47 — campo 'subtitle_typography' nao existe no tipo esperado
   - responder.ts:12 — uso de 'any' sem justificativa (elimina protecao de tipos)
⚠️ Modo rigoroso do TypeScript nao esta ativado no tsconfig.json

---

### 🔗 Integracao

✅ Rota no Diretor configurada (router.ts:34)
✅ Arquivo principal do agente existe (index.ts)
⚠️ Importacao do modulo nao encontrada — verificar manualmente

---

### 🏛️ Arquitetura

Score: 7/10
✅ Estrutura por feature correta (src/agents/guardiao/)
✅ Separacao de camadas: index.ts → responder.ts → kb-loader.ts
⚠️ Funcao parseYaml() duplicada em kb-loader.ts e em outro arquivo — considerar extrair
❌ Configuracao do caminho dos YAMLs hardcoded em kb-loader.ts:8 — mover para env ou config

---

### 🔒 Segurança

✅ Sem credenciais hardcoded no codigo
✅ Path do YAML validado contra lista de marcas conhecidas
⚠️ npm audit encontrou 1 vulnerabilidade moderada em dependencia de terceiros

---

### 👁️ Observabilidade

✅ Logger estruturado em uso (pino)
⚠️ Sem correlation ID — dificil rastrear uma mensagem especifica nos logs
⚠️ Chamada para Claude API sem timeout configurado — pode travar se API cair

---

### Proximo passo

[UMA instrucao clara do que fazer agora, em portugues simples]

Exemplos:
- "Tudo certo! Marque os ACs como [x] na story e commit."
- "2 problemas criticos para corrigir antes de continuar: [lista]. Rodar *check depois."
- "Sem erros tecnicos. Verificar manualmente os itens ⚠️ e commitar se ok."
```

---

## Logica do "Proximo passo"

| Situacao | Proximo passo |
|----------|---------------|
| Todos ✅ | "Tudo certo! Marque os ACs como [x] na story e commit." |
| ❌ em segurança | "PARAR: problema de seguranca critico. Corrigir ANTES de qualquer deploy." |
| ❌ em ACs | "Corrigir: [listar ACs faltando]. Rodar *check novamente depois." |
| ❌ em codigo | "Corrigir erros de codigo em [lista arquivos:linha]. Rodar *check depois." |
| So ⚠️ | "Verificar manualmente: [listar os ⚠️]. Se ok, marque os ACs e commit." |
| Mix ❌ e ⚠️ | "Prioridade: corrigir ❌ primeiro (segurança > ACs > código > arquitetura)." |

## Prioridade de problemas (ordem de urgencia)

1. 🔴 Segurança crítica — BLOQUEADOR absoluto
2. 🔴 ACs não satisfeitos — funcionalidade incompleta
3. 🟡 Erros de código (TypeScript/lint) — antes do commit
4. 🟡 Problemas de arquitetura críticos — antes do merge
5. 🔵 Observabilidade faltando — importante mas não bloqueia
6. 🔵 Warnings de arquitetura — registrar para próxima iteração

---

## Regras de tom

- Falar diretamente com Gabriel: "Tudo certo!", "Tem um problema aqui:", etc.
- Nunca usar: "compilation failed", "assertion error", "null pointer", "undefined"
- Sempre usar: "erro de codigo", "arquivo nao encontrado", "conexao nao configurada"
- Ser encorajador quando tudo esta certo — Gabriel fez um bom trabalho
- Ser direto quando tem problema — sem rodeios, mas sem drama
