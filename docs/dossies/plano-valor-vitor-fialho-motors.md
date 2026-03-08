# Plano de Valor: Vitor + KING → Fialho Motors

**Data:** 2026-03-03
**Contexto:** Analise cruzada entre capacidades do AIOS, perfil do Vitor, e necessidades da Fialho Motors
**Objetivo:** Definir o que ja pode ser entregue, o que precisa ser construido, e quais estruturas sao definitivas

---

## Situacao Atual

### O Que Existe Hoje

| Item | Status | Onde |
|------|--------|------|
| Conversa Vitor x Jucilene transcrita e analisada | Feito | docs/dossies/ |
| Identidade visual criada (nao documentada) | Feito | WhatsApp (disperso) |
| 7+ flyers entregues | Feito | WhatsApp |
| Fotos tratadas da Poer P30 | Feito | WhatsApp |
| Proposta comercial mensal | NAO FEITO | Jucilene pediu, Vitor nao formalizou |
| Gestao do Instagram | NAO FEITO | Jucilene pediu explicitamente |
| Captacao de drone | PROMETIDO desde jan | Nunca executado |
| Video interativo | PROMETIDO desde jan | Nunca executado |
| Sistema KING | EM DESIGN | Arquitetura definida, zero codigo |

### O Paradoxo Central

O Vitor entregou num domingo de folga, em 5 horas, um pacote que vale R$ 2.000-5.000:
- Identidade visual completa
- Multiplas variacoes de flyer
- Logo redesenhada
- Fotos tratadas com marca d'agua
- Copy institucional

Cobrou R$ 80.

**A Fialho Motors nao e so um job. E o primeiro caso de uso de um modelo de negocio escalavel.**

---

## CAMADA 1: O Que Pode Ser Entregue AGORA

Entregas que nao dependem do KING estar pronto. Podem ser feitas hoje usando AIOS como ferramenta de geracao + estruturacao.

### 1.1 Proposta Comercial de Gestao Mensal

**Agentes AIOS envolvidos:** `@analyst` (*create-project-brief) + `@pm` (*create-prd)

**Escopo da proposta:**

```
PACOTE BASICO — R$ 800/mes
├── 12 posts/mes (3 por semana)
│   ├── Feed: foto tratada do veiculo + copy
│   ├── Story: bastidores, chegada de veiculos
│   └── Reel: video curto (15-30s)
├── Identidade visual padronizada
├── Calendario mensal de conteudo
├── Cobertura de estoque atual
└── 1 flyer/mes para grupos WhatsApp

PACOTE COMPLETO — R$ 1.500/mes
├── Tudo do basico +
├── 2 captacoes de drone/mes (fachada + veiculos)
├── 1 video interativo/mes (apresentacao, test drive)
├── Gestao de stories (5/semana)
├── Flyers ilimitados para grupos
├── Relatorio mensal de performance
└── Kit de conteudo para WhatsApp (5 pecas/mes)
```

**Por que isso importa:** A Jucilene JA PEDIU. O unico bloqueio e o Vitor nao ter formalizado. Uma proposta profissional transforma "favor de amigo" em "servico contratado".

**Entregavel:** PDF com escopo, valores, exemplos visuais (usando as pecas ja criadas), cronograma, termos.

### 1.2 Brandbook da Fialho Motors

**Agentes AIOS envolvidos:** `@ux-design-expert` (*tokenize) + `@analyst` (*doc-out)

O Vitor ja criou a identidade visual mas nao documentou. Sem documentacao, a consistencia se perde.

**Conteudo do Brandbook:**

```
BRANDBOOK FIALHO MOTORS
│
├── Paleta de Cores
│   ├── Verde escuro principal: #1B3A2D (fundo)
│   ├── Dourado titulos: #C4A14A
│   ├── Vermelho logo: #CC1B1B
│   ├── Preto profundo: #0A0A0A (gradiente)
│   └── Branco texto: #FFFFFF
│
├── Tipografia
│   ├── Titulos: Serif bold (estilo metalico dourado)
│   ├── Subtitulos: Sans-serif caps espacado
│   └── Corpo: Sans-serif regular branco
│
├── Logo
│   ├── Versao principal (F vermelho 3D + texto dourado)
│   ├── Versao horizontal (logo + @fialhomotorscg)
│   ├── Versao icone (F sozinho — pra marca d'agua)
│   ├── Logo original Olhar Comunicacao Visual (referencia)
│   └── Regras de uso (fundo minimo, area de respiro)
│
├── Templates
│   ├── Flyer vertical (story/grupo WhatsApp)
│   ├── Flyer horizontal (feed Instagram)
│   ├── Post com veiculo (foto + logo + CTA)
│   └── Marca d'agua para fotos
│
├── Tom de Voz
│   ├── Profissional mas acessivel
│   ├── "Atendimento personalizado"
│   ├── "Especialidade em diversas marcas"
│   └── Evitar: agressividade, urgencia falsa
│
└── Exemplos Aplicados
    ├── Flyer grupo Havaleiros (aprovado pelo Marcos)
    ├── Post feed com Haval H6
    ├── Foto tratada Poer P30 com marca d'agua
    └── Post institucional com link WhatsApp
```

**Por que isso importa:** Transforma o Vitor de "freela que fez uns flyer" em "profissional que entregou identidade de marca". E quando o KING estiver pronto, o Guardiao ja tem a base de guidelines pra validar automaticamente.

### 1.3 Kit de Conteudo para Grupos de WhatsApp

**Agente AIOS envolvido:** `@analyst` (*brainstorm) para ideacao de angulos

A Jucilene precisa postar recorrentemente nos grupos Havaleiros (104 membros) e Daman (1-4). Cada post precisa de aprovacao do admin Marcos.

**Kit mensal:**

```
5 PECAS PRONTAS (rotacao mensal)
│
├── Peca 1: "Avaliacao Especializada"
│   Imagem: Logo + Haval H6 fundo
│   Copy: "Quer saber o valor do seu GWM? Avaliacao
│   gratuita com nossos especialistas."
│   Link: wa.me/67993295454
│
├── Peca 2: "Estoque Disponivel"
│   Imagem: Logo + foto real do estoque
│   Copy: "Seminovos GWM selecionados. Procedencia
│   garantida e atendimento personalizado."
│   Link: wa.me/67993295454
│
├── Peca 3: "Especialidade GWM"
│   Imagem: Logo + linha GWM (multi-modelo)
│   Copy: "Fialho Motors: sua referencia em GWM
│   em Campo Grande. Haval, Tank, Poer."
│   Link: wa.me/67993295454
│
├── Peca 4: "Troca com Avaliacao"
│   Imagem: Logo + icone de troca
│   Copy: "Pensando em trocar? Avaliamos seu veiculo
│   e facilitamos a troca. Fale conosco."
│   Link: wa.me/67993295454
│
└── Peca 5: "Atendimento Personalizado"
    Imagem: Logo + foto da loja/fachada
    Copy: "Atendimento sem pressa, com quem entende.
    Visite a Fialho Motors em Campo Grande."
    Link: wa.me/67993295454

REGRAS PARA POSTAGEM:
- 1 peca por semana no maximo (nao bombardear)
- Sempre com link direto pro WhatsApp na mensagem
- Mandar previa pro Marcos antes de postar
- Revezar entre as 5 pecas (nao repetir)
```

### 1.4 Calendario Mensal de Conteudo (Marco/Abril 2026)

**Agente AIOS envolvido:** `@pm` (*create-prd para estrutura) + `@analyst` (*brainstorm para angulos)

```
CALENDARIO @fialhomotorscg — MARCO 2026

Semana 1 (03-07):
├── Seg: Post feed — Apresentacao da loja (institucional)
├── Qua: Story — Bastidores (dia a dia na loja)
└── Sex: Reel — Walk-around de veiculo em destaque

Semana 2 (10-14):
├── Seg: Post feed — Haval H6 (foto tratada + ficha)
├── Qua: Story — "Voce sabia?" (curiosidade GWM)
└── Sex: Post feed — Seminovo da semana

Semana 3 (17-21):
├── Seg: Reel — Tank 300 (se disponivel em estoque)
├── Qua: Story — Depoimento cliente (se tiver)
└── Sex: Post feed — Poer P30 (foto tratada)

Semana 4 (24-28):
├── Seg: Post feed — Comparativo (GWM vs concorrente)
├── Qua: Story — Novidades GWM 2026 (12 lancamentos)
└── Sex: Reel — Resumo do mes (melhor conteudo)

ROTACAO DE MODELOS:
- Semana 1: Institucional/loja
- Semana 2: Haval H6 (mais vendido)
- Semana 3: Tank 300 ou Poer P30
- Semana 4: Mix/tendencias

FORMATOS:
- Feed: 1080x1350 (4:5)
- Story: 1080x1920 (9:16)
- Reel: 1080x1920 (9:16), 15-30s
```

---

## CAMADA 2: Estruturas Definitivas (Alimentam o KING)

Essas estruturas, uma vez criadas, sao **permanentes** — servem pro trabalho manual agora E alimentam os agentes do KING quando estiverem prontos.

### 2.1 Base de Conhecimento: Fialho Motors

**Agente AIOS que vai consumir:** Briefer + Muse + Guardiao
**Agente AIOS que cria:** `@data-engineer` (*model-domain)

```yaml
# knowledge-base/clients/fialho-motors.yaml

client:
  name: "Fialho Motors"
  legal_name: "Fialho Motors Ltda"  # confirmar
  instagram: "@fialhomotorscg"
  whatsapp: "5567993295454"
  location:
    city: "Campo Grande"
    state: "MS"

  contacts:
    - name: "Jucilene Diass"
      role: "Proprietaria"
      nickname: "Ju, Juju"
      communication_style: "Direta, entusiasmada, cobra resultados"
    - name: "Gigante"
      role: "Socio/Gerente"
      notes: "Quer contratar Vitor para trabalhos avulsos"

  brand:
    logo_source: "Olhar Comunicacao Visual"
    primary_color: "#1B3A2D"  # verde escuro
    secondary_color: "#C4A14A"  # dourado
    accent_color: "#CC1B1B"  # vermelho logo
    background: "#0A0A0A"  # preto gradiente
    typography_title: "Serif bold metalico"
    typography_body: "Sans-serif branco"
    tone: "Profissional mas acessivel"
    avoid: ["urgencia falsa", "agressividade", "precos no anuncio"]

  specialization:
    primary: "Seminovos multimarcas"
    focus_brand: "GWM"
    models_in_demand:
      - "Haval H6"
      - "Tank 300"
      - "Poer P30"
    services:
      - "Avaliacao de veiculos"
      - "Troca com avaliacao"
      - "Venda de seminovos"
      - "Atendimento personalizado"

  channels:
    instagram:
      handle: "@fialhomotorscg"
      frequency: "3 posts/semana"
      formats: ["feed", "story", "reel"]
    whatsapp_groups:
      - name: "Havaleiros & Havaleiras"
        members: 104
        admin: "Marcos"
        rules: "Aprovacao previa, nao bombardear, manter limpo"
        frequency: "1 post/semana max"
      - name: "Daman"
        variants: ["1", "2", "3", "4"]
        rules: "Similar ao Havaleiros"

  relationship:
    vitor_since: "2026-01-19"
    model: "Parceria → mensal (em negociacao)"
    pricing_current: "R$80 (avulso, subvalorizado)"
    pricing_target: "R$800-1500/mes"
    emotional_bond: "Alto — amizade pessoal, gratidao mutua"
```

### 2.2 Base de Conhecimento: GWM Modelos (Compartilhada Bamaq + Fialho)

**Agente AIOS que vai consumir:** Briefer + Muse
**Reutilizavel:** Sim — serve pra Bamaq E pra Fialho Motors

```yaml
# knowledge-base/brands/gwm-models-2026.yaml

brand: "GWM - Great Wall Motors"
market: "Brasil"
year: 2026
total_sold_2025: 42785
concessionarias: 130
new_models_2026: 12

models:
  current:
    - name: "Haval H6"
      segment: "SUV medio"
      price_range: "R$170-210k"
      selling_points: ["custo-beneficio", "tecnologia", "espaco"]
      content_angles: ["walk-around", "tecnologia embarcada", "comparativo"]

    - name: "Haval H6 GT"
      segment: "SUV coupe"
      selling_points: ["design esportivo", "performance"]
      content_angles: ["design", "lifestyle", "performance"]

    - name: "Tank 300"
      segment: "SUV off-road"
      selling_points: ["off-road", "robustez", "exclusividade"]
      content_angles: ["off-road", "acessorios", "aventura"]

    - name: "Poer P30"
      segment: "Picape media"
      selling_points: ["utilitario", "versatilidade", "cacamba"]
      content_angles: ["utilidade", "trabalho", "acessorios"]

    - name: "Ora 03"
      segment: "Hatch eletrico"
      selling_points: ["eletrico", "design", "urbano"]
      content_angles: ["sustentabilidade", "tech", "economia"]

  launching_2026:
    - "Tank 300 HEV"
    - "Tank 500"
    - "Tank 700"
    - "Poer P500 PHEV"
    - "Haval H6 Facelift Flex"
    - "Haval H9"
    - "Wey G9 Max"
    - "Ora 05"

content_freedom: "ALTA"
guidelines_strictness: "BAIXA"
brand_tone: "Moderno, tecnologico, acessivel"
notable: "Primeira marca no Brasil a fazer comercial 100% IA"
```

### 2.3 Template de Cliente (Replicavel)

**Por que isso e definitivo:** Quando o Vitor pegar o SEGUNDO cliente (e vai pegar), a estrutura ja existe. So preenche.

```yaml
# knowledge-base/templates/client-template.yaml

client:
  name: ""
  instagram: ""
  whatsapp: ""
  location:
    city: ""
    state: ""

  contacts:
    - name: ""
      role: ""
      communication_style: ""

  brand:
    primary_color: ""
    secondary_color: ""
    accent_color: ""
    typography_title: ""
    typography_body: ""
    tone: ""
    avoid: []

  specialization:
    primary: ""
    focus_brand: ""
    models_in_demand: []
    services: []

  channels:
    instagram:
      handle: ""
      frequency: ""
      formats: []
    whatsapp_groups: []

  relationship:
    vitor_since: ""
    model: ""  # avulso | mensal | parceria
    pricing: ""
```

---

## CAMADA 3: O Que o KING Possibilita (Quando Construido)

Aqui e onde o jogo muda. Com o KING operacional, o Vitor nao so atende a Fialho Motors melhor — ele **escala**.

### 3.1 Cenario Atual vs Com KING

```
HOJE (sem KING):
┌──────────────────────────────────────────┐
│  Jucilene manda mensagem no WhatsApp     │
│  → Vitor le quando pode                  │
│  → Pensa no que fazer                    │
│  → Abre Canva/CapCut                     │
│  → Cria do zero                          │
│  → Manda variacao                        │
│  → Espera feedback                       │
│  → Ajusta                                │
│  → Manda de novo                         │
│  → Cobra R$80                            │
│                                          │
│  Tempo: 5 horas                          │
│  Valor cobrado: R$80                     │
│  Valor real: R$2.000+                    │
└──────────────────────────────────────────┘

COM CLAUDIO:
┌──────────────────────────────────────────┐
│  Jucilene manda mensagem no WhatsApp     │
│  → Diretor classifica a demanda          │
│  → Squad Criativo ativa:                 │
│    - Muse gera 3 conceitos               │
│    - Guardiao valida contra brandbook     │
│    - Briefer contextualiza (modelo,       │
│      rotacao, timing)                     │
│  → Diretor consolida e apresenta         │
│    opcoes ao Vitor                        │
│  → Vitor escolhe e ajusta                │
│  → Entrega em 30 min (vs 5 horas)        │
│  → Cobra R$150-300 pelo servico           │
│    (ou ta no pacote mensal de R$1.200)    │
│                                          │
│  Tempo: 30 minutos                       │
│  Valor: dentro do contrato mensal        │
│  Satisfacao: alta (rapido + profissional) │
└──────────────────────────────────────────┘
```

### 3.2 Fluxos Automatizados por Agente

**BRIEFER para Fialho Motors:**
```
Toda segunda 8h:
├── Verifica estoque atual (se integrado)
├── Consulta calendario de conteudo
├── Gera sugestao da semana:
│   "Fialho Motors essa semana:
│    - Seg: Post do Haval H6 prata (ta no estoque ha 2 sem)
│    - Qua: Story mostrando movimento na loja
│    - Sex: Reel do Tank 300 (se tiver)"
├── Envia pro Vitor via Diretor
└── Vitor confirma ou ajusta em 1 minuto
```

**MUSE para Fialho Motors:**
```
Quando Vitor pede ideia:
├── Consulta base de conhecimento (modelos, tom, historico)
├── Verifica o que ja foi postado (evita repeticao)
├── Gera 3 conceitos criativos:
│   1. Conceito visual (descricao da peca)
│   2. Copy sugerida
│   3. Formato recomendado (feed/story/reel)
├── Guardiao valida cada conceito
└── Entrega consolidado ao Vitor
```

**LEGENDADOR para Fialho Motors:**
```
Quando Vitor manda video:
├── Identifica marca (GWM → template bold)
├── Transcreve audio (Whisper pt-BR)
├── Gera legendas estilizadas:
│   - Fonte grande, animacao bounce
│   - Marca d'agua Fialho Motors
│   - Cores do brandbook
├── Retorna video legendado em ~3 min
└── Organizador salva no Drive automaticamente
```

**GUARDIAO para Fialho Motors:**
```
Antes de qualquer entrega:
├── Verifica cores (paleta do brandbook)
├── Verifica logo (versao correta — o F certo!)
├── Verifica tom de voz (nao agressivo)
├── Verifica restricoes (sem preco no anuncio)
└── Retorna checklist: ✓ aprovado ou ⚠️ ajuste X
```

### 3.3 O Modelo de Negocio Escalavel

```
HOJE:
  1 cliente (Bamaq) + 1 job avulso (Fialho) = ~salario fixo + R$80

COM KING:
  1 cliente fixo (Bamaq)
  + 3-5 clientes mensais (Fialho, Gigante, outros)
  + kit de conteudo para grupos WhatsApp
  = salario fixo + R$3.000-6.000/mes extra

POR QUE ESCALA:
  - Brandbook: cria 1 vez, usa pra sempre
  - Base de conhecimento: cria 1 vez, sistema consulta
  - Calendario: Briefer gera automaticamente
  - Pecas visuais: Muse sugere, Vitor executa em 30% do tempo
  - Validacao: Guardiao garante qualidade sem esforco

TEMPO POR CLIENTE:
  Sem KING: 15-20 horas/mes por cliente
  Com KING: 5-8 horas/mes por cliente
  → Capacidade: de 1-2 clientes pra 5-6 clientes
```

---

## CAMADA 4: Plano de Acao Imediato

### O Que Fazer ESSA SEMANA

```
PRIORIDADE 1 (pode fazer agora):
┌──────────────────────────────────────────┐
│ □ Criar proposta comercial pra Jucilene  │
│   → Pacote mensal R$800-1.500            │
│   → PDF profissional com escopo          │
│   → Usar pecas ja criadas como exemplo   │
│   → Enviar ate sexta                     │
│                                          │
│ AGENTES AIOS: @analyst + @pm             │
│ STORY: "Proposta comercial Fialho Motors"│
└──────────────────────────────────────────┘

PRIORIDADE 2 (pode fazer essa semana):
┌──────────────────────────────────────────┐
│ □ Documentar brandbook Fialho Motors     │
│   → Extrair cores/fontes das pecas       │
│   → PDF com guidelines basicas           │
│   → Serve como entrega pro cliente       │
│     E como input pro Guardiao            │
│                                          │
│ AGENTES AIOS: @ux-design-expert          │
│ STORY: "Brandbook Fialho Motors"         │
└──────────────────────────────────────────┘

PRIORIDADE 3 (pode fazer em paralelo):
┌──────────────────────────────────────────┐
│ □ Criar base de conhecimento YAML        │
│   → fialho-motors.yaml                   │
│   → gwm-models-2026.yaml                 │
│   → client-template.yaml                 │
│                                          │
│ AGENTES AIOS: @data-engineer             │
│ STORY: "Knowledge base de clientes"      │
└──────────────────────────────────────────┘
```

### O Que Fazer NO PROXIMO MES

```
DESENVOLVIMENTO CLAUDIO:
┌──────────────────────────────────────────┐
│ Sprint 1 (Semana 1-2):                   │
│ □ WhatsApp bot basico (Evolution API)    │
│ □ Roteamento de intencao (Diretor)       │
│ □ Legendador MVP (Whisper + FFmpeg)      │
│                                          │
│ Sprint 2 (Semana 3-4):                   │
│ □ Briefer com calendario automatico      │
│ □ Guardiao com brandbook digital         │
│ □ Organizador com Google Drive API       │
│                                          │
│ AGENTES AIOS: @architect + @dev + @qa    │
│ EPICO: "Projeto Diretor — MVP"           │
└──────────────────────────────────────────┘
```

---

## Resumo: Mapa de Valor Completo

```
                    VALOR AGREGADO
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    AGORA (manual)   CURTO PRAZO    MEDIO PRAZO
    sem KING         com AIOS       com KING
         │               │               │
    ┌────┴────┐     ┌────┴────┐     ┌────┴────┐
    │Proposta │     │Knowledge│     │WhatsApp  │
    │comercial│     │base em  │     │bot com   │
    │R$800-   │     │YAML     │     │agentes   │
    │1.500/mes│     │(clientes│     │autonomos │
    │         │     │ modelos)│     │          │
    │Brandbook│     │Template │     │Briefing  │
    │Fialho   │     │replica- │     │automatico│
    │Motors   │     │vel pra  │     │toda      │
    │         │     │novos    │     │segunda   │
    │Kit      │     │clientes │     │          │
    │grupos   │     │         │     │Legendas  │
    │WhatsApp │     │Calenda- │     │automa-   │
    │         │     │rio auto-│     │ticas     │
    │Calenda- │     │matico   │     │          │
    │rio      │     │via AIOS │     │Validacao │
    │mensal   │     │         │     │auto de   │
    │         │     │Stories  │     │brand     │
    └─────────┘     │AIOS pra │     │          │
                    │cada     │     │Multi-    │
                    │entrega  │     │cliente   │
                    └─────────┘     │escalavel │
                                    └──────────┘

    Valor gerado:    Valor gerado:    Valor gerado:
    R$1.500/mes      Estrutura        R$3.000-6.000/mes
    (1 cliente)      permanente       (5-6 clientes)
                     reutilizavel     com mesmo esforco
```

---

*Documento gerado como parte do Projeto Diretor — KING*
*Referencia cruzada: dossie-conversa-vitor-jucilene-fialho-motors.md + panorama-projeto-diretor.md*
