# Task: check-security

**Owner:** architect-reviewer
**Trigger:** interno (invocado por run-quality-check)
**Output:** Análise de segurança básica — problemas encontrados com prioridade

---

## Objetivo

Verificar vulnerabilidades de segurança comuns em sistemas Node.js que lidam com
WhatsApp (Evolution API), banco de dados (SQLite) e APIs externas (Claude API).
Baseado em OWASP Top 10 adaptado para o contexto do KING System.

---

## CHECKLIST 1 — Segredos e Credenciais

### 1.1 Hardcoded secrets
```
Grep no src/ por padrões:
- 'apiKey', 'api_key', 'token', 'secret', 'password', 'senha'
  seguidos de '=' e string literal (não variável)
- Tokens com padrão: 'ey', 'sk-', 'Bearer '
- Números de telefone hardcoded (padrão WhatsApp)

❌ CRÍTICO = credencial hardcoded em [arquivo:linha]
```

### 1.2 Variáveis de ambiente usadas corretamente
```
Verificar: process.env.CLAUDE_API_KEY, process.env.EVOLUTION_API_TOKEN, etc.
SE o sistema usa env vars → verificar se há .env.example no repo
SE não há .env.example → ⚠️ documentação de configuração faltando

✅ = credenciais via env vars + .env.example existe
❌ = credencial diretamente no código
⚠️ = env vars usadas mas sem .env.example para documentar
```

---

## CHECKLIST 2 — Injeção e Validação de Input

### 2.1 SQLite — SQL Injection
```
Grep por queries SQLite que concatenam strings de input do usuário
Ex: `db.run("SELECT * FROM brands WHERE name = '" + input + "'")` → CRÍTICO

✅ = uso de prepared statements ou parameterized queries
❌ CRÍTICO = concatenação de input em query SQL
```

### 2.2 Validação de input do WhatsApp
```
O sistema recebe mensagens do WhatsApp via Evolution API
Verificar: o conteúdo da mensagem é validado antes de processar?
- Tamanho máximo verificado?
- Tipo de conteúdo verificado (texto vs. mídia)?

⚠️ = sem validação de tamanho/tipo — pode causar problemas com payloads inesperados
✅ = validação básica implementada
```

### 2.3 Path traversal (kb-loader específico)
```
O Guardião carrega YAMLs de knowledge-base/brands/
Verificar: se o nome da marca vem de input externo, pode ser manipulado?
Ex: input "../../.env" em vez de "porsche" → leria arquivo errado

✅ = nome da marca validado contra lista whitelist de marcas conhecidas
❌ CRÍTICO = path construído diretamente do input sem validação
```

---

## CHECKLIST 3 — Gestão de Dependências

### 3.1 Dependências com vulnerabilidades conhecidas
```bash
npm audit --audit-level=high 2>&1 | head -30
```
```
✅ = 0 vulnerabilidades high/critical
⚠️ = vulnerabilidades moderate encontradas
❌ = vulnerabilidades high ou critical encontradas — listar e priorizar
```

### 3.2 Dependências desnecessárias
```
Verificar package.json por dependências óbvias não usadas
(análise básica — não exhaustiva)

⚠️ = dependência listada mas não encontrada em nenhum import no src/
```

---

## CHECKLIST 4 — Exposição de Dados

### 4.1 Logs com dados sensíveis
```
Grep por console.log, logger.log seguidos de variáveis que podem conter:
- Conteúdo de mensagens WhatsApp de usuários
- Tokens de API
- Dados pessoais (telefones, nomes)

⚠️ = log pode expor dados sensíveis em [arquivo:linha]
✅ = logs não expõem dados sensíveis
```

### 4.2 Respostas de erro com stack trace
```
Verificar se erros capturados retornam stack trace para o usuário final
(via WhatsApp ou resposta de API)

❌ = stack trace sendo enviado de volta ao usuário
✅ = erros logados internamente, mensagem genérica ao usuário
```

---

## Formato de saída

```yaml
security_result:
  status: "✅" | "❌" | "⚠️"
  critical_issues: []    # Bloqueadores absolutos — corrigir antes de qualquer deploy
  warnings: []           # Melhorias de segurança importantes
  passed: []             # O que está correto — reforçar
```

---

## Nota para Gabriel (em português simples)

Segurança não é paranoia — é proteção básica. Se o sistema do KING ficar comprometido:
- Mensagens do Victor e da Jucilene podem vazar
- A chave da Claude API pode ser roubada (tem custo financeiro direto)
- O banco de dados de clientes pode ser corrompido

Esses checks básicos protegem contra os problemas mais comuns.
