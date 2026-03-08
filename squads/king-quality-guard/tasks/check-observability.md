# Task: check-observability

**Owner:** architect-reviewer
**Trigger:** interno (invocado por run-quality-check)
**Output:** Análise de observabilidade — conseguimos saber o que está acontecendo no sistema?

---

## Objetivo

Verificar se o sistema tem visibilidade suficiente para operar. Um sistema sem
observabilidade é como um carro sem painel — você só descobre o problema quando para.

Baseado em práticas de times de elite (Netflix, Uber, Google SRE) e DORA metrics
(reliability como 5a métrica, 2025).

---

## Conceito central para Gabriel

**Observabilidade** = conseguir responder "o que está acontecendo agora?" sem precisar
parar o sistema e olhar o código. É o painel do carro: velocidade, temperatura, combustível.

No KING System, isso significa:
- Saber quando uma mensagem chegou e foi processada
- Saber quando um agente falhou e por quê
- Saber quanto tempo cada operação está levando
- Conseguir reproduzir um problema que aconteceu ontem

---

## CHECKLIST 1 — Logging

### 1.1 Logs estruturados (não só console.log)
```
Verificar: o sistema usa um logger estruturado? (pino, winston, bunyan)
console.log simples NÃO É logging — não tem nível, não tem contexto, não é filtrável

✅ = logger estruturado configurado
⚠️ = mistura de console.log e logger → padronizar
❌ = só console.log no sistema inteiro
```

### 1.2 Níveis de log adequados
```
Verificar uso correto de: error, warn, info, debug
- error: problemas que precisam de ação imediata
- warn: situação inesperada mas recuperável
- info: eventos importantes do fluxo normal
- debug: detalhes para debugging (não deve ir para produção)

⚠️ = não há distinção de níveis — tudo em info ou console.log
✅ = níveis usados de forma consistente
```

### 1.3 Contexto nos logs
```
Grep por logger.error/logger.warn
Verificar se os logs incluem: agente responsável, story/operação em curso, timestamp implícito

✅ = logs com contexto suficiente para debugar sem o código
⚠️ = logs sem contexto ("Error occurred" sem detalhes)
```

---

## CHECKLIST 2 — Rastreabilidade de Operações

### 2.1 Request ID / Correlation ID
```
Quando Victor manda uma mensagem no WhatsApp, essa mensagem tem um ID único
que atravessa TODOS os agentes que a processam?

✅ = ID único (messageId ou correlationId) propagado entre agentes
⚠️ = sem ID de correlação — difícil rastrear uma mensagem específica nos logs
```

### 2.2 Registro de operações no SQLite
```
Verificar se as operações críticas são registradas:
- Mensagem recebida do WhatsApp
- Agente acionado (Diretor → Guardião)
- Resposta enviada
- Erros/falhas

✅ = operações críticas registradas no banco com timestamp
⚠️ = registro parcial — alguns agentes logam, outros não
❌ = sem registro — impossível saber o que aconteceu
```

---

## CHECKLIST 3 — Tratamento de Erros (DORA: Recovery Time)

### 3.1 Erros não tratados
```
Grep por funções async sem try/catch
Em Node.js, uma Promise rejeitada sem handler pode crashar o processo

❌ = função async em [arquivo:linha] sem tratamento de erro
✅ = todas as operações async têm tratamento de erro
```

### 3.2 Graceful degradation
```
Se o Claude API estiver fora do ar, o sistema:
a) Trava completamente → ❌
b) Responde com mensagem de fallback → ✅
c) Tenta de novo com backoff → ✅ (melhor)

Verificar: há fallback para dependências externas (Claude API, Evolution API)?
⚠️ = sem fallback detectado — o sistema pode travar se API externa falhar
```

### 3.3 Timeout em chamadas externas
```
Grep por chamadas fetch, axios, ou SDK da Anthropic/Evolution
Verificar se têm timeout configurado

⚠️ = chamada externa sem timeout — pode travar o processo indefinidamente
✅ = timeouts configurados
```

---

## CHECKLIST 4 — DORA Snapshot (Métricas de Saúde do Projeto)

Estas não são verificações de código — são perguntas sobre o processo:

```
📊 DORA-Inspired Questions para o KING System:

1. Deployment Frequency
   "Com que frequência uma nova versão do KING chega ao servidor?"
   → Resposta honesta: ⚠️ não há deploy automatizado ainda (sistema em desenvolvimento)

2. Lead Time
   "Quanto tempo leva de 'ideia' até 'funcionando no WhatsApp real'?"
   → Medir: criação da story → implementação → teste manual → funcional

3. Change Failure Rate
   "De cada 10 implementações, quantas precisam ser corrigidas logo depois?"
   → Rastrear no journey.log

4. Recovery Time
   "Se o sistema parar agora, quanto tempo para voltar?"
   → Documentar procedimento de restart/recovery

5. Reliability
   "O sistema está disponível quando Victor precisa dele?"
   → Monitoramento básico: o processo Node está rodando?
```

---

## Formato de saída

```yaml
observability_result:
  status: "✅" | "❌" | "⚠️"
  logging_score: "X/5"
  traceability_score: "X/3"
  error_handling_score: "X/3"
  dora_snapshot:
    deployment_frequency: "manual / automatizado"
    estimated_lead_time: "X dias"
    known_failure_rate: "não rastreado / X%"
  issues: []
  recommendations: []
```
