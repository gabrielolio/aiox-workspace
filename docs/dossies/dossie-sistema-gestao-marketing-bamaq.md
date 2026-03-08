# Dossie: Sistema de Gestao de Conteudo para Marketing - Grupo Bamaq

> **Status:** SUPERSEDED — Este dossie representa a analise inicial. A visao foi revisada e
> aprofundada em `maturacao-projeto-vitor-bamaq.md` (autocritica e redefinicao de prioridades)
> e consolidada em `panorama-projeto-diretor.md` (arquitetura definitiva).
> Mantenha este arquivo como registro historico da evolucao do pensamento.

**Data:** 2026-02-26
**Fonte:** Transcricao de conversa (audio de 32 minutos)
**Participantes:** Gabriel (consultor/desenvolvedor) e Vitor Lopes (produtor de conteudo no Grupo Bamaq)
**Contexto:** Levantamento de requisitos para automacao de processos de marketing

---

## 1. Resumo Executivo

A conversa captura um levantamento de requisitos entre Gabriel e um produtor de conteudo que trabalha no departamento de marketing do **Grupo Bamaq**, atendendo as marcas **GWM** e **Porsche**. O produtor e responsavel por gravar, editar e publicar conteudo para redes sociais de ambas as marcas, alternando entre Porsche (segunda, quarta, sexta) e GWM (terca, quinta).

Foram identificados **tres pilares de automacao** que podem gerar impacto imediato no dia a dia do produtor:

1. **Editor de Video Assistido por IA** — automatizar a parte processual da edicao (legendas, transicoes, padronizacao)
2. **Orquestrador de Conhecimento/Rotina** — organizar demandas, rotina de criacao e insights de conteudo
3. **Organizador de Documentos** — centralizar e estruturar todos os ativos (videos, fotos, roteiros) no Drive

---

## 2. Contexto do Profissional

### Perfil
- **Cargo:** Produtor de conteudo / Social media
- **Empresa:** Grupo Bamaq (Bamaq Automoveis)
- **Marcas atendidas:** GWM e Porsche
- **Rotina:** Porsche seg/qua/sex | GWM ter/qui (sazonal, pode variar)
- **Ferramentas atuais:** CapCut (edicao), galeria do celular e Drive (armazenamento), WhatsApp (comunicacao de demandas), Notas (anotacoes de segunda-feira)

### Responsabilidades
- Gravacao de video (captura de takes)
- Selecao de takes bons
- Tratamento/edicao de imagem (upscale, contraste, qualidade)
- Edicao de video no CapCut
- Adicao de legendas com animacoes
- Postagem nas redes sociais
- Criacao de roteiros e ideias de conteudo

### Fluxo de Aprovacao
- O produtor cria o conteudo com relativa liberdade
- Submete para aprovacao da gestao antes de publicar
- Recebe demandas comerciais via WhatsApp (formato informal)
- Poucas pessoas enviam demandas (2-3 pessoas)
- Frequencia de demandas externas: baixa

---

## 3. Dores e Problemas Identificados

### 3.1. Edicao de Legendas (Dor Principal)
- **Problema:** A legenda automatica do CapCut tem animacoes limitadas e "e uma aposta"
- **O que quer:** Legendas maiores, com design curvo, animacoes de entrada/saida (subindo, descendo, fugindo)
- **Estilo preferido:** Formato atual do Instagram — preenchido, visivel, letras grandes, com transicoes animadas
- **Impacto:** Cada video precisa do mesmo padrao de edicao; fazer uma por uma e demorado e cansativo
- **Citacao:** "Tudo tem que ter o mesmo padrao de edicao se nao fica ruim, nao tem engajamento"

### 3.2. Falta de Constancia de Postagem
- **Problema:** Tira fotos mas nao "tira o tempo" para editar e postar
- **Causa raiz:** O processo de edicao e padronizacao consome muito tempo
- **Citacao:** "As vezes eu tiro uma foto, nao tiro o tempo para editar e nao posto"

### 3.3. Falta de Rotina de Criacao
- **Problema:** Nao tem direcionamento; faz "o basico" (entrega o minimo necessario)
- **Causa raiz:** Autonomia excessiva sem framework de criacao; depende de demandas esporadicas
- **Citacao:** "Eu faco o basico [...] As pessoas nao chegam e falam, po mano, faz um video X"
- **Necessidade:** Um mapa/guia que de direcao e ideias de conteudo

### 3.4. Organizacao de Arquivos
- **Problema:** Conteudo disperso entre galeria do celular e Drive, sem estrutura
- **Sem controle de versao:** Roteiros, fotos e videos nao estao centralizados
- **Citacao:** "A questao de organizacao do drive... essa parte e bem importante"

### 3.5. Comunicacao Informal de Demandas
- **Problema:** Demandas chegam via WhatsApp de forma informal
- **Sem padronizacao:** Informacoes sobre condicoes/campanhas do mes chegam de forma nao estruturada
- **Citacao:** "Geralmente no WhatsApp mesmo [...] informal"

---

## 4. Diferencas entre GWM e Porsche (Impacto na Solucao)

| Aspecto | GWM | Porsche |
|---------|-----|---------|
| **Liberdade criativa** | Alta — marca chinesa, mais solta, menos restricoes | Baixa — restricoes rigidas de brand guidelines |
| **Exemplos de restricao** | Permite animacoes diferentes, mais criatividade | "O emblema tem que estar em pe", restricao de pasta |
| **Inovacao com IA** | Primeira marca no Brasil a fazer comercial com IA | Mais conservadora, foco na experiencia humana |
| **Volume de modelos** | Alto (12 lancamentos em 2026) | Moderado |
| **Publico** | Classe media-alta, tech-savvy | Alta renda, entusiastas de luxo |
| **Material de guidelines** | Em evolucao | PDF formal do que pode/nao pode |

**Observacao importante:** O produtor mencionou que possui um **PDF com guidelines da Porsche** (o que pode e nao pode). Esse material e extremamente valioso para alimentar agentes de IA.

---

## 5. Visao Filosofica sobre IA no Marketing (Principios Definidos)

Gabriel estabeleceu principios claros durante a conversa que devem guiar qualquer solucao:

### Principio 1: Humano no Centro
> "O que conecta as pessoas e o que tem que ser valorizado e justamente a parte pessoal. A parte humana."

- IA nao deve criar pessoas para anuncios
- IA nao deve substituir a conexao humana com a audiencia
- Conteudo deve ser autentico e pessoal

### Principio 2: IA Otimiza Processos, Nao Substitui Criatividade
> "O que tem que ser otimizado e a parte processual. E assim que eu acho que as ferramentas tem que ser encaixadas."

- Automatizar o trabalho braco (80% repetitivo)
- Focar no que o produtor sabe e gosta de fazer (20% criativo)
- Metodo 80/20 (Pareto)

### Principio 3: Personalidade, Nao Genericidade
> "Voce quer um negocio bom, so que pra isso voce precisa de mais repertorio nele."

- Agentes devem entender o estilo pessoal do produtor
- Nao basta um padrao generico; precisa replicar o jeito que ele gosta
- Construir repertorio ao longo do tempo

---

## 6. Tres Pilares da Solucao Proposta

### Pilar 1: Editor de Video Assistido por IA

**Objetivo:** Automatizar a parte processual da edicao de video

**Funcionalidades identificadas:**
- Transcricao automatica de audio com legendas estilizadas
- Animacoes de legenda personalizaveis (subindo, descendo, transicoes)
- Padronizacao automatica de estilo (letras grandes, design curvo, formato cheio)
- Templates de edicao por tipo de conteudo (comercial vs. apresentacao de carro)
- Tratamento automatico de imagem (upscale, contraste, qualidade)
- Batch processing — editar multiplos conteudos com mesmo padrao

**Diferenciacao por marca:**
- Template GWM: mais liberdade criativa, animacoes variadas
- Template Porsche: padrao rigoroso conforme guidelines (PDF)

**Prioridade:** ALTA (maior dor identificada)

### Pilar 2: Orquestrador de Conhecimento e Rotina

**Objetivo:** Criar estrutura e direcao para a rotina de criacao de conteudo

**Funcionalidades identificadas:**
- Cronograma semanal de conteudo com sugestoes
- Roteiro semanal baseado em modelos de carros (abordar um modelo por semana)
- Insights de criacao (acessorios, opcionais, boutique, diferentes angulos sobre cada modelo)
- Pipeline de conteudo: modelos -> acessorios -> opcionais -> temas derivados
- Analise de engajamento para refinar o que funciona
- Agenda de demandas (substituir WhatsApp informal)
- Criacao de meta minima (ex: 12 conteudos/mes em stand-by)

**Estrategia de conteudo proposta:**
1. Primeira camada: base de conhecimento dos carros
2. Segunda camada: acessorios e opcionais de cada modelo
3. Testar o que gera engajamento
4. Refinar e expandir com base nos resultados

**Ideia avancada mencionada:** Criar agentes com personalidade de social media experts do segmento automotivo que conversam entre si e geram ideias (squad de consultores virtuais)

**Prioridade:** MEDIA-ALTA (impacto estrategico)

### Pilar 3: Organizador de Documentos no Drive

**Objetivo:** Centralizar e estruturar todos os ativos de marketing

**Funcionalidades identificadas:**
- Estrutura de pastas padronizada no Google Drive
- Separacao por marca (GWM / Porsche)
- Categorias: videos, fotos, roteiros, conteudos aprovados, rascunhos
- Backup semanal integrado a rotina de segunda-feira
- Versionamento de roteiros e materiais
- Armazenamento de guidelines de cada marca
- Possibilidade de vinculacao com sistema de agentes

**Decisao do produtor:** Preferiu comecar com **Google Drive** (ja usa e atende) em vez de Obsidian (mais complexo para o momento)

**Consideracao sobre Obsidian:** Gabriel usa pessoalmente e recomendou, mas concordou que para o contexto atual (midia e foto, pouco texto) o Drive e mais adequado. Conforme a rotina de roteiros crescer, texto se torna mais importante e Obsidian pode ser reconsiderado.

**Prioridade:** MEDIA (fundacao necessaria)

---

## 7. Contexto do Mercado (Pesquisa Complementar)

### Grupo Bamaq
- Faturamento de ~R$ 3,2 bilhoes (2023)
- Presente em 18 estados + DF
- Opera concessionarias GWM em BH (3 lojas), Contagem, Campo Grande e Dourados
- Opera Porsche Centers em BH, Salvador e Campo Grande
- Bamaq Automoveis cresceu 60% no mercado mineiro em 2025
- Minas Gerais e o 2o maior mercado Porsche do Brasil

### GWM no Brasil
- 42.785 veiculos vendidos em 2025 (22% acima da meta)
- 130 concessionarias em operacao
- 12 novos modelos previstos para 2026 (alto volume de demanda de marketing)
- Modelo digital-first: e-commerce, app, 23% das vendas fora do horario comercial
- Primeira marca no Brasil a fazer comercial com IA

### Porsche no Brasil
- 6.237 unidades vendidas em 2024 (recorde)
- Conceito "Destination Porsche" — concessionarias como destinos
- Padrao ultra-premium de comunicacao e marketing
- Rigor extremo nas guidelines de marca

---

## 8. Plano de Acao Proposto

### Fase 1: Fundacao (Imediato)
- [ ] Criar estrutura de pastas no Google Drive (por marca, tipo de conteudo)
- [ ] Obter e processar o PDF de guidelines da Porsche
- [ ] Definir padrao de edicao preferido (documentar estilo de legendas, transicoes)
- [ ] Estabelecer meta minima de conteudo mensal (12 conteudos sugeridos)

### Fase 2: Automacao Basica (Curto Prazo)
- [ ] Desenvolver pipeline de transcricao automatica (Whisper)
- [ ] Criar templates de legenda animada por marca (GWM vs Porsche)
- [ ] Implementar organizacao automatica de arquivos no Drive
- [ ] Criar cronograma semanal com sugestoes de conteudo por modelo

### Fase 3: Agentes Inteligentes (Medio Prazo)
- [ ] Agente de edicao de video com personalidade/estilo do produtor
- [ ] Agente orquestrador de rotina (demandas, cronograma, insights)
- [ ] Agente organizador de documentos (classificacao automatica)
- [ ] Squad de consultores virtuais (social media experts do segmento automotivo)

### Consideracoes de Custo
- Fase 1: Custo zero (ferramentas gratuitas)
- Fase 2: Custo minimo (infraestrutura basica)
- Fase 3: Custo de mensalidade para agentes/cloud (a ser dimensionado)

---

## 9. O Que Pode Ser Aproveitado

1. **Transcricao e organizacao de conversas** — Ja demonstrado neste dossie; pode ser rotina
2. **Estrutura de pastas no Drive** — Facil de implementar, impacto imediato
3. **Templates de edicao por marca** — Resolver a maior dor (legendas) de forma escalavel
4. **Cronograma de conteudo com IA** — Gerar ideias semanais baseadas nos modelos da frota
5. **PDF de guidelines da Porsche como base de conhecimento** — Alimentar agentes com regras da marca
6. **Metodo 80/20** — Automatizar o repetitivo, liberar tempo para criatividade

## 10. O Que Pode Ser Melhorado

1. **Processo de demandas** — Sair do WhatsApp informal para algo rastreavel
2. **Rotina de backup** — Integrar na rotina de segunda-feira um backup estruturado
3. **Documentacao de roteiros** — Comecar a registrar roteiros para criar padrao da marca
4. **Analise de engajamento** — Metricas para saber o que funciona e refinar conteudo
5. **Guidelines da GWM** — Obter material equivalente ao PDF da Porsche

## 11. O Que Deve Ser Descartado ou Adiado

1. **Obsidian** — Complexo demais para o momento; Drive atende melhor agora
2. **Pessoas geradas por IA em anuncios** — Principio filosofico: manter conexao humana
3. **Automacao total da criacao** — A criatividade deve permanecer humana; IA so nos processos
4. **Infraestrutura complexa customizada** — Comecar simples, evoluir gradualmente
5. **Agentes multi-personalidade (squad)** — Ideia avancada, adiar para Fase 3

---

## 12. Transcricao Completa

A transcricao completa da conversa (32 minutos, ~700 linhas) esta disponivel em:
- **Texto limpo:** `docs/transcricoes/conversa-bamaq-marketing-20260226.txt`
- **Formato SRT (com timestamps):** `docs/transcricoes/conversa-bamaq-marketing-20260226.srt`

---

*Dossie gerado automaticamente pelo KING*
*Baseado em transcricao de audio via OpenAI Whisper (modelo medium, pt-BR)*
*Pesquisa de contexto via web search*
