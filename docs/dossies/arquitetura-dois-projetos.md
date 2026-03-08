# Arquitetura Revisada: Dois Projetos, Um Repositorio

**Data:** 2026-03-04
**Autor:** Aria (@architect) + KING
**Decisao:** Separacao formal entre Fialho Motors (foreground) e KING System (background)

---

## 1. Diagnostico da Situacao Atual

### O Que Encontrei

O repositorio `claudio-core` foi desenhado com o KING como centro de tudo. Faz sentido — era o unico projeto. Mas agora temos **dois projetos com ciclos de vida completamente diferentes:**

| Aspecto | Fialho Motors | KING System |
|---------|---------------|-------------|
| **Status** | ATIVO — gera receita agora | Em design — zero codigo funcional |
| **Urgencia** | Alta — cliente esperando | Baixa — amadurecendo |
| **Complexidade tecnica** | Zero (manual + templates) | Alta (6 agentes, WhatsApp, IA) |
| **Entrega** | PDFs, imagens, calendarios | Software (Node.js/TypeScript) |
| **Publico** | Jucilene (cliente final) | Vitor (operador do sistema) |
| **Ciclo** | Semanal (entregas de conteudo) | Sprints de 2 semanas (dev) |
| **Risco de mistura** | Atrasa entrega pra Jucilene | Perde foco tecnico |

### O Problema de Misturar

Se o Vitor abre o repositorio pra trabalhar na Fialho e vê `src/agents/diretor/`, `bullmq`, `Evolution API` — ele se distrai com o KING ao inves de focar na entrega imediata. E se ele abre pra trabalhar no KING e vê `projects/fialho-motors/calendario/` — mistura as prioridades.

**A fronteira precisa ser clara, nao apenas logica, mas FISICA dentro do repo.**

---

## 2. Arquitetura Recomendada

### 2.1. Estrutura de Pastas Revisada

```
claudio-core/
│
├── CLAUDE.md                          # Instrucoes globais (atualizado)
├── README.md
├── package.json                       # KING system (Node.js)
├── tsconfig.json                      # KING system
│
├── projects/                          # ← PROJETOS DE CLIENTE (foreground)
│   └── fialho-motors/
│       ├── README.md                  # Visao geral do projeto
│       ├── roadmap.md                 # Fases e entregas
│       ├── entregas/                  # PDFs, propostas finalizadas
│       │   ├── proposta-comercial.pdf
│       │   └── brandbook.pdf
│       ├── assets/                    # Templates, logos, fontes
│       │   ├── templates/             # Templates reutilizaveis
│       │   └── brand/                 # Logos, paleta, tipografia
│       ├── calendario/                # Calendarios mensais
│       │   └── 2026-03-marco.md
│       └── docs/                      # Docs especificos do projeto
│           └── briefings/
│
├── src/                               # ← KING SYSTEM (background)
│   ├── index.ts
│   ├── agents/
│   │   └── diretor/
│   │       └── index.ts
│   └── config/
│       ├── env.ts
│       └── logger.ts
│
├── docs/                              # ← DOCUMENTACAO COMPARTILHADA
│   ├── agents/                        # Definicoes dos 6 agentes KING
│   │   ├── diretor.yaml
│   │   ├── legendador.yaml
│   │   ├── briefer.yaml
│   │   ├── muse.yaml
│   │   ├── guardiao.yaml
│   │   └── organizador.yaml
│   ├── dossies/                       # Analises e planos (ambos projetos)
│   ├── stories/                       # Stories AIOS (KING only)
│   ├── transcricoes/                  # Material bruto (compartilhado)
│   └── architecture/                  # NOVO: docs de arquitetura
│       └── arquitetura-dois-projetos.md
│
├── knowledge-base/                    # ← BASE DE CONHECIMENTO (compartilhada)
│   ├── brands/                        # GWM, Porsche (KING + Fialho usa GWM)
│   ├── clients/                       # Bamaq, Fialho Motors
│   ├── profiles/                      # Vitor King
│   └── templates/
│
├── presentations/                     # HTMLs de apresentacao
│
└── scripts/                           # Utilitarios
    └── transcribe.py
```

### 2.2. Regras de Fronteira

```
┌─────────────────────────────────────────────────────┐
│                   claudio-core                       │
│                                                     │
│  ┌──────────────────┐    ┌──────────────────────┐   │
│  │  projects/        │    │  src/                 │   │
│  │  fialho-motors/   │    │  docs/agents/         │   │
│  │                   │    │  docs/stories/         │   │
│  │  FOREGROUND       │    │  BACKGROUND            │   │
│  │  Manual           │    │  TypeScript            │   │
│  │  Templates        │    │  Agentes IA            │   │
│  │  Entregas         │    │  WhatsApp Bot          │   │
│  │  R$800/mes        │    │  Bamaq foco            │   │
│  │                   │    │                        │   │
│  │  Ciclo: semanal   │    │  Ciclo: sprints        │   │
│  └───────┬──────────┘    └──────────┬─────────────┘   │
│          │                          │                 │
│          │    ┌──────────────┐      │                 │
│          └────┤  COMPARTILHADO├─────┘                 │
│               │              │                        │
│               │ knowledge-base/                       │
│               │ docs/dossies/                         │
│               │ docs/transcricoes/                    │
│               │ presentations/                        │
│               └──────────────┘                        │
└─────────────────────────────────────────────────────┘
```

**Regra clara:**

| Pasta | Pertence a | Quem mexe |
|-------|-----------|-----------|
| `projects/fialho-motors/` | Fialho Motors | Qualquer sessao focada em cliente |
| `src/` | KING | Sessoes de desenvolvimento |
| `docs/agents/` | KING | Design de agentes |
| `docs/stories/` | KING | Sprint planning |
| `docs/dossies/` | Compartilhado | Analises servem ambos |
| `knowledge-base/` | Compartilhado | Dados alimentam ambos |
| `docs/transcricoes/` | Compartilhado | Material bruto |

### 2.3. Decisao: Um Repo ou Dois?

**Recomendacao: MANTER UM REPO.**

Razoes:
1. **Knowledge base e compartilhada** — `fialho-motors.yaml` alimenta tanto as entregas manuais quanto futuramente o KING
2. **Dossies servem ambos** — A analise da conversa presencial informa tanto a proposta manual quanto o design do sistema
3. **Overhead de 2 repos** — Para um time de 1 pessoa (Vitor + Gabriel), 2 repos cria friccao desnecessaria
4. **A fronteira de pastas e suficiente** — `projects/` vs `src/` e claro o bastante

**Quando separar:** Se/quando o KING tiver CI/CD, testes automatizados e deploy proprio, ai faz sentido extrair `src/` pra um repo dedicado. Mas agora e prematuro.

---

## 3. Atualizacao da visao-geral-king.md

A visao geral precisa refletir que:
1. KING e **background** — maturando, nao e prioridade imediata
2. Foco do KING e **Bamaq** — volume e complexidade justificam IA
3. Fialho Motors e **projeto separado** — opera manual, e foreground
4. A experiencia com Fialho **alimenta o KING** — repertorio real

---

## 4. Atualizacao do CLAUDE.md

Secao nova recomendada:

```markdown
## Projetos Ativos

### Fialho Motors (FOREGROUND)
- **Status:** ATIVO — entrega semanal
- **Localizacao:** `projects/fialho-motors/`
- **Modelo:** 100% manual (templates + calendario)
- **Prioridade:** ALTA — cliente pagando

### KING System (BACKGROUND)
- **Status:** Em design — amadurecendo
- **Localizacao:** `src/`, `docs/agents/`, `docs/stories/`
- **Modelo:** 6 agentes IA (Diretor, Legendador, Briefer, Muse, Guardiao, Organizador)
- **Prioridade:** MEDIA — evolui em paralelo

### Regra de Ouro
> Quando estiver trabalhando em entrega pra cliente, foque em `projects/`.
> Quando estiver desenvolvendo o sistema, foque em `src/`.
> Knowledge base e dossies servem ambos.
```

---

## 5. Riscos e Contramedidas

| Risco | Contramedida |
|-------|-------------|
| Fialho consome todo o tempo, KING nunca evolui | Reservar 1 sessao/semana pra KING (sexta?) |
| KING vira prioridade e Fialho atrasa | Entregas Fialho tem deadline semanal fixo |
| Knowledge base fica inconsistente | Fialho contribui dados → KING consome |
| Escopo do Fialho cresce sem controle | Roadmap com fases claras, proposta limita escopo |

---

## 6. Proximos Passos Imediatos

### Para Fialho (essa semana):
1. ~~Criar `projects/fialho-motors/`~~ ✅ Feito
2. ~~Criar README e roadmap~~ ✅ Feito
3. Montar proposta comercial (PDF em `entregas/`)
4. Criar templates em `assets/templates/`
5. Primeiro calendario em `calendario/2026-03-marco.md`

### Para KING (background):
1. Atualizar `visao-geral-king.md` com novo posicionamento
2. Manter stories e agentes yamls como estao (design madurando)
3. Codigo em `src/` pode evoluir em sessoes dedicadas
4. Fialho gera repertorio → alimenta knowledge base → KING consome

---

*Aria (@architect) — arquitetando o futuro 🏗️*
*"Dois projetos, uma base. Resultado primeiro, automacao depois."*
