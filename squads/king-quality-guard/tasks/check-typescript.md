# Task: check-typescript

**Owner:** sentinel
**Trigger:** interno (invocado por run-quality-check)
**Output:** ✅ sem erros | ❌ X problemas encontrados (em portugues)

---

## Objetivo

Executar verificacao de codigo TypeScript (tipos + estilo) e reportar
resultados em portugues simples para Gabriel.

---

## Passos

### PASSO 1 — Verificar se ha codigo TypeScript novo

```
SE nao existe src/ ou nao tem arquivos .ts → pular, retornar "⚠️ sem codigo para verificar"
```

### PASSO 2 — Executar typecheck

```bash
cd /home/user/claudio-core && npm run typecheck 2>&1
```

SE o comando nao existe (sem script typecheck no package.json):
```bash
cd /home/user/claudio-core && npx tsc --noEmit 2>&1
```

### PASSO 3 — Executar lint

```bash
cd /home/user/claudio-core && npm run lint 2>&1
```

### PASSO 3.5 — Verificações adicionais de qualidade TypeScript (Microsoft Engineering Playbook)

Executar via Grep ANTES de parsear os erros do compilador:

```
a) Grep por ': any' e 'as any' no src/
   → Cada ocorrência: ⚠️ "Uso de 'any' em [arquivo:linha] — elimina proteção de tipos"

b) Grep por 'as [A-Z][a-zA-Z]+' (type assertions)
   → Verificar se há type guard correspondente

c) Grep por 'export function' ou 'export const.*=.*(' sem tipo de retorno
   → ⚠️ "Função exportada sem tipo de retorno explícito em [arquivo:linha]"

d) Read tsconfig.json → verificar "strict": true
   → ❌ se strict não está ativado: "Modo rigoroso do TypeScript não está ativado"

e) Verificar padrão AAA em arquivos de teste (*.test.ts, *.spec.ts):
   → Arrange (preparação), Act (execução), Assert (verificação)
   → ⚠️ se testes existem mas não seguem o padrão
```

### PASSO 4 — Parsear e traduzir erros

**Traducao de erros comuns (ingles → portugues simples):**

| Erro tecnico | Mensagem para Gabriel |
|--------------|----------------------|
| `Property 'X' does not exist on type 'Y'` | "O campo 'X' nao existe no tipo de dado esperado" |
| `Cannot find module 'X'` | "Importacao nao encontrada: o arquivo 'X' nao existe ou o caminho esta errado" |
| `Object is possibly 'undefined'` | "O codigo nao verifica se o valor existe antes de usar" |
| `Type 'X' is not assignable to type 'Y'` | "Tipo de dado incompativel: esperava [Y], recebeu [X]" |
| `Expected N arguments, but got M` | "Funcao chamada com numero errado de parametros" |
| Lint: `no-unused-vars` | "Variavel declarada mas nunca usada" |
| Lint: `no-console` | "Console.log encontrado — remover antes de producao" |
| Lint: `@typescript-eslint/no-explicit-any` | "Uso de 'any' — substituir por tipo especifico" |
| Lint: `@typescript-eslint/explicit-function-return-type` | "Funcao sem tipo de retorno declarado" |

### PASSO 5 — Retornar resultado

```yaml
typescript_result:
  status: "✅" | "❌" | "⚠️"
  error_count: 0
  errors:
    - file: "src/agents/guardiao/kb-loader.ts"
      line: 47
      message_pt: "O campo 'subtitle_typography' nao existe no tipo de dado esperado"
      original: "Property 'subtitle_typography' does not exist on type 'BrandConfig'"
```

---

## SE nao ha package.json ou projeto sem scripts configurados

Retornar: `⚠️ Verificacao de codigo nao configurada — npm run typecheck nao disponivel`
E continuar com os outros checks.
