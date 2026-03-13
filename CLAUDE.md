# CLAUDE.md — Cérebro Operacional da Agência

> Versão: 1.0.0 | Última atualização: 2026-03-12
> Framework: AIOX Synkra v5.0.3

---

## SEÇÃO 1 — Constitution

### Missão

Produzir resultados reais e mensuráveis para clientes locais usando IA como vantagem competitiva.
Não somos uma agência de conteúdo comum. Somos uma operação enxuta que entrega qualidade de big agency com custo de startup.

### Valores Fundamentais

| Valor | Definição Operacional |
|-------|-----------------------|
| **Velocidade** | Entrega antes do prazo. Feedback loop < 24h. Nunca deixar cliente esperando sem status. |
| **Qualidade** | Nada sai sem revisão. Todo output passa por pelo menos um agente de QA. |
| **Transparência** | Clientes veem o trabalho. Nada publicado sem aprovação explícita. Relatórios honestos. |

### Regras Absolutas (NUNCA violar)

1. **NUNCA inventar dados** — Pesquisa de mercado, métricas, benchmarks: sempre fonte real ou explicitamente declarar estimativa.
2. **NUNCA publicar sem aprovação** — Todo conteúdo para cliente (post, reels, copy) precisa de OK explícito do Vítor antes de ir ao ar.
3. **NUNCA comprometer tom profissional** — Com clientes: linguagem formal, erros ortográficos zero, emojis com moderação e estratégia.
4. **NUNCA assumir sem verificar** — Se não tem certeza do dado, consulta antes de colocar no entregável.
5. **NUNCA deletar sem confirmar** — Arquivos de cliente, scripts, assets: sempre perguntar antes de remover.

### Article IV — No Invention

Todo output de agente que vai para cliente DEVE ter rastreabilidade:
- Dados → fonte verificável (pesquisa, site oficial, relatório)
- Afirmações → embasamento factual ou claramente marcado como estimativa
- Criações → baseadas em briefing aprovado, não em suposição

---

## SEÇÃO 2 — Framework vs Project Boundary

### Separação de Responsabilidades

```
C:\Users\Gabriel\
├── aiox-workspace\          ← AQUI: código, automações, squads, scripts
│   ├── squads\              ← outputs de pesquisa e conteúdo dos squads
│   ├── tools\               ← scripts Python, bat, automações
│   ├── knowledge-base\      ← base de conhecimento estruturada
│   └── data\                ← dados processados
│
├── personal-vault\          ← Obsidian: conhecimento, pesquisas, notas pessoais
│   └── (privado — repo: gabrielolio/personal-vault)
│
└── Agency\                  ← assets de clientes, brand materials
```

### Por Sistema

| Sistema | Propósito | O que vai lá |
|---------|-----------|--------------|
| **aiox-workspace** | Código e automações | Scripts, squads AIOX, outputs processados, ferramentas |
| **personal-vault** | Conhecimento e pesquisa | Daily notes, pesquisas, referências, aprendizados |
| **Netlify** | Deploy de páginas | Hub cliente, brandbook, Digital Garden, apresentações |
| **GitHub** | Versionamento | Ambos os repos, automações, histórico |
| **Make.com** | Automações visuais | Fluxos de publicação, integrações WhatsApp, Metricool |

### Regra de Fronteira

- **Código e scripts** → sempre em `aiox-workspace/tools/`
- **Conhecimento e aprendizados** → sempre em `personal-vault/`
- **Assets finais de cliente** → pipeline: aiox-workspace → vault → Netlify
- **Nunca misturar**: não colocar notas pessoais em aiox-workspace nem código em personal-vault

---

## SEÇÃO 3 — Sistema de Agentes

### Hierarquia

```
@aiox-master (orquestrador geral — visão constitucional, override authority)
    └── @aiox-orchestrator (coordena squads — task routing, dependency mgmt)
            ├── @pm      — épicos, requisitos, specs
            ├── @architect — arquitetura de sistemas e decisões técnicas
            ├── @analyst — pesquisa de mercado, dados, inteligência
            ├── @dev     — implementação de código, scripts, automações
            ├── @qa      — qualidade, revisão, gate de publicação
            └── @ux-expert — design, identidade visual, UX de conteúdo
```

### Invocação de Agentes

**Prefixo:** `$` antes do nome do agente

```
$aiox-master → orquestração e decisões constitucionais
$pm          → criar épicos, specs, roadmap
$architect   → decisões de stack, arquitetura de sistemas
$analyst     → pesquisa de mercado, análise competitiva
$dev         → código, scripts, automações
$qa          → revisão de qualidade, gate antes de publicar
$ux-expert   → design, brandbook, layouts
```

### Squads Ativos

| Squad | Função | Agentes Principais |
|-------|--------|--------------------|
| **market-intel** | Pesquisa de mercado, análise competitiva, benchmarks de setor | @analyst + @architect |
| **content** | Criação de posts, reels, copy, WhatsApp bom dia | @ux-expert + @qa |
| **ops** | Automações Make.com, scripts de sincronização, integrações | @dev + @devops |

### Autoridades Exclusivas

| Operação | Agente Responsável | Outros Agentes |
|----------|--------------------|----------------|
| `git push` / PR create | @devops | BLOQUEADO |
| Publicação para cliente | @qa (gate) → Vítor (aprovação humana) | @dev só prepara |
| Decisões de arquitetura | @architect | Consultar, não decidir |
| Epics e roadmap | @pm | Executar, não criar |

---

## SEÇÃO 4 — CONTEXTO DA AGÊNCIA

### Identidade

- **Nome:** Ainda sem nome definido (pendente decisão Gabriel + Vítor)
- **Sócios:** Gabriel (operacional/técnico) + Vítor (comercial/criativo)
- **Modelo:** Agência de marketing digital com IA como diferencial operacional

### Estrutura de Trabalho

| Sócio | Papel Principal | Responsabilidades |
|-------|----------------|-------------------|
| **Gabriel** | Operacional/Técnico | Squads AIOX, automações, entregáveis técnicos, gestão de ferramentas |
| **Vítor** | Comercial/Criativo | Relacionamento com cliente, aprovação de conteúdo, estratégia de vendas |

### Clientes Ativos

#### Fialho Motors — Concessionária GWM

| Atributo | Detalhe |
|----------|---------|
| **Segmento** | Concessionária GWM (Great Wall Motors) |
| **Localização** | Campo Grande, MS |
| **Contrato** | R$500/mês 1 → R$1.200/mês (escalonamento) |
| **Status** | Ativo |
| **Deliverables** | Posts semanais, reels mensais, WhatsApp bom dia, identidade visual |
| **Hub Netlify** | fialho-motors-apresentacao.netlify.app |
| **Brandbook** | fialho-motors-apresentacao.netlify.app/brandbook |
| **Painel Vítor** | fialho-motors-apresentacao.netlify.app/painel-vitor |

**Calendário de entregas Fialho:**
- Posts semanais: toda segunda-feira (aprovação Vítor até domingo)
- WhatsApp bom dia: diário (banco de mensagens renovado mensalmente)
- Reels: 1x/mês (briefing até dia 20, entrega até dia 25)
- Relatório mensal: até dia 5 do mês seguinte

### Stack Completa da Agência

| Ferramenta | Propósito | Custo |
|-----------|-----------|-------|
| **Claude Code + AIOX Synkra v5.0.3** | Orquestração de squads, IA operacional | Assinatura Claude |
| **Make.com** | Automações visuais (WhatsApp, Metricool) | R$55/mês |
| **Metricool** | Agendamento e analytics de posts | — |
| **Notion** | Gestão de projetos, backlog, colaboração | — |
| **Obsidian (personal-vault)** | Conhecimento, pesquisa, notas | Gratuito |
| **GitHub** | Versionamento (aiox-workspace + personal-vault) | Gratuito |
| **Netlify** | Deploy de páginas de cliente e Digital Garden | Gratuito |
| **Syncthing** | Sincronização entre máquinas Gabriel ↔ gooom | Gratuito |

---

## SEÇÃO 5 — INFRAESTRUTURA

### Máquinas

| Máquina | Usuário | Propósito |
|---------|---------|-----------|
| **Principal** | `C:\Users\Gabriel\` | Trabalho diário, squads AIOX, desenvolvimento |
| **Secundária** | `C:\Users\gooom\` | Backup, sincronização via Syncthing (pendente setup) |

**Device ID Syncthing (Gabriel):** `CMJX7XQ-SUEYCJK-7APQHYK-KNIPQFJ-IX7OEKX-D2ULG7A-3VIRCOG-QXX4MQA`

### Repositórios GitHub

| Repo | Visibilidade | Conteúdo |
|------|-------------|----------|
| `gabrielolio/aiox-workspace` | Público | Código, squads, scripts, automações |
| `gabrielolio/personal-vault` | Privado | Obsidian vault pessoal |
| `gabrielolio/gabrielolio-fialho-vault-public` | Público | Digital Garden Fialho |

### Netlify Deploys

| URL | Conteúdo |
|-----|----------|
| `fialho-motors-apresentacao.netlify.app` | Hub principal Fialho Motors |
| `fialho-motors-apresentacao.netlify.app/brandbook` | Brandbook GWM/Fialho |
| `fialho-motors-apresentacao.netlify.app/pesquisa-mercado` | Pesquisa de mercado |
| `fialho-motors-apresentacao.netlify.app/painel-vitor` | Painel de acompanhamento Vítor |
| `fialho-motors-apresentacao.netlify.app/semana-01` a `/semana-05` | Relatórios semanais |
| `beautiful-brioche-056344.netlify.app` | Digital Garden Vítor |

### Scripts Ativos

| Script | Localização | Função | Status |
|--------|------------|--------|--------|
| `aiox_to_vault.py` | `aiox-workspace/tools/` | Exporta outputs dos squads para personal-vault | Ativo |
| `sync-to-vault.bat` | `aiox-workspace/tools/` | Sincroniza arquivos selecionados com vault | Ativo |
| `organizar_drive.py` | `aiox-workspace/tools/` | Organiza Google Drive | Pendente integração vault |

---

## SEÇÃO 6 — FLUXO DE TRABALHO DIÁRIO

### Rotina Operacional

```
MANHÃ
├── Abrir daily note no Obsidian (template automático)
├── Revisar inbox Notion (tarefas pendentes)
└── Check status de clientes (aprovações pendentes Vítor)

DIA
├── Captura rápida de ideias/tarefas (PENDENTE: Telegram bot)
├── Execução de squads conforme demanda
└── Comunicação com Vítor sobre aprovações

SESSÃO PRINCIPAL (noite preferencial)
├── 1. Acionar squads AIOX conforme prioridade
├── 2. Formatar outputs para entrega
├── 3. Exportar para vault via aiox_to_vault.py
├── 4. Publicar entregáveis para Vítor (painel-vitor ou Notion)
└── 5. git commit automático a cada 30min de trabalho

ENCERRAMENTO
├── Review da daily note no Obsidian
├── Mover tarefas concluídas
└── Registrar aprendizados do dia
```

### Pipeline de Conteúdo (Fialho Motors)

```
Briefing/Demanda
    ↓
$content squad (criação)
    ↓
$qa (revisão de qualidade + tom + ortografia)
    ↓
Envio para aprovação → Vítor
    ↓ (OK explícito)
Publicação (Metricool / WhatsApp via Make.com)
    ↓
Relatório mensal
```

### Pipeline de Pesquisa

```
Demanda de inteligência
    ↓
$market-intel squad
    ↓
Formatação para vault (aiox_to_vault.py)
    ↓
Publicação em Netlify (se for para cliente)
    ↓
Arquivamento em personal-vault (se for conhecimento interno)
```

---

## SEÇÃO 7 — PENDÊNCIAS TÉCNICAS

### Prioridade Alta

| Pendência | Descrição | Impacto |
|-----------|-----------|---------|
| **Syncthing na gooom** | Configurar Syncthing na máquina secundária `C:\Users\gooom\` para sincronizar com Gabriel | Backup redundante, trabalho em 2 máquinas |
| **Telegram bot captura mobile** | Bot que transforma mensagens Telegram em notas/tarefas no Obsidian | Captura rápida off-desk |
| **Brand identity da agência** | Nome + logo + identidade visual da própria agência (sem nome ainda) | Necessário para proposta a novos clientes |

### Prioridade Média

| Pendência | Descrição | Impacto |
|-----------|-----------|---------|
| **organizar_drive.py + vault** | Integrar script de organização do Google Drive com fluxo do personal-vault | Redução de trabalho manual |
| **Obsidian Copilot com Claude API** | Configurar Obsidian Copilot apontando para Claude API para pesquisas no vault | Produtividade em pesquisa |

### Referências Técnicas

- **Device ID Syncthing Gabriel:** `CMJX7XQ-SUEYCJK-7APQHYK-KNIPQFJ-IX7OEKX-D2ULG7A-3VIRCOG-QXX4MQA`
- **Make.com:** Automações de WhatsApp e agendamento via Metricool
- **Netlify:** Deploy via CLI ou drag-drop (sem CI/CD configurado ainda)

---

## SEÇÃO 8 — REGRAS DE OPERAÇÃO AIOX

### Workflow Padrão para Desenvolvimento

```
Draft (@sm) → Validate (@po) → Implement (@dev) → QA Gate (@qa) → Push (@devops)
```

### IDS — Incremental Development System

Hierarquia obrigatória antes de qualquer criação:

1. **REUSE** (relevância >= 90%) — use direto, sem modificação
2. **ADAPT** (relevância 60-89%) — adapte com < 30% de mudança
3. **CREATE** (sem match) — justifique, documente, registre

**Nunca crie novo artefato sem consultar o registro primeiro.**

### Complexity Classes (Spec Pipeline)

| Score | Classe | Fases |
|-------|--------|-------|
| <= 8 | SIMPLE | 3 fases (gather → spec → critique) |
| 9-15 | STANDARD | 6 fases completas |
| >= 16 | COMPLEX | 6 fases + ciclo de revisão |

### Anti-Padrões Proibidos

- Publicar conteúdo de cliente sem aprovação explícita do Vítor
- Inventar dados ou métricas sem fonte
- Criar novo squad sem validar com @aiox-master
- Fazer push sem @devops (Gage)
- Modificar scope ou AC de story sem @po (Pax)
- Over-engineering: factory patterns sem necessidade, interfaces para 1 implementação
- Feature não solicitada sem perguntar antes

---

## SEÇÃO 9 — GLOSSÁRIO

| Termo | Significado |
|-------|------------|
| **AIOX** | Framework de agentes IA para orquestração de trabalho |
| **Squad** | Grupo de agentes com especialização para uma área |
| **Vault** | personal-vault no Obsidian (conhecimento pessoal) |
| **Hub** | Página Netlify com links para todos os entregáveis do cliente |
| **Painel Vítor** | Página no hub Fialho onde Vítor acompanha entregas e aprova conteúdo |
| **Gate de QA** | Checkpoint obrigatório de qualidade antes de qualquer publicação |
| **Daily note** | Nota diária no Obsidian para captura e revisão |
| **aiox-workspace** | Repositório principal de código e automações da agência |
