# Task: check-architecture

**Owner:** architect-reviewer
**Trigger:** interno (invocado por run-quality-check) ou `*review-architecture [story-id]`
**Output:** Análise arquitetural com problemas encontrados e recomendações

---

## Objetivo

Revisar o código com perspectiva de desenvolvedor sênior — Martin Fowler, Node.js best
practices (goldbergyoni), Microsoft Engineering Playbook. Identificar problemas que
passam no TypeScript mas comprometem a saúde do sistema a longo prazo.

---

## CHECKLIST 1 — Estrutura e Organização (Node.js Best Practices)

### 1.1 Feature-first vs Type-first
```
VERIFICAR: a estrutura de pastas é por feature (agents/guardiao/) ou por tipo técnico (controllers/, models/)?
ESPERADO para KING: src/agents/[nome-agente]/ com subpastas internas
✅ = estrutura por feature
❌ = ex: src/controllers/guardiao-controller.ts (tipo-first — antipadrão)
```

### 1.2 Três camadas por módulo (goldbergyoni)
```
Para cada novo agente, verificar se tem separação clara:
- Entry point: index.ts (recebe input, orquestra, retorna output)
- Domain: lógica do negócio (ex: responder.ts, kb-loader.ts)
- Data access: acesso ao banco ou arquivos externos

✅ = separação clara entre as camadas
❌ = lógica de negócio misturada com acesso a banco no mesmo arquivo
⚠️ = difícil determinar automaticamente — verificar manualmente
```

### 1.3 Configurações hardcoded
```
Grep no código por:
- Paths absolutos hardcoded (ex: '/home/user/claudio-core/...')
- Tokens ou senhas no código
- Números mágicos sem constante nomeada

✅ = configurações em variáveis de ambiente ou config file
❌ = valor hardcoded encontrado: [arquivo:linha]
```

---

## CHECKLIST 2 — Code Smells (Martin Fowler — Refactoring)

### 2.1 Duplicação de código
```
Grep por padrões de código que se repetem em 3+ lugares
Focar em: parsing de YAML, formatação de respostas WhatsApp, queries SQLite

✅ = funções reutilizáveis onde faz sentido
❌ = mesmo bloco de código em [X] lugares — candidato a extração
```

### 2.2 Acoplamento (Fowler: "Feature Envy")
```
VERIFICAR: um módulo acessa diretamente os internos de outro?
Ex: o Guardiao importa arquivos internos do Diretor diretamente?

REGRA: módulos devem se comunicar por interfaces públicas (index.ts exports)
✅ = importações via index.ts do módulo
❌ = importação de arquivo interno de outro módulo (ex: import from '../diretor/internal-utils')
```

### 2.3 Funções longas (Fowler: "Long Function")
```
Verificar funções com mais de ~50 linhas
Não é regra absoluta — mas é sinal de que pode estar fazendo coisas demais

⚠️ = função com [X] linhas em [arquivo] — revisar se pode ser decomposta
```

### 2.4 Complexidade condicional excessiva
```
Grep por if/else aninhados (mais de 3 níveis)
Switch cases muito longos sem extração em funções

⚠️ = lógica condicional complexa em [arquivo:linha] — considerar refatoração
```

---

## CHECKLIST 3 — TypeScript Rigoroso (Microsoft Engineering Playbook)

### 3.1 Uso de `any`
```
Grep em src/ por ': any' e 'as any'
CADA ocorrência é um problema — elimina a proteção do TypeScript

❌ = `any` encontrado em [arquivo:linha] — substituir por tipo específico ou 'unknown'
```

### 3.2 Type assertions sem type guard
```
Grep por ' as [A-Z]' (ex: 'response as BrandConfig')
SE type assertion existe SEM type guard correspondente → problema

❌ = assertion sem guard: [arquivo:linha]
```

### 3.3 Funções exportadas sem retorno explícito
```
Grep por 'export function' e 'export const.*=' sem tipo de retorno

❌ = função exportada sem tipo de retorno em [arquivo:linha]
```

### 3.4 strict mode no tsconfig
```
Read tsconfig.json
Verificar: "strict": true OU ("strictNullChecks": true AND "noImplicitAny": true)

✅ = strict mode ativado
❌ = strict mode não configurado — adicionar ao tsconfig.json
```

---

## CHECKLIST 4 — Evolutionary Architecture (Fowler)

### 4.1 Testabilidade
```
Cada função de domínio pode ser testada sem precisar do WhatsApp ou Evolution API?
Verificar se há injeção de dependência ou mocking points

✅ = lógica de domínio isolável para testes
⚠️ = lógica acoplada a serviços externos — dificulta testes
```

### 4.2 Dependências circulares
```
Verificar se módulo A importa B que importa A
Especialmente: agents/diretor ↔ agents/guardiao

✅ = sem dependências circulares
❌ = ciclo detectado: [A] → [B] → [A]
```

### 4.3 Contrato de interface entre agentes
```
A comunicação entre o Diretor e o Guardiao usa tipos TypeScript definidos?
Ou é passagem de objetos sem tipo (any/object)?

✅ = interface TypeScript definindo o contrato de comunicação
❌ = comunicação sem tipo explícito entre agentes
```

---

## Formato de saída

```yaml
architecture_result:
  status: "✅" | "❌" | "⚠️"
  score: "X/10"  # score de saúde arquitetural
  issues:
    critical: []   # bloqueadores — não passar sem corrigir
    warnings: []   # melhorias recomendadas
    info: []       # observações para o futuro
  strengths: []    # o que está bem feito — reforçar
```
