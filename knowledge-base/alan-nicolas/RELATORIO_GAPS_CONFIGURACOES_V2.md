---
titulo: "Gaps e Configurações Pendentes — Análise V2 (Cruzamento 4 Dossiês Primários)"
tipo: relatorio-consolidado
versao: 2.0
data_criacao: 2026-03-05
fontes: [DOSSIE_PRIMARIO_p1d7jvT_fuw, DOSSIE_PRIMARIO_gEUtUdqiAyk, DOSSIE_PRIMARIO_Vgrs6EA4kCg, DOSSIE_PRIMARIO_pqtLLYyztc8]
status: Análise completa — 4 dossiês primários + V001-V004 + SYNKRA_FRAMEWORK
---

# GAPS E CONFIGURAÇÕES PENDENTES — V2
> Cruzamento completo dos 4 dossiês primários. Ordenado por impacto real na operação da agência.

---

## STATUS ATUAL DO WORKSPACE (05/03/2026)

| Item | Status | Notas |
|------|--------|-------|
| aios-core v4.4.6 instalado | ✅ FEITO | Instalado hoje |
| 12 agentes sincronizados (Claude + Codex) | ✅ FEITO | IDE sync ativo |
| 3 hooks registrados (synapse, journey, precompact) | ✅ FEITO | settings.json |
| Estrutura docs/ criada | ✅ FEITO | stories, prd, architecture, qa, framework |
| Journey Log ativo | ✅ FEITO | .aios/journey.log |
| Skills (skill-creator + pdf-to-markdown) | ✅ FEITO | 2 skills customizadas |
| Synapse Engine ativo | ✅ FEITO | Injeta contexto da agência |
| core-config.yaml corrigido | ✅ FEITO | codex: true, claude-code: true |

---

## GRUPO A — CRÍTICO (impacto imediato na operação)

---

### A1. SKILL DE OCR LOCAL — PDF → MARKDOWN
**Dossiê de origem:** V001 (p1d7jvT_fuw) — seção de Skills com carregamento lazy
**O que é:** Modelo de OCR rodando localmente (ex: Dipsic) que converte PDFs em Markdown sem consumir tokens da API Claude.
**Impacto documentado no dossiê:** 30 minutos de processamento → 5-6 minutos. Custo de API = zero.
**Situação atual:** skill-creator existe, mas a skill de OCR em si não foi criada.

**O que fazer:**
```bash
# Ativar skill-creator e criar a skill
@aios-master *task skill-creator
# Nomear: pdf-ocr-local
# Modelo base: Tesseract ou Docling (OCR local)
# Input: path de PDF
# Output: markdown otimizado para IA
```

**Prioridade:** 🔴 CRÍTICA — materiais/porsche-gwm/ tem PDFs que precisam ser processados

---

### A2. MULTI-MODELO POR FUNÇÃO — ESTRATÉGIA DE CUSTO
**Dossiê de origem:** V002 + V003 — Open Router + Haiku vs. Opus
**O que é:** Configurar qual modelo usar para cada tipo de tarefa, evitando pagar por Opus quando Haiku resolve.
**Citação exata do dossiê (V003):** "ou Opus ou Haiku, o modelo do meio é vômito" — Alan Nicolas.
**Situação atual:** .env tem OPENROUTER_API_KEY= (vazio). Não configurado.

**Estratégia prescrita nos dossiês:**
```yaml
# Adicionar ao .synapse/global ou core-config.yaml
model_strategy:
  planejamento_prd_arquitetura: claude-opus-4-6    # decisões de alto impacto
  execucao_codigo_stories: codex-ou-haiku          # 10x mais barato
  volume_raciocinio_baixo_custo: gemini-cli        # escrita pesada (já no .synapse/constitution)
  default: claude-sonnet-4-6
```

**Impacto:** Redução de 70-80% no custo de API (GPT-4.1: queda de 93% de custo vs. GPT-4).
**Prioridade:** 🔴 CRÍTICA — Open Router precisa de chave + configuração no synapse

---

### A3. MCPs — CLICKUP + NOTION
**Dossiê de origem:** V002 (gEUtUdqiAyk) — ClickUp como sistema de gestão integrado ao AIOX
**O que é:** Conexões do AIOX com ferramentas externas (APIs), permitindo que agentes criem/atualizem tarefas no ClickUp e no Notion automaticamente.
**Citação do dossiê:** "ex: conectar ao Meta Ads, ClickUp" — Pedro Valério.
**Situação atual:** core-config.yaml tem mcp.enabled: false, mcp.servers: [].

**O que fazer (via @devops exclusivamente):**
```bash
@devops *add-mcp
# Começar por: ClickUp MCP (tasks, projetos)
# Depois: Notion MCP (hub operacional da agência)
```

**Memória:** Hub Notion page_id: `31aff01f-f66b-8191-801d-fd2ca520d28f` já mapeado na MEMORY.md.
**Prioridade:** 🔴 CRÍTICA — sem MCP, tarefas de clientes não são gerenciadas automaticamente

---

### A4. BROWNFIELD DISCOVERY — WORKFLOW DE AUDITORIA
**Dossiê de origem:** V003 (Vgrs6EA4kCg) — caso R$86.000 em débito técnico identificado em 1h
**O que é:** Workflow que mobiliza múltiplos agentes para auditoria completa de qualquer sistema/processo existente.
**Aplicação para a agência:** Auditar processos de marketing existentes dos clientes (Porsche/GWM) antes de automatizar.
**Citação:** "só isso aqui... é um trabalho que custaria aí para você contratar alguém para fazer uns R$ 10.000" — Alan Nicolas (sobre documentação automática).

**Como usar:**
```bash
@architect *workflow brownfield-discovery
# Ou após criar atalho: @architect *brown-discovery
```

**Atalho pendente:** Criar alias `*brown-discovery` conforme prescrito no dossiê V003.
**Prioridade:** 🔴 CRÍTICA — primeiro passo antes de qualquer projeto de cliente

---

## GRUPO B — ALTO (curto prazo)

---

### B1. COMANDO HANDOFF ENTRE AGENTES
**Dossiê de origem:** V003 — identificado como gap explícito por Alan
**O que é:** Comando que resume o contexto da sessão atual e o transfere para o próximo agente sem re-explicação manual.
**Citação:** Handoff "ainda requer prompt manual — identificado como gap para criação de comando dedicado."
**Situação atual:** Não existe. Cada handoff é feito manualmente.

**Implementação sugerida:**
```bash
# Novo comando no aios-master ou task dedicada
*handoff @dev "contexto resumido da sessão + próximos passos"
# Automatiza: git status + arquivos modificados + story em andamento → prompt inicial do próximo agente
```

**Prioridade:** 🟠 ALTA — gargalo diário na passagem de contexto entre agentes

---

### B2. WORKERS — SCRIPTS DETERMINÍSTICOS PARA TAREFAS REPETITIVAS
**Dossiê de origem:** V002 + V004 — Workers são 80% das tarefas otimizáveis
**O que é:** Scripts que executam tarefas repetitivas sem precisar de LLM caro.
**Citação Pedro Valério:** "Cerca de 80% das tarefas otimizáveis como workers."
**Situação atual:** Zero workers implementados.

**Primeiros workers para criar (baseado nos dossiês):**
```
1. setup-project-folders — criar estrutura de pastas para novo projeto de cliente
2. create-brief-template — preencher template de brief a partir de dados do cliente
3. update-clickup-task — atualizar status de tarefa no ClickUp via API
4. generate-creative-batch — acionar pipeline de criativos com variáveis da taxonomia
```

**Como criar:**
```bash
@aios-master *create task worker-nome-da-tarefa
```

**Prioridade:** 🟠 ALTA — maior alavanca de redução de custo de API

---

### B3. ATALHO BROWNFIELD-DISCOVERY
**Dossiê de origem:** V003 — identificado explicitamente
**O que fazer:** Criar alias `*brown-discovery` que executa `workflow brownfield-discovery` no agente architect.
**Prioridade:** 🟠 ALTA — qualidade de vida diária

---

### B4. SKILL DE CONHECIMENTO — PORSCHE/GWM
**Contexto:** Victor atende Porsche/GWM via Grupo Mamac. Os PDFs estão em materiais/porsche-gwm/.
**O que fazer:** Após criar skill de OCR (A1), processar os 4 PDFs (Personas, Photo Checklist, Photo Guideline, Video Guideline) e criar uma skill de conhecimento específica do cliente.
**Resultado:** Agente de marketing com conhecimento profundo das diretrizes Porsche sem gastar tokens em cada sessão.

```
materiais/porsche-gwm/
├── Porsche Personas.pdf          → perfis de compradores
├── Porsche_Finder_Photo_Checklist_PT-BR.pdf → checklist de fotos
├── Porsche_Finder_Photo_Guideline_PT-BR.pdf → guia visual
└── Porsche_Finder_Video_Guideline_PT-BR.pdf → guia de vídeo
```

**Prioridade:** 🟠 ALTA — primeiro cliente concreto da agência

---

### B5. SELF-LEARNING NOTURNO (CRON JOB)
**Dossiê de origem:** V004 — "estudo noturno" do OpenClaw
**O que é:** Agente configurado para, durante a noite, pesquisar tendências e novas tecnologias e entregar relatório pela manhã via WhatsApp/Telegram.
**Citação:** "OpenClaw com Cron Job para, durante a noite, analisar o sistema, pesquisar novas tecnologias e otimizações."
**Situação atual:** Não implementado.

**Prioridade:** 🟠 ALTA — acelerador de aprendizado sobre AIOX e marketing

---

## GRUPO C — MÉDIO (2-4 semanas)

---

### C1. TRADUTOR N8N → AIOX
**Dossiê de origem:** V004 — "em construção"
**O que é:** Parser que lê JSON de workflow N8N exportado e gera tasks + workflow AIOX equivalentes.
**Impacto:** Importar templates da comunidade N8N para dentro do ecossistema AIOX.
**Prioridade:** 🟡 MÉDIA

---

### C2. CALCULADORA DE SQUADS
**Dossiê de origem:** V004 — criada ao vivo, botões incompletos
**O que é:** Ferramenta que calcula custo de equipe humana equivalente a cada squad.
**Uso:** Argumento de venda para novos clientes — mostrar ROI do squad vs. equipe humana.
**Prioridade:** 🟡 MÉDIA

---

### C3. TASK REVIEW-DE-TAREFAS
**Dossiê de origem:** V004 — Pedro não tinha a task no próprio sistema
**O que é:** Task formal no workflow de gestão que instrui agente @qa ou @pm a revisar tarefa finalizada.
**Prioridade:** 🟡 MÉDIA

---

### C4. AGENTE NOTURNO VIA WHATSAPP/TELEGRAM
**Dossiê de origem:** V004 — "receber relatórios e dar comandos por áudio"
**O que é:** Interface conversacional com o agente pessoal fora do terminal.
**Prioridade:** 🟡 MÉDIA

---

## INSIGHTS TÉCNICOS CRÍTICOS DOS DOSSIÊS

### 1. Inglês no código = economia de tokens
Arquivos 1 e 3: Nomes de variáveis, arquivos e comentários em inglês reduzem consumo de tokens e melhoram precisão. **Todo código gerado pelo AIOX deve seguir esse padrão.**

### 2. Comandos curtos > prompts longos
V003: "Quanto mais tu digita para IA, mais merda ela vai fazer." Workflows e comandos pré-configurados eliminam prompts verbosos.

### 3. Haiku para trabalho, Opus para validação
V003: "ou Opus ou Haiku, o modelo do meio é vômito." Regra binária: Opus apenas nos Quality Gates finais.

### 4. Workers são a base, não a exceção
V002 + V004: 80% das tarefas diárias devem ser workers determinísticos. Agentes são para os 20% que requerem julgamento.

### 5. Documentação é memória persistente
V001 + V002 + V003 + V004: CLAUDE.md / brandbook / taxonomia / .synapse/ eliminam re-explicação de contexto. Sem documentação, a IA começa do zero toda sessão.

### 6. Journey Log é evidência de qualidade
V004: Log detalhado de cada task permite criar "relatórios de aprendizado" baseados em dados — justifica ticket mais alto para clientes.

---

## SEQUÊNCIA LÓGICA DE IMPLEMENTAÇÃO

```
Semana 1 (AGORA):
  1. Open Router → configurar chave + estratégia multi-modelo
  2. Skill OCR PDF → processar materiais Porsche/GWM
  3. MCPs → @devops *add-mcp (ClickUp + Notion)

Semana 2:
  4. Workers (3 primeiros) → setup-project-folders, create-brief, update-clickup
  5. Handoff command → task dedicada no aios-master
  6. Brownfield Discovery → auditar processos dos clientes

Semana 3:
  7. Squad de Copywriting → 3-5 copywriters clonados (Ogilvy, Halbert, Hormozi, Erico Rocha)
  8. Skill Porsche/GWM → criar skill de conhecimento do cliente
  9. Self-learning noturno → cron job + relatório matinal

Semana 4:
  10. Squad Criativo → geração de criativos em escala (Porsche/GWM)
  11. Calculadora de Squads → ferramenta de venda
  12. Brownfield atalho → *brown-discovery alias
```

---

*Análise V2.0 — Orion (aios-master) | 2026-03-05*
*Baseado em: 4 dossiês primários + V001-V004 + SYNKRA_FRAMEWORK_COMPLETO*
