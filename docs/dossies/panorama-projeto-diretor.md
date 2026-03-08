# Panorama Geral: Projeto Diretor — Quem Faz o Que

**Data:** 2026-02-27
**Projeto:** Diretor — Assistente Criativo para Vitor (Bamaq Marketing)
**Framework:** Synkra AIOS v4.4.6

---

## 1. VISAO GERAL — DUAS CAMADAS DE AGENTES

Este projeto tem duas camadas completamente distintas de agentes:

```
CAMADA 1: QUEM CONSTROI          CAMADA 2: O QUE E CONSTRUIDO
(Time de Desenvolvimento)         (Produto para o Vitor)

  @po ──> @architect ──> @dev     diretor ──> legendador
              │                       │
          @analyst                  briefer
              │                       │
           @qa ──> @devops        guardiao ──> organizador
```

**Camada 1** = Agentes AIOS que vao DESENVOLVER o projeto (nos, o time)
**Camada 2** = Agentes CUSTOM que vao OPERAR para o Vitor (o produto)

---

## 2. CAMADA 1 — TIME DE DESENVOLVIMENTO (Quem Constroi)

Estes sao os agentes AIOS que ja existem no framework e que vao construir o sistema.

### 2.1. Lideranca do Projeto

```
                    ┌─────────────┐
                    │   GABRIEL   │
                    │  (Humano)   │
                    │ Lider Geral │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ AIOS MASTER │
                    │ Orquestrador│
                    │  Framework  │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
    │ ESTRATEGIA│   │ CONSTRUCAO│   │ QUALIDADE │
    │ & PRODUTO │   │ & CODIGO  │   │ & ENTREGA │
    └───────────┘   └───────────┘   └───────────┘
```

**Gabriel (Voce)** — Lider geral do projeto. Define visao, prioridades, valida entregas. Toma as decisoes finais de produto e tecnologia. O "CEO" do projeto.

**AIOS Master** (`@aios-master`) — Orquestrador do framework. Coordena o fluxo entre agentes, gerencia handoffs, detecta contexto e garante que o workflow flua corretamente.

### 2.2. Frente de Estrategia e Produto

| Agente | ID | Papel no Projeto | O Que Vai Fazer |
|--------|----|------------------|-----------------|
| **Product Owner** | `@po` | Dono do backlog | Cria e valida as stories do projeto. Define criterios de aceitacao. Prioriza o que entra em cada sprint. Garante que cada entrega gera valor real pro Vitor |
| **Product Manager** | `@pm` | Estrategista de produto | Cria o PRD (Product Requirements Document). Define metricas de sucesso. Mapeia a jornada do Vitor. Garante alinhamento entre o que construimos e o que o mercado precisa |
| **Analyst** | `@analyst` | Analista de negocios | Pesquisa profunda sobre o mercado automotivo, concorrentes, ferramentas existentes. Analisa dados de engajamento. Fundamenta decisoes com dados |
| **UX Expert** | `@ux-design-expert` | Designer de experiencia | Desenha a experiencia do Vitor com o sistema. Mapeia fluxos de conversa no WhatsApp. Garante que a interacao seja natural, sem atrito, "invisivel" |

**Workflow de Estrategia:**
```
@pm (define PRD) → @analyst (pesquisa) → @ux-design-expert (desenha UX) → @po (valida stories)
```

### 2.3. Frente de Construcao e Codigo

| Agente | ID | Papel no Projeto | O Que Vai Fazer |
|--------|----|------------------|-----------------|
| **Architect** | `@architect` | Arquiteto tecnico | Define a arquitetura do sistema: como o bot WhatsApp se conecta ao backend, como os agentes custom se comunicam, como o Drive e integrado, quais APIs usar |
| **Developer** | `@dev` | Desenvolvedor full-stack | Mao na massa. Implementa o bot WhatsApp, o pipeline de transcricao, o gerador de legendas, as integracoes com Drive e APIs. Escreve todo o codigo |
| **Data Engineer** | `@data-engineer` | Engenheiro de dados | Modela a base de conhecimento (modelos GWM, Porsche, guidelines). Projeta o armazenamento de historico de conteudos, metricas de engajamento, memoria dos agentes |

**Workflow de Construcao:**
```
@architect (define arquitetura) → @dev (implementa) → @data-engineer (modela dados)
```

### 2.4. Frente de Qualidade e Entrega

| Agente | ID | Papel no Projeto | O Que Vai Fazer |
|--------|----|------------------|-----------------|
| **QA** | `@qa` | Garantia de qualidade | Testa cada entrega: o bot responde certo? A legenda sai no formato correto? O arquivo vai pro Drive na pasta certa? O briefing e relevante? |
| **DevOps** | `@devops` | Infraestrutura e deploy | Configura o servidor, deploy do bot, CI/CD, monitoramento. Garante que o sistema fique no ar 24/7 pro Vitor usar a qualquer hora |
| **Scrum Master** | `@sm` | Gestor de sprint | Organiza sprints, cria stories, acompanha progresso, remove impedimentos. Garante que o time entrega no prazo e com qualidade |

**Workflow de Qualidade:**
```
@dev (implementa) → @qa (testa) → @devops (deploy) → @sm (tracking)
```

### 2.5. Fluxo Completo de uma Story (Development Lifecycle)

```
1. @po  → Cria story com criterios de aceitacao
   Arquivo: docs/stories/story-X.Y.Z.md

2. @architect → Define solucao tecnica
   Arquivo: docs/architecture/story-X.Y.Z-design.md

3. @dev → Implementa o codigo
   Handoff: .aios/handoffs/dev_to_qa.yaml

4. @qa → Testa (PASS/FAIL/CONCERNS)
   Se FAIL → volta pro @dev
   Se PASS → segue pro @devops

5. @devops → Deploy em producao
   Handoff: .aios/handoffs/qa_to_devops.yaml

6. @po → Valida entrega contra criterios
   Story marcada como DONE
```

---

## 3. CAMADA 2 — AGENTES DO PRODUTO (O Que o Vitor Usa)

Estes sao os agentes **custom** que vamos CRIAR. Eles nao existem no AIOS — nos vamos construi-los. Sao o produto final.

### 3.1. Visao Geral dos Agentes Custom

```
                         ┌───────────────┐
                         │    VITOR      │
                         │  (WhatsApp)   │
                         └───────┬───────┘
                                 │
                         ┌───────▼───────┐
                         │   DIRETOR     │
                         │ Orquestrador  │
                         │   Central     │
                         └───────┬───────┘
                                 │
            ┌────────────┬───────┼───────┬────────────┐
            │            │       │       │            │
      ┌─────▼─────┐ ┌───▼───┐ ┌─▼──┐ ┌──▼───┐ ┌─────▼─────┐
      │ LEGENDADOR│ │BRIEFER│ │MUSE│ │GUARD │ │ORGANIZADOR│
      │ Legendas  │ │Rotina │ │Cria│ │Guide │ │ Arquivos  │
      │ de Video  │ │Semanal│ │tivo│ │lines │ │  & Drive  │
      └───────────┘ └───────┘ └────┘ └──────┘ └───────────┘
```

### 3.2. Detalhamento de Cada Agente Custom

---

#### DIRETOR — O Orquestrador Central

```yaml
agent:
  id: diretor
  name: Diretor
  title: Diretor Criativo do Vitor
  icon: 🎬

whenToUse: >
  Ponto de entrada de TODA interacao do Vitor.
  Recebe mensagens no WhatsApp, interpreta a intencao
  e roteia para o agente especialista correto.

persona:
  archetype: Mentor Criativo
  tone: informal, direto, motivador
  vocabulary:
    - "E ai Vitor!"
    - "Bora?"
    - "Show, ficou brabo"
    - "Ja ta no Drive, suave"
  signature: "Diretor, seu parceiro de conteudo"

responsabilidades:
  - Receber TODAS as mensagens do Vitor no WhatsApp
  - Interpretar intencao (quer legenda? quer ideia? quer organizar?)
  - Rotear para o agente especialista correto
  - Consolidar respostas e devolver ao Vitor
  - Manter o contexto da conversa (memoria de sessao)
  - Ser o "rosto" do sistema — o Vitor so conhece o Diretor

nao_faz:
  - NAO processa video diretamente (delega pro Legendador)
  - NAO gera briefings do zero (delega pro Briefer)
  - NAO consulta guidelines sozinho (delega pro Guardiao)
  - NAO organiza arquivos (delega pro Organizador)

exemplo_interacao: |
  Vitor: [manda video]
  Diretor: "Show! Recebi o video. To mandando pro Legendador...
           Enquanto isso, esse video e pra GWM ou Porsche?"
  Vitor: "GWM"
  Diretor: "Beleza! Estilo bold, ne? Ja volto com 3 opcoes de legenda."
  [delega pro Legendador com contexto: marca=GWM, estilo=bold]
```

**Por que o Diretor existe:** O Vitor nao deve saber que existem 5 agentes por tras. Pra ele, existe UMA pessoa: o Diretor. Isso simplifica a experiencia e cria vinculo.

---

#### LEGENDADOR — O Especialista em Legendas

```yaml
agent:
  id: legendador
  name: Legendador
  title: Especialista em Legendas e Edicao
  icon: 🎯

whenToUse: >
  Quando o Vitor envia um video e precisa de legendas estilizadas,
  ou quando precisa de tratamento de imagem.

responsabilidades:
  - Extrair audio do video recebido (ffmpeg)
  - Transcrever audio (Whisper medium, pt-BR)
  - Gerar arquivo de legendas ASS/SRT com estilo do Vitor
  - Aplicar template correto por marca (GWM vs Porsche)
  - Aplicar animacoes de entrada/saida nas legendas
  - Oferecer 3 variacoes de estilo
  - Aprender preferencias do Vitor ao longo do tempo
  - Tratar fotos (upscale, contraste, padronizacao)

templates_legenda:
  gwm_bold:
    fonte: "Montserrat Bold, 48px"
    cor: "#FFFFFF"
    background: "rgba(0,155,72,0.85)"  # Verde GWM
    border_radius: "12px"
    animacao_entrada: "bounce-in 0.3s"
    animacao_saida: "slide-down 0.2s"
    posicao: "center-bottom, margem 80px"

  gwm_dinamico:
    fonte: "Inter Black, 52px"
    cor: "#FFFFFF"
    background: "rgba(30,30,30,0.9)"
    border_radius: "8px"
    animacao_entrada: "slide-up 0.25s"
    animacao_saida: "fade-out 0.2s"
    posicao: "center, margem 60px"

  porsche_elegante:
    fonte: "Helvetica Neue Light, 42px"
    cor: "#FFFFFF"
    background: "rgba(0,0,0,0.7)"
    border_radius: "0px"  # Porsche = linhas retas
    animacao_entrada: "fade-in 0.5s"
    animacao_saida: "fade-out 0.4s"
    posicao: "center-bottom, margem 100px"

  porsche_moderno:
    fonte: "Porsche Next Regular, 40px"
    cor: "#D5001C"  # Vermelho Porsche
    background: "rgba(255,255,255,0.95)"
    border_radius: "2px"
    animacao_entrada: "slide-right 0.4s"
    animacao_saida: "slide-left 0.3s"
    posicao: "lower-third"

pipeline_tecnico: |
  1. Recebe video (via Diretor)
  2. ffmpeg -i input.mp4 -vn -acodec pcm_s16le audio.wav
  3. whisper audio.wav --model medium --language pt
  4. Processa transcricao → segmentos com timestamps
  5. Aplica template de legenda → gera arquivo .ass
  6. Renderiza preview com ffmpeg (overlay legendas)
  7. Retorna 3 versoes ao Diretor
  8. Salva video + legenda no Drive (via Organizador)

dependencias:
  tools: [ffmpeg, whisper]
  apis: [claude-api]
  storage: [google-drive]
```

**Por que o Legendador e separado:** A geracao de legendas e a dor #1 do Vitor e o processo mais complexo tecnicamente. Merece um agente dedicado que faz SO isso com excelencia.

---

#### BRIEFER — O Gerador de Rotina

```yaml
agent:
  id: briefer
  name: Briefer
  title: Estrategista de Conteudo Semanal
  icon: 📋

whenToUse: >
  Toda segunda-feira as 8h (automatico) e quando o Vitor
  perguntar "o que posto hoje?" ou "me da uma ideia".

responsabilidades:
  - Gerar briefing semanal toda segunda-feira 8h (automatico)
  - Responder perguntas sobre "o que postar"
  - Conhecer todos os modelos GWM e Porsche da frota Bamaq
  - Rotacionar foco entre modelos para cobertura completa
  - Sugerir angulos de conteudo (carro, acessorios, opcionais, lifestyle)
  - Integrar condicoes comerciais do mes (quando informadas)
  - Rastrear progresso mensal (X/12 conteudos)
  - Celebrar conquistas do Vitor

base_conhecimento:
  gwm_modelos:
    - Haval H6 (HEV) — SUV hibrido, mais vendido
    - Haval H6 GT — Versao esportiva
    - Tank 300 — SUV off-road robusto
    - Tank 300 HEV — Versao hibrida (lancamento 2026)
    - Poer P30 — Picape
    - Ora 03 — Eletrico compacto
    - Haval H9 — SUV grande
    # Lancamentos 2026:
    - Tank 500, Tank 700
    - Poer P500 PHEV
    - Haval H6 Facelift Flex
    - Wey G9 Max
    - Ora 05

  porsche_modelos:
    - 911 (Carrera, Turbo, GT3)
    - Cayenne (S, GTS, Turbo GT)
    - Macan (Electric)
    - Panamera
    - Taycan (Turbo, Cross Turismo)
    - 718 (Cayman, Boxster)

  frentes_conteudo:
    - Apresentacao de modelo (walk-around)
    - Acessorios e opcionais
    - Boutique/lifestyle da marca
    - Comparativos entre versoes
    - Bastidores da concessionaria
    - Test drive / experiencia
    - Condicoes comerciais do mes
    - Dicas e curiosidades tecnicas
    - Eventos e lancamentos

formato_briefing: |
  ══════════════════════════════
  BRIEFING SEMANA {N} — {data}
  ══════════════════════════════

  PORSCHE (seg/qua/sex)
  Modelo-foco: {modelo}
  ─────────────────────
  1. {ideia_1} ({formato}: video {duracao})
  2. {ideia_2} ({formato}: carrossel {slides})
  3. {ideia_3} ({formato}: stories {qtd})

  GWM (ter/qui)
  Modelo-foco: {modelo}
  ─────────────────────
  1. {ideia_1} ({formato}: video {duracao})
  2. {ideia_2} ({formato}: reels {duracao})

  PROGRESSO DO MES: {x}/12 conteudos
  {barra_progresso}

  DESTAQUE DA SEMANA PASSADA:
  "{conteudo_que_performou_melhor}"
  ══════════════════════════════

trigger_automatico:
  tipo: scheduled
  cron: "0 8 * * 1"  # Segunda 8h
  canal: whatsapp
  mensagem_padrao: "Bom dia Vitor! Aqui ta o plano da semana..."
```

**Por que o Briefer e o agente mais importante:** O Vitor disse que precisa de "direcao" e "um mapa pra seguir". O Briefer e esse mapa. Se ele funcionar bem, todo o resto funciona por consequencia — porque o Vitor vai gravar mais, e quando gravar, vai usar o Legendador, e quando usar o Legendador, o Organizador salva tudo no Drive.

---

#### MUSE — O Consultor Criativo

```yaml
agent:
  id: muse
  name: Muse
  title: Consultor Criativo de Social Media Automotivo
  icon: 💡

whenToUse: >
  Quando o Vitor precisa de inspiracao, quer idealizar algo
  diferente, ou quer ir alem do basico.

responsabilidades:
  - Sugerir ideias criativas fora do obvio
  - Trazer referencias de social media automotivo de alto nivel
  - Criar roteiros completos no estilo do Vitor
  - Propor series de conteudo (ex: "7 dias, 7 acessorios do Tank 300")
  - Analisar tendencias de conteudo automotivo no Instagram/TikTok
  - Ser o "squad de consultores" em um so agente
  - Provocar o Vitor a sair do basico (sem ser chato)

persona:
  inspiracao: >
    Combina conhecimento de branding automotivo premium
    (Porsche, BMW, Mercedes) com a linguagem dinamica
    de criadores de conteudo brasileiros de sucesso.
  tom: >
    Provocador mas respeitoso. Traz ideias e pergunta
    "e se...?" em vez de dar ordens.

exemplo_interacao: |
  Vitor: "To sem ideia pro conteudo de amanha, GWM"
  Muse: "E ai, ja pensou em fazer um 'POV: voce entrando no
        Tank 300 pela primeira vez'? Tipo, camera em primeira
        pessoa, mostrando cada detalhe. O publico ama isso —
        e a GWM permite esse tipo de conteudo mais solto.

        Outra: '3 coisas que ninguem te conta sobre o Haval H6'.
        Formato lista com cortes rapidos. Funciona muito no Reels.

        Qual te pegou mais?"
```

**Por que o Muse existe:** O Vitor disse (linha 636-639): "pra mim, um cara que me da direcao... como um consultor, uma pessoa a seguir". O Muse e essa pessoa. E a ideia mais "fora da curva" do projeto — ninguem tem um consultor criativo de IA que conhece profundamente o segmento automotivo brasileiro E o estilo pessoal do produtor.

---

#### GUARDIAO — O Guardiao de Guidelines

```yaml
agent:
  id: guardiao
  name: Guardiao
  title: Guardiao de Brand Guidelines
  icon: 🛡️

whenToUse: >
  Quando o Vitor tem duvida se algo e permitido pelas guidelines
  da Porsche ou GWM, ou quando qualquer agente precisa validar
  se um conteudo esta em conformidade.

responsabilidades:
  - Conhecer TODAS as guidelines da Porsche (do PDF oficial)
  - Conhecer as guidelines da GWM (quando obtidas)
  - Responder perguntas do tipo "posso fazer X?"
  - Validar conteudo antes de submeter pra aprovacao
  - Alertar se algo fora do padrao for detectado
  - Diferenciar claramente regras Porsche vs GWM
  - Evitar que conteudo seja rejeitado na aprovacao

base_conhecimento:
  porsche:
    fonte: "PDF de guidelines oficial (a ser obtido com Vitor)"
    areas_cobertas:
      - Uso do emblema/logo (posicao, tamanho, fundo)
      - Paleta de cores oficial
      - Tipografia permitida
      - Tom de voz da marca
      - Restricoes de conteudo
      - Formato de materiais
      - Conceito "Destination Porsche"

  gwm:
    fonte: "A ser obtido — guidelines em evolucao"
    areas_cobertas:
      - Uso do logo GWM
      - Paleta de cores
      - Liberdade criativa (alta)
      - Tom de voz (moderno, acessivel)

exemplo_interacao: |
  Vitor: "Posso colocar o logo da Porsche em fundo vermelho?"
  Guardiao: "Pela guideline, o emblema Porsche deve ser usado
           preferencialmente em fundo escuro (preto ou cinza
           grafite) ou branco. Fundo vermelho nao esta entre
           as opcoes aprovadas. Quer uma alternativa?"
```

**Por que o Guardiao e essencial:** O Vitor mencionou que tem um fluxo de aprovacao. Conteudo rejeitado = tempo perdido. O Guardiao previne rejeicoes ANTES de submeter, economizando tempo e evitando frustracao.

---

#### ORGANIZADOR — O Gerente de Arquivos

```yaml
agent:
  id: organizador
  name: Organizador
  title: Gerente de Ativos Digitais
  icon: 📁

whenToUse: >
  Automaticamente, sempre que qualquer conteudo e processado.
  O Vitor NUNCA interage diretamente com o Organizador —
  ele opera em background.

responsabilidades:
  - Salvar automaticamente todo conteudo no Google Drive
  - Classificar por marca (GWM / Porsche)
  - Classificar por tipo (video, foto, roteiro, legenda)
  - Classificar por status (bruto, editado, aprovado)
  - Organizar por data (ano/mes)
  - Manter nomenclatura padronizada
  - Gerar relatorio semanal de ativos
  - Fazer backup de tudo que entra no sistema

regras_nomenclatura:
  videos: "{marca}_{modelo}_{tipo}_{data}.mp4"
  fotos: "{marca}_{modelo}_{data}_{seq}.jpg"
  roteiros: "{marca}_{modelo}_{data}_roteiro.md"
  legendas: "{marca}_{modelo}_{data}_legenda.ass"
  # Exemplo: gwm_tank300_walkaround_20260310.mp4

invisivel: true  # O Vitor nunca interage diretamente
```

**Por que o Organizador e invisivel:** Lembra da analise critica? Se o Vitor tiver que organizar algo, nao vai fazer. Entao o Organizador faz sozinho, em background, sem pedir nada.

---

## 4. COMO OS AGENTES SE COMUNICAM

### 4.1. Fluxo de uma Interacao Tipica

```
VITOR manda video pelo WhatsApp
         │
         ▼
    ┌─────────┐
    │ DIRETOR │ ← Interpreta: "video cru, precisa de legenda"
    └────┬────┘
         │ pergunta: "GWM ou Porsche?"
         │ Vitor: "GWM"
         │
         ├──────────────────────┐
         │                      │
    ┌────▼────┐           ┌─────▼─────┐
    │LEGENDADOR│          │ GUARDIAO  │
    │ Processa │          │ Valida se │
    │ legenda  │          │ ta dentro │
    │ GWM bold │          │ das rules │
    └────┬────┘           └─────┬─────┘
         │                      │
         │  3 opcoes prontas    │  OK, aprovado
         │                      │
    ┌────▼──────────────────────▼────┐
    │           DIRETOR              │
    │  Consolida e envia pro Vitor   │
    └────────────┬───────────────────┘
                 │
                 │  Em background (invisivel):
                 │
           ┌─────▼──────┐
           │ ORGANIZADOR │
           │ Salva tudo  │
           │ no Drive    │
           └─────────────┘
```

### 4.2. Fluxo do Briefing Semanal (Automatico)

```
Segunda-feira 8h (trigger automatico)
         │
    ┌────▼────┐
    │ BRIEFER │ ← Gera briefing baseado em:
    │         │   - Modelos nao cobertos
    │         │   - Performance da semana anterior
    │         │   - Condicoes comerciais do mes
    │         │   - Rotacao Porsche/GWM
    └────┬────┘
         │
    ┌────▼────┐
    │ DIRETOR │ ← Formata e envia via WhatsApp
    └────┬────┘
         │
         ▼
      VITOR recebe o briefing no WhatsApp
      sem ter pedido nada
```

### 4.3. Fluxo de Duvida de Guidelines

```
Vitor: "Posso usar emoji no post da Porsche?"
         │
    ┌────▼────┐
    │ DIRETOR │ ← Detecta: pergunta sobre guidelines
    └────┬────┘
         │
    ┌────▼────┐
    │ GUARDIAO│ ← Consulta base de guidelines Porsche
    │         │   Resposta: "Emojis devem ser evitados
    │         │   em comunicacoes oficiais Porsche..."
    └────┬────┘
         │
    ┌────▼────┐
    │ DIRETOR │ ← Traduz pro tom informal do Vitor
    └────┬────┘
         │
         ▼
      Vitor recebe resposta natural no WhatsApp
```

---

## 5. ARQUITETURA TECNICA

### 5.1. Stack Tecnologica

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│        WhatsApp (Evolution API / Baileys)         │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                   BACKEND                        │
│                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐│
│  │  Router de  │  │  Fila de    │  │ Scheduler││
│  │  Mensagens  │  │ Processam.  │  │  (cron)  ││
│  │  (Diretor)  │  │  (Bull/MQ)  │  │          ││
│  └──────┬──────┘  └──────┬──────┘  └────┬─────┘│
│         │                │               │      │
│  ┌──────▼────────────────▼───────────────▼────┐ │
│  │            Agentes Custom                   │ │
│  │  Legendador | Briefer | Muse | Guardiao    │ │
│  │                  | Organizador              │ │
│  └──────────────────┬─────────────────────────┘ │
│                     │                            │
│  ┌──────────────────▼─────────────────────────┐ │
│  │           Servicos / APIs                   │ │
│  │  Claude API | Whisper | FFmpeg | Drive API  │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                  STORAGE                         │
│                                                  │
│  Google Drive     │  SQLite/Postgres  │  Cache   │
│  (ativos media)   │  (historico,      │  (Redis) │
│                   │   metricas,       │          │
│                   │   preferencias)   │          │
└──────────────────────────────────────────────────┘
```

### 5.2. Tecnologias Escolhidas

| Componente | Tecnologia | Justificativa |
|------------|-----------|---------------|
| **Runtime** | Node.js / TypeScript | Ecossistema AIOS, performance, tipagem |
| **WhatsApp** | Evolution API | Open source, flexivel, bom pra MVP |
| **IA Texto** | Claude API (Anthropic) | Ja estamos no ecossistema, melhor pra instrucoes complexas |
| **Transcricao** | Whisper API (OpenAI) | Rapido, preciso em pt-BR, custo acessivel |
| **Video** | FFmpeg | Padrao industria, total controle sobre legendas |
| **Storage** | Google Drive API | Vitor ja usa, zero atrito de adocao |
| **Database** | SQLite (MVP) → PostgreSQL (escala) | Leve pra comecar, robusto pra crescer |
| **Filas** | BullMQ (Redis) | Processamento assincrono de videos |
| **Deploy** | Railway / Fly.io | Facil, barato, bom pra MVP |
| **Scheduler** | node-cron | Briefing semanal automatico |

---

## 6. ROADMAP DE CONSTRUCAO COM STORIES AIOS

### Sprint 1: Fundacao (Semana 1-2)

```
Story 1.1 — Setup do projeto e infraestrutura
  @architect → Define arquitetura base
  @dev → Inicializa projeto TypeScript, configura AIOS
  @devops → Setup CI/CD e ambiente de desenvolvimento

Story 1.2 — Bot WhatsApp basico
  @dev → Integra Evolution API, recebe/envia mensagens
  @qa → Testa envio/recebimento de texto, imagem, video, audio

Story 1.3 — Agente Diretor (v1)
  @dev → Implementa router de mensagens, deteccao de intencao
  @qa → Testa fluxos basicos de conversa
```

### Sprint 2: Legendador (Semana 3-4)

```
Story 2.1 — Pipeline de transcricao
  @dev → Integra Whisper API, ffmpeg para extracao de audio
  @qa → Testa com videos reais do Vitor

Story 2.2 — Gerador de legendas ASS
  @dev → Cria templates de legenda (GWM bold, Porsche elegante)
  @dev → Implementa animacoes (bounce, fade, slide)
  @qa → Valida qualidade visual com o Vitor

Story 2.3 — Integracao Legendador ↔ Diretor
  @dev → Fluxo completo: video entra → legenda sai
  @qa → Teste end-to-end pelo WhatsApp
```

### Sprint 3: Briefer + Organizador (Semana 5-6)

```
Story 3.1 — Base de conhecimento (modelos GWM/Porsche)
  @data-engineer → Modela dados dos modelos, acessorios, specs
  @dev → Carrega base no sistema

Story 3.2 — Agente Briefer (v1)
  @dev → Motor de sugestoes, template de briefing
  @dev → Scheduler para envio automatico segunda 8h
  @qa → Valida relevancia das sugestoes

Story 3.3 — Agente Organizador
  @dev → Integracao Google Drive API
  @dev → Classificacao e upload automatico
  @qa → Testa organizacao com diversos tipos de arquivo
```

### Sprint 4: Guardiao + Muse + Polish (Semana 7-8)

```
Story 4.1 — Agente Guardiao
  @dev → Processa PDF guidelines Porsche
  @dev → Motor de consulta a guidelines
  @qa → Testa com perguntas reais sobre guidelines

Story 4.2 — Agente Muse (v1)
  @dev → Motor de ideias criativas com base nos modelos
  @dev → Geracao de roteiros no estilo do Vitor
  @qa → Valida qualidade e relevancia dos roteiros

Story 4.3 — Onboarding do Vitor
  @ux-design-expert → Desenha experiencia de primeira vez
  @dev → Implementa fluxo de boas-vindas
  @qa → Testa com usuario real (Vitor)
```

---

## 7. METRICAS DE SUCESSO

| Metrica | Meta Mes 1 | Meta Mes 3 | Como Medir |
|---------|-----------|-----------|------------|
| **Uso semanal** | 3+ interacoes/semana | 5+/semana | Logs do WhatsApp |
| **Conteudos/mes** | 12 (basico) | 16+ (acima do basico) | Contador no Briefer |
| **Tempo de edicao** | -50% | -70% | Feedback do Vitor |
| **Legendas aceitas** | 60% sem ajuste | 85% sem ajuste | Taxa de aprovacao |
| **Abandono** | 0 (nao abandona) | 0 | Dias sem interacao |
| **Satisfacao** | "Caralho" na 1a vez | Nao consegue voltar | Feedback qualitativo |

---

## 8. RESUMO VISUAL — QUEM FAZ O QUE

```
╔══════════════════════════════════════════════════════════╗
║                    PROJETO DIRETOR                       ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  GABRIEL (Lider)                                         ║
║    └── AIOS Master (Orquestrador)                        ║
║          │                                               ║
║          ├── TIME DE ESTRATEGIA                          ║
║          │   ├── @pm ........... PRD e visao de produto   ║
║          │   ├── @analyst ...... Pesquisa e dados         ║
║          │   ├── @ux-design .... Experiencia do Vitor    ║
║          │   └── @po ........... Stories e backlog        ║
║          │                                               ║
║          ├── TIME DE CONSTRUCAO                          ║
║          │   ├── @architect .... Arquitetura tecnica      ║
║          │   ├── @dev .......... Codigo e implementacao   ║
║          │   └── @data-engineer  Base de conhecimento     ║
║          │                                               ║
║          ├── TIME DE QUALIDADE                           ║
║          │   ├── @qa ........... Testes e validacao       ║
║          │   ├── @devops ....... Deploy e infraestrutura  ║
║          │   └── @sm ........... Sprints e tracking       ║
║          │                                               ║
║          └── PRODUTO FINAL (Agentes Custom)              ║
║              ├── Diretor ....... Orquestrador central     ║
║              ├── Legendador .... Legendas de video        ║
║              ├── Briefer ....... Rotina semanal           ║
║              ├── Muse .......... Consultor criativo       ║
║              ├── Guardiao ...... Brand guidelines         ║
║              └── Organizador ... Arquivos no Drive        ║
║                                                          ║
║  VITOR (Usuario Final)                                   ║
║    └── So ve o "Diretor" pelo WhatsApp                   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

*Panorama Geral — Projeto Diretor*
*Framework: Synkra AIOS v4.4.6*
*"11 agentes constroem. 6 agentes operam. 1 usuario se beneficia."*
