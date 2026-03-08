# KING — Visao Geral do Sistema

**Versao:** 1.1
**Data:** 2026-03-04
**Status:** BACKGROUND — amadurecendo em paralelo ao projeto Fialho Motors

---

## O Que e o KING

KING e o sistema de automacoes e inteligencia criativa do Vitor King. Transforma o fluxo de trabalho de um produtor de conteudo automotivo — que hoje opera com WhatsApp + CapCut + ChatGPT — em uma operacao assistida por agentes de IA especializados.

**Problema central:** O Vitor produz conteudo de alta qualidade (identidade visual, flyers, videos, fotos) mas opera sem estrutura, sem rotina, sem precificacao adequada. Ele cobra R$80 por um trabalho que vale R$2.000-5.000.

**Solucao:** 6 agentes de IA que operam via WhatsApp, cada um especialista em uma frente. Para o Vitor, existe apenas UM ponto de contato: o Diretor.

---

## Posicionamento Estrategico (Atualizado 2026-03-04)

O KING e o projeto de **longo prazo**. O foco imediato e o **projeto Fialho Motors** (`projects/fialho-motors/`), que opera 100% manual.

```
FOREGROUND: Fialho Motors → Manual, templates, entregas semanais
BACKGROUND: KING System  → Amadurecendo com repertorio real da Fialho
FUTURO:     KING escala   → Quando Vitor tiver 5+ clientes freelance
```

A experiencia manual com a Fialho gera o MELHOR insumo para o KING: dores reais, fluxos validados, pontos de automacao comprovados.

### Foco do KING: Bamaq (Nao Fialho)

| Aspecto | Fialho Motors | Bamaq (foco KING) |
|---------|---------------|-------------------|
| Volume | 12 posts/mes | 20+ posts/mes |
| Marcas | 1 (propria) | 2 (Porsche + GWM) com guidelines opostas |
| Legendas | Poucos videos | Constantes |
| Briefing auto | Desnecessario | Critico (20+ modelos) |
| Retorno da IA | Nao se paga | Se paga em produtividade |

## Clientes no Ecossistema

| Cliente | Tipo | Atendido por | Status |
|---------|------|-------------|--------|
| **Grupo Bamaq** | Empregador (CLT) | KING (futuro) | GWM (ter/qui) + Porsche (seg/qua/sex) |
| **Fialho Motors** | Freelance | Projeto manual separado | ATIVO — `projects/fialho-motors/` |
| **Gigante** | Freelance | Projeto manual (pipeline) | Socio da Fialho, quer contratar |

---

## Arquitetura: Duas Camadas

### Camada 1 — Quem Constroi (Time AIOS)

Agentes do framework Synkra AIOS que DESENVOLVEM o sistema:

| Agente | Funcao |
|--------|--------|
| @po | Stories e backlog |
| @architect | Arquitetura tecnica |
| @dev | Implementacao |
| @qa | Testes e validacao |
| @devops | Deploy e infra |
| @sm | Sprints |
| @analyst | Pesquisa e dados |
| @pm | Visao de produto |
| @data-engineer | Knowledge base |
| @ux-design-expert | UX do Vitor |

### Camada 2 — O Que e Construido (Agentes Custom)

Agentes que OPERAM para o Vitor no dia a dia:

| Agente | Funcao | Interface |
|--------|--------|-----------|
| **Diretor** | Orquestrador central — recebe tudo, roteia pra especialistas | WhatsApp (unico ponto de contato) |
| **Legendador** | Legendas estilizadas em videos (Whisper + FFmpeg + ASS) | Invisivel (via Diretor) |
| **Briefer** | Briefing semanal automatico + ideias de conteudo | WhatsApp (seg 8h automatico) |
| **Muse** | Consultor criativo — ideias fora do obvio, roteiros | Via Diretor |
| **Guardiao** | Valida conteudo contra brand guidelines (Porsche/GWM) | Via Diretor |
| **Organizador** | Salva tudo no Google Drive automaticamente | 100% invisivel (background) |

---

## Stack Tecnologica

| Componente | Tecnologia |
|------------|-----------|
| Runtime | Node.js / TypeScript |
| WhatsApp | Evolution API |
| IA Texto | Claude API (Anthropic) |
| Transcricao | Whisper (OpenAI) |
| Video | FFmpeg |
| Storage | Google Drive API |
| Database | SQLite (MVP) → PostgreSQL |
| Filas | BullMQ (Redis) |
| Deploy | Railway / Fly.io |
| Scheduler | node-cron |
| Framework | Synkra AIOS v4.4.6 |

---

## Roadmap

### Sprint 1 (Semana 1-2): Fundacao
- Setup TypeScript + Evolution API
- Bot WhatsApp basico (recebe/envia mensagens)
- Diretor v0 (router de intencao)

### Sprint 2 (Semana 3-4): Legendador
- Pipeline Whisper + FFmpeg
- Templates de legenda (GWM bold, Porsche elegante)
- Integracao Legendador ↔ Diretor

### Sprint 3 (Semana 5-6): Briefer + Organizador
- Knowledge base carregada
- Briefer com envio automatico
- Google Drive API

### Sprint 4 (Semana 7-8): Guardiao + Muse + Polish
- Guidelines Porsche processadas
- Motor de ideias criativas
- Onboarding do Vitor

---

## Metricas de Sucesso

| Metrica | Meta Mes 1 | Meta Mes 3 |
|---------|-----------|-----------|
| Uso semanal | 3+ interacoes | 5+ interacoes |
| Conteudos/mes | 12 | 16+ |
| Tempo de edicao | -50% | -70% |
| Legendas aceitas sem ajuste | 60% | 85% |

---

## Principios

1. **Humano no centro** — IA otimiza processos, nao substitui criatividade
2. **Personalidade, nao genericidade** — agentes entendem o estilo do Vitor
3. **CLI First** — funcionalidades funcionam via CLI antes de ter UI
4. **Invisibilidade** — o Vitor so conversa com o Diretor. O resto e magica
5. **Valor real** — cada sprint entrega algo que o Vitor USA, nao algo teorico

---

*KING — Sistema de Automacoes e Inteligencia Criativa*
*Powered by Synkra AIOS v4.4.6*
