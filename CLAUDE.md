# CLAUDE.md - claudio-core

Este arquivo configura o comportamento do Claude Code ao trabalhar neste repositorio.

---

## Principios de Veterano
*Destilado de operacoes reais com Claude Code — nao ignore.*

### O Mantra
> "Never take the lazy path. Do the hard work now. The shortcut is forbidden."

Atalho hoje = debugging amanha. Sem excecao.

### Gradiente de Permissao
```
READ     → Livre (fazer sem perguntar)
MOVE     → Apos aprovacao de direcao
CREATE   → Verificar se similar existe primeiro
DELETE   → SEMPRE confirmar
```
Aprovacao de direcao = execute ate completar. Nunca "Quer que eu continue?" apos aprovacao ja dada.

### Regras Criticas
- **Gabriel nao programa** — toda implementacao deve ser explicada em linguagem simples, sem jargoes tecnicos
- **Resumo ao final** — sempre encerrar atividades com resumo informal usando analogias do dia a dia
- **Leitura completa** — NUNCA leia arquivos parcialmente. Read parcial + Edit = conflitos e quebras
- **Discovery antes de implementacao** — verificar o que existe, apresentar gaps, propor opcoes. Nunca implementar direto
- **So o que foi pedido** — nao adicionar features nao solicitadas "ja que estava mexendo"
- **Verificacao fisica antes de teoria** — arquivo existe? servidor responde? usuario repetiu 2x?

### Lei do Melhor Agente (CRITICA — nao ignorar)
> "Para cada tarefa, o agente com maior especialidade naquele dominio deve ser acionado. Sem excecao."

- **Pesquisa e exploracao de codebase** → `Explore` agent
- **Design e UX, estetica, harmonia visual, tipografia** → `ux-design-expert`
- **Arquitetura e decisoes tecnicas estruturais** → `architect`
- **Analise de negocio e requisitos** → `analyst`
- **Implementacao de codigo** → `dev`
- **Qualidade e testes** → `qa`
- **Git, CI/CD, deploy** → `devops`
- **Gestao de produto e prioridades** → `pm`
- **Backlog e stories** → `po` / `sm`
- **Dados, banco, queries** → `data-engineer`
- **Pesquisa ampla e multidisciplinar** → `general-purpose`

**Regra de ouro:** O orquestrador (Aria/Claude Code) distribui. A ordem pode ser quebrada quando for conveniente — mas nunca por preguica. Acionar o agente errado e tao ruim quanto nao acionar nenhum.

### Formato de Discovery
Antes de criar qualquer coisa, apresentar:
```
Existente: [o que ja existe + stats]
Gap: [o que realmente falta]
Opcoes: 1. Estender | 2. Criar novo | 3. Nao fazer nada
Recomendacao: [numero] porque [uma frase]
```

---

## Visao Geral

Este repositorio abriga **dois projetos independentes** com ciclos de vida diferentes:

### Projetos Ativos

| Projeto | Status | Foco | Localizacao |
|---------|--------|------|-------------|
| **Fialho Motors** | FOREGROUND — entrega ativa | Gestao de conteudo (manual) | `projects/fialho-motors/` |
| **KING System** | BACKGROUND — amadurecendo | Automacao com agentes IA | `src/`, `docs/agents/`, `docs/stories/` |

### Regra de Ouro

> Quando estiver trabalhando em entrega pra cliente → foque em `projects/`
> Quando estiver desenvolvendo o sistema → foque em `src/`
> Knowledge base e dossies servem ambos os projetos

### Fialho Motors (FOREGROUND)
- **Cliente:** Jucilene Diass — Fialho Motors, Campo Grande/MS
- **Modelo:** 100% manual — templates reutilizaveis + calendario + identidade visual
- **Receita:** R$800-1.200/mes (contrato mensal)
- **Ciclo:** Entregas semanais (3 posts/semana)
- **Roadmap:** `projects/fialho-motors/roadmap.md`
- **Nao depende do KING** — funciona independente de qualquer automacao
- **Audios/Conversas (Drive):** [Pasta compartilhada](https://drive.google.com/drive/folders/1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY) — audios de reunioes Gabriel + Vitor + Jucilene. Processados pelo squad `intel` → `knowledge-base/conversas/`

### KING System (BACKGROUND)
- **O que e:** Sistema de automacao com 6 agentes IA (Diretor, Legendador, Briefer, Muse, Guardiao, Organizador)
- **Foco:** Bamaq (Porsche + GWM) — volume e complexidade justificam IA
- **Stack:** Node.js/TypeScript, Evolution API, Claude API, Whisper, FFmpeg
- **Status:** Design + prototipo inicial. Amadurece usando repertorio real da Fialho
- **Framework:** [Synkra AIOS](https://github.com/SynkraAI/aios-core) (v4.4.6)

### Repositorios Relacionados

| Repositorio | Localizacao Local | Descricao |
|-------------|-------------------|-----------|
| **claudio-core** | `/home/user/claudio-core` | Repositorio principal (Fialho + KING) |
| **aios-core** | `/home/user/aios-core` | Framework AIOS (referencia e ferramentas) |
| **aiox-workspace** | `github.com/gabrielolio/aiox-workspace` | Workspace AIOX de Gabriel (configs, KB Alan Nicolas) |

---

## Infraestrutura AIOX Configurada

### Squads (squads/)

| Squad | Dominio | Comando |
|-------|---------|---------|
| `king-quality-guard` | QA do KING System | `*check [story-id]` |
| `intel` | Coleta e transcricao de audios/conversas (Groq Whisper) | `*intel` |

### Hooks (.claude/hooks/)

| Hook | Trigger | Funcao |
|------|---------|--------|
| `journey-log.cjs` | PostToolUse | Loga toda execucao de tool em `.aios/journey.log` |

### Skills (.claude/skills/)

Skills sao modulos de habilidade carregados dinamicamente — economizam tokens em sessoes longas.

| Skill | Proposito | Quando usar |
|-------|-----------|-------------|
| `skill-creator` | Criar novas skills para o framework | Quando precisar encapsular processo novo |
| `pdf-to-markdown` | Converter PDF para Markdown via OCR local | Antes de analisar qualquer PDF — evita gastar tokens |

**Uso:** "Use a skill pdf-to-markdown para processar este arquivo: guidelines.pdf"

### Synapse (.synapse/)

- `constitution` — regras nao-negociaveis do projeto
- `global` — contexto da agencia e dos projetos
- `manifest` — flags de configuracao

### Memoria (memory/MEMORY.md)

Estado persistente do projeto, envolvidos, progresso das stories e configuracoes pendentes.
**Ler sempre no inicio de uma nova sessao para manter contexto.**

### Journey Log (.aios/journey.log)

Auditoria completa de toda execucao de ferramentas. Consultar para depurar o que foi feito.

---

## Framework AIOS - Referencia Rapida

O Synkra AIOS esta clonado em `/home/user/aios-core` e disponivel para uso.

### Comandos AIOS Essenciais

```bash
# Diagnostico e informacoes
cd /home/user/aios-core && node bin/aios.js doctor      # Health check (13 PASS)
cd /home/user/aios-core && node bin/aios.js info         # Info do sistema
cd /home/user/aios-core && node bin/aios.js --version    # Versao: 4.4.6

# Instalar AIOS em um projeto
npx aios-core install                    # Instalacao interativa
npx aios-core install --quiet --force    # Instalacao silenciosa (CI/CD)

# Criar novo projeto com AIOS
npx aios-core init <nome-projeto>

# Manutencao
npx aios-core update                     # Atualizar AIOS
npx aios-core validate                   # Validar instalacao
```

### Agentes AIOS Disponiveis

| Agente | ID | Funcao |
|--------|----|--------|
| AIOS Master | `aios-master` | Orquestrador do framework |
| Analyst | `analyst` | Analise de negocios e criacao de PRD |
| Architect | `architect` | Arquitetura e design tecnico |
| Developer | `dev` | Implementacao de codigo |
| QA | `qa` | Garantia de qualidade e testes |
| Scrum Master | `sm` | Gerenciamento de sprint e criacao de stories |
| Product Manager | `pm` | Gerenciamento de produto |
| Product Owner | `po` | Gerenciamento de backlog |
| DevOps | `devops` | CI/CD, infraestrutura, git push |
| Data Engineer | `data-engineer` | Engenharia de dados |
| UX Expert | `ux-design-expert` | Design de experiencia do usuario |

**Ativacao:** `@agent-name` (ex: `@dev`, `@qa`, `@architect`)
**Comandos:** Prefixo `*` (ex: `*help`, `*create-story`, `*develop`)

### Principio Arquitetural: CLI First

```
CLI First -> Observability Second -> UI Third
```

- A CLI e a fonte da verdade - dashboards apenas observam
- Funcionalidades novas devem funcionar 100% via CLI antes de ter UI
- A UI nunca deve ser requisito para operacao do sistema

---

## Convencoes de Desenvolvimento

### Idioma

- **Codigo:** Ingles (variaveis, funcoes, classes, comentarios tecnicos)
- **Documentacao:** Portugues (README, stories, docs de usuario)
- **Commits:** Portugues ou Ingles, seguindo Conventional Commits

### Conventional Commits

```
feat: nova funcionalidade
fix: correcao de bug
docs: documentacao
test: testes
chore: manutencao
refactor: refatoracao
style: formatacao (sem mudanca de logica)
perf: performance
ci: CI/CD
```

**Sempre referencie story ID quando aplicavel:** `feat: implementar feature [Story 2.1]`

### Branches

| Tipo | Padrao | Exemplo |
|------|--------|---------|
| Principal | `main` ou `master` | - |
| Feature | `feat/<descricao>` | `feat/auth-system` |
| Fix | `fix/<descricao>` | `fix/login-redirect` |
| Docs | `docs/<descricao>` | `docs/api-reference` |

### Nomenclatura de Codigo

| Tipo | Convencao | Exemplo |
|------|-----------|---------|
| Arquivos | kebab-case | `user-service.ts` |
| Componentes | PascalCase | `UserProfile` |
| Funcoes/Variaveis | camelCase | `getUserById` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Interfaces/Types | PascalCase | `UserProfileProps` |
| Hooks (React) | prefixo `use` | `useAuth` |

### Imports

**Sempre use imports absolutos quando o projeto suportar.**

```typescript
// Correto
import { useStore } from '@/stores/auth'

// Evitar
import { useStore } from '../../../stores/auth'
```

**Ordem de imports:**
1. Runtime/core (Node.js, React)
2. Bibliotecas externas
3. Componentes internos
4. Utilitarios
5. Stores/estado
6. Tipos
7. Estilos/CSS

### TypeScript (quando aplicavel)

- Sem `any` - Use `unknown` com type guards
- Defina interfaces para props de componentes
- Use `as const` para objetos/arrays constantes
- Tipos de ref explicitos: `useRef<HTMLDivElement>(null)`

### Error Handling

```typescript
try {
  // operacao
} catch (error) {
  const message = error instanceof Error ? error.message : 'Erro desconhecido'
  logger.error(`Falha em ${operacao}`, { error })
  throw new Error(`Falha em ${operacao}: ${message}`)
}
```

---

## Quality Gates

### Antes de Commit
```bash
npm run lint         # ESLint
npm run typecheck    # TypeScript (se configurado)
```

### Antes de Push
```bash
npm test             # Testes
npm run lint         # Linting
npm run typecheck    # Type checking
```

### CI/CD (obrigatorio para merge)
- Todos os testes passando
- Cobertura de testes minima
- Lint sem erros
- Build sem erros

---

## Otimizacao Claude Code

### Uso de Ferramentas

| Tarefa | Use | Nao Use |
|--------|-----|---------|
| Buscar conteudo em arquivos | `Grep` tool | `grep`/`rg` no bash |
| Ler arquivos | `Read` tool | `cat`/`head`/`tail` |
| Editar arquivos | `Edit` tool | `sed`/`awk` |
| Buscar arquivos por nome | `Glob` tool | `find`/`ls` |
| Criar arquivos | `Write` tool | `echo`/`cat` redirection |
| Operacoes complexas | `Task` tool | Multiplos comandos manuais |

### Performance

- Prefira chamadas de ferramentas em paralelo para operacoes independentes
- Use `Task` tool com subagentes para pesquisas amplas no codebase
- Cache dados frequentemente acessados durante a sessao
- Use `/compact` quando o contexto estiver pesado

### Gerenciamento de Sessao

- Rastreie progresso com `TodoWrite` para tarefas complexas
- Atualize checkboxes de stories imediatamente apos completar tasks
- Mantenha contexto da story atual sendo trabalhada
- Salve estado importante antes de operacoes longas

### Recuperacao de Erros

- Forneca sugestoes de recuperacao para falhas
- Inclua contexto do erro em mensagens ao usuario
- Sugira procedimentos de rollback quando apropriado
- Documente correcoes manuais necessarias

---

## Story-Driven Development (AIOS)

Quando o AIOS estiver instalado no projeto:

1. **Todo desenvolvimento comeca com uma story** em `docs/stories/`
2. **Atualize progresso** - Marque checkboxes: `[ ]` -> `[x]`
3. **Rastreie mudancas** - Mantenha a secao File List na story
4. **Siga criterios** - Implemente exatamente o que os acceptance criteria especificam

### Workflow de Story
```
@po *create-story -> @dev implementa -> @qa testa -> @devops push
```

---

## Debug

### Habilitar Debug (AIOS)
```bash
export AIOS_DEBUG=true
```

### Logs
```bash
tail -f .aios/logs/agent.log
tail -f .aios/journey.log    # Journey log de execucoes
```

### Guidelines Porsche (PDF oficiais)

Disponiveis em `knowledge-base/brands/porsche-guidelines/`:
- `Porsche_Finder_Photo_Checklist_PT-BR.pdf` — checklist de fotos
- `Porsche_Finder_Photo_Guideline_PT-BR.pdf` — guidelines de fotos
- `Porsche_Finder_Video_Guideline_PT-BR.pdf` — guidelines de video

Para analisar, usar a skill `pdf-to-markdown` antes de processar com Claude.

---

## Comandos Frequentes

### Projeto
```bash
npm install             # Instalar dependencias
npm run dev             # Desenvolvimento local
npm test                # Rodar testes
npm run lint            # Verificar estilo
npm run typecheck       # Verificar tipos
npm run build           # Build producao
```

### AIOS (referencia em /home/user/aios-core)
```bash
cd /home/user/aios-core && node bin/aios.js doctor   # Diagnostico
cd /home/user/aios-core && node bin/aios.js info     # Informacoes
```

### Git
```bash
git status              # Estado atual
git log --oneline -10   # Ultimos commits
git diff                # Mudancas nao staged
```

---

*KING - Sistema de Automacoes e Inteligencia Criativa*
*Powered by Synkra AIOS v4.4.6*
