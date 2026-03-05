---
titulo: "Synkra AIOS Framework — Dossier Completo"
mentor: Alan Nicolas
status: Lapidado pelo Claudio
tags: [AIOS, Synkra, Pedro-Valerio, framework, agentes, Claude-Code, LendárIA]
data_criacao: 2026-02-20
versao: 1.0
fonte: Pesquisa ativa (GitHub, X, newsletter, live AI First Business 15/02/2026)
---

# DOSSIER SYNKRA AIOS — FRAMEWORK COMPLETO

> **Mentor:** Alan Nicolas
> **Status:** Lapidado pelo Claudio
> **Data:** 2026-02-20

---

## PONTO DE VALOR

Este dossier extrai o conhecimento técnico e estratégico completo sobre o **Synkra AIOS**, o framework criado por Pedro Valério (aluno de Alan Nicolas) que transforma o Claude Code em um time de agentes especializados. Base de conhecimento para criar aplicações, automações e projetos em qualidade lendária.

---

## CÁPSULA DE SABEDORIA

> *"A combinação é: Claude Code + AIOS + Repertório para entender o que é possível fazer."*
> — Alan Nicolas

> *"Não conversar com a IA — só conversar com documentação."*
> — Alan Nicolas

> *"Um framework de desenvolvimento ágil com IA que possibilita você ter uma software house premium dentro do seu PC."*
> — Alan Nicolas sobre AIOS

> *"24 copywriters clonados. Funis criados em horas. Times de agentes trabalhando 24h por dia. Isso não é teoria. É o que estamos fazendo agora nas nossas empresas."*
> — Alan Nicolas, live AI First Business (15/02/2026)

---

## PARTE 1: OS CRIADORES

### Pedro Valério — Criador Técnico
- CEO da **Fluence** — 35 pessoas fazendo trabalho de 300-500 funcionários
- Clientes: Magalu, Amazon, Samsung, Coca-Cola, Nestlé, Itaú
- Aluno de Alan Nicolas na Academia Lendária
- Levou 4 meses de persuasão de Alan para liberar o AIOS ao público
- Criou o AIOS ao longo de meses como metodologia interna da Fluence

### Alan Nicolas — Evangelizador e Co-criador
- Fundador e CEO da **Academia Lendária (LendárIA)**
- Florianópolis/SC | @oalanicolas | 265K Instagram | "Filtro Essencial de IA"
- "AIOS é meu foco há 5 meses" (declarado no X)
- Formação Lendária: curso completo em IA aplicada a negócios

### Thiago Finch — Parceiro Estratégico
- Especialista em marketing digital e vendas
- Cofundador da apresentação pública do AIOS

### A Live Histórica — AI First Business (15/02/2026)
Live de 3 horas revelando o sistema completo ao mercado brasileiro. Os três revelaram: 24 copywriters clonados, funis criados em horas, times de agentes 24/7.

---

## PARTE 2: O QUE É O SYNKRA AIOS

**Synkra AIOS** (AI-Orchestrated System) é um framework open-source (MIT) de **Agentic Agile Development** — sistema de orquestração de agentes de IA para desenvolvimento full-stack que também funciona em qualquer domínio.

- **GitHub:** github.com/SynkraAI/aios-core
- **Estrelas:** 1.386+ | **Forks:** 487+ (atualizado 19/02/2026)
- **Instalação:** `npx aios-core init meu-projeto`
- **Node.js:** >=18 (v20+ recomendado)
- **Origem:** Derivado do BMad Method americano, arquitetura própria desde v4.x

**Diferencial vs N8N:**
N8N = automação ("se X, faça Y"). AIOS = agentes que **tomam decisões, se comunicam e resolvem problemas complexos autonomamente**. É a diferença entre automação e inteligência.

---

## PARTE 3: FILOSOFIA E PRINCÍPIOS

### Hierarquia CLI First
```
CLI (Máxima) → Observability (Secundária) → UI (Terciária)
```

### Constitution — 6 Princípios NON-NEGOTIABLE
1. **CLI First** — Toda feature funciona 100% via CLI antes de UI
2. **Agent Authority** — Apenas @devops pode fazer git push/PR/releases
3. **Story-Driven** — Nenhum código sem story associada
4. **No Invention** — Todo statement rastreia para requisitos
5. **Quality First** — lint + typecheck + test sem erros
6. **Absolute Imports** — `@/` alias, nunca `../../../`

### 3 Pilares Metodológicos
1. **Dev Agents Must Be Lean** — Minimize dependencies, contexto para código
2. **Natural Language First** — Tudo em markdown, sem código no core
3. **Agent and Task Design** — Agents=roles, Tasks=procedures, Templates=outputs

---

## PARTE 4: OS 12 AGENTES

| Agente | Nome | Papel |
|--------|------|-------|
| `@aios-master` | Orion/Pax | Orquestrador geral |
| `@architect` | Aria | Arquitetura técnica |
| `@dev` | Dex | Desenvolvedor full-stack |
| `@analyst` | Alex | Análise de requisitos |
| `@pm` | Morgan | Product Manager |
| `@po` | Pax | Product Owner |
| `@sm` | River | Scrum Master |
| `@qa` | Quinn | Quality Assurance |
| `@devops` | Gage | DevOps (único que faz push) |
| `@data-engineer` | Dara | Database design |
| `@ux-design-expert` | Uma | UX/UI |
| `@squad-creator` | — | Criação de squads |

**Sintaxe:** `@agente` para ativar, `*comando` para executar

---

## PARTE 5: AUTONOMOUS DEVELOPMENT ENGINE (ADE)

Sistema de 7 Épicos que transforma requisitos em código funcional:

```
User Request → Spec Pipeline → Execution Engine → QA Review → Working Code
                                      ↓
                               Recovery System → Memory Layer
```

**Fluxo Epic 1 (Spec):**
`@pm *gather-requirements` → `@architect *assess-complexity` → `@analyst *research-deps` → `@pm *write-spec` → `@qa *critique-spec`

**Fluxo Epic 2 (Execute):**
`@architect *create-plan` → `@architect *create-context` → `@dev *execute-subtask 1.1`

---

## PARTE 6: SISTEMA DE SQUADS

Squads = equipes modulares de agentes para qualquer domínio:

```
squads/meu-squad/
├── config.yaml
├── agents/
├── tasks/
├── templates/
├── checklists/
├── data/
└── README.md
```

**Domínios:** software, game dev, escrita criativa, estratégia de negócios, marketing, saúde, educação, conteúdo redes sociais — qualquer domínio.

**Níveis:**
- Level 1: LOCAL (privado)
- Level 2: github.com/SynkraAI (público)
- Level 3: api.synkra.dev (marketplace — em desenvolvimento)

---

## PARTE 7: AIOS PRO

Módulo premium exclusivo para membros do **AIOS Cohort Advanced**:
- Squads avançados
- Memory Layer (persistência entre sessões)
- Integrações enterprise (Jira, Linear, Notion)
- Squad Creator avançado

---

## PARTE 8: INSTALAÇÃO E COMANDOS

```bash
# Novo projeto
npx aios-core init meu-projeto
npx aios-core init meu-projeto --template enterprise

# Projeto existente
npx aios-core install

# Manutenção
npx aios-core doctor --fix
npx aios-core update
npx aios-core info

# Squads
aios squads list
aios squads download nome-do-squad
```

---

## PARTE 9: CASOS DE USO REAIS

| Caso | Antes | Com AIOS |
|------|-------|----------|
| Plataforma avaliada em R$1,8M | Meses de trabalho, equipe completa | 1 semana, centenas de dólares em tokens |
| Website para músico | 4 dias (Wix) | 14 minutos |
| Página completa | Horas/dias | ~R$3 em API |
| Fluence vs concorrentes | 300-500 pessoas | 35 pessoas, mesmos clientes |
| Campanha high ticket ROI negativo | Análise manual | Squad aciona CFO virtual, análise completa |

---

## PARTE 10: INTEGRAÇÃO MULTI-IDE

| IDE/CLI | Pasta | Paridade |
|---------|-------|----------|
| Claude Code | `.claude/` | Completa (referência) |
| Gemini CLI | `.gemini/` | Alta |
| Codex CLI | `.codex/` | Parcial |
| Cursor | `.cursor/` | Sem lifecycle hooks |

**Synapse (Codex 5.3):** Novo recurso — comunicação inter-agentes mais fluida. Agentes chamados por `$` em vez de `@`.

---

## PARTE 11: ROADMAP

- Suporte multi-linguagem expandido
- Integração cloud nativa
- Analytics avançado
- `aios-dashboard` (painel de visualização)
- `mcp-ecosystem`
- `api.synkra.dev` (Marketplace de Squads)

---

## PARTE 12: LINKS ESSENCIAIS

| Recurso | URL |
|---------|-----|
| GitHub Oficial | github.com/SynkraAI/aios-core |
| Getting Started | github.com/SynkraAI/aios-core/blob/main/docs/getting-started.md |
| User Guide | github.com/SynkraAI/aios-core/blob/main/docs/guides/user-guide.md |
| Squads Guide | github.com/SynkraAI/aios-core/blob/main/docs/guides/squads-guide.md |
| Roadmap PT | github.com/SynkraAI/aios-core/blob/main/docs/pt/roadmap.md |
| Newsletter Alan | oalanicolas.news |
| Academia Lendária | lendario.ai/formacao |
| Blog live AIOS | blog.agenciacafeonline.com.br/blog/aios-sistema-operacional-ia-squads-agentes-2026 |
| X Alan Nicolas | x.com/oalanicolas |
| Threads live | threads.com/@oalanicolas/post/DUtmJ5iifIB |

---

## INFORMATIVO TÉCNICO & LÓGICA

**Heurística Central de Pedro Valério:**
Processo antes de IA. Documentação antes de prompt. Story antes de código. CLI antes de UI.

**Ferramentas Citadas:**
- Claude Code (Anthropic) — IA principal
- Codex CLI (OpenAI) — com Synapse
- Gemini CLI (Google) — integração AIOS
- n8n, Dify, Make — automações complementares (NÃO substituem AIOS)

**Protocolo de Escala:**
```
1 pessoa + AIOS = time de 10-15 especialistas
10 pessoas + AIOS = empresa de 300-500 funcionários (caso Fluence)
Squad customizado = verticalizável para qualquer domínio
```

**Impacto Econômico Calculado por Alan Nicolas:**
- Time mínimo sem AIOS: 4 devs + 1-2 DevOps + arquiteto + QA + 2 PMs + 2 POs + 2-4 UX + 2 data engineers
- Custo CLT: R$1.000.000/ano | Freelancer: R$2.000.000/ano
- Rotatividade: 25% ao ano | Tempo para contratar: 210-810 dias
- Com AIOS: mesmo time 24/7, sem turnover, sem custo adicional

---

## RESSALVAS DO CLAUDIO

"O AIOS não substitui o repertório técnico — ele amplifica quem já tem processo. Sem processo claro, a IA amplifica o caos. Com processo, amplifica a excelência. A chave é entender que você está se tornando o arquiteto que valida, não o executor que digita."

---

*Documento gerado pelo Motor de Inteligência OLYMPUS — V4 (via Nexus, agente AIOS Knowledge)*
*Pesquisa ativa em: GitHub SynkraAI, X/@oalanicolas, newsletter oalanicolas.news, live AI First Business 15/02/2026*
*Data: 2026-02-20*
