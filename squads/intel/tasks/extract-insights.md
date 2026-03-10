# Task: extract-insights

## Objetivo
Analisar uma transcricao e extrair insights estruturados sobre o projeto, cliente e decisoes.

## Input
- Texto transcrito de um audio
- Contexto do projeto (quem sao os participantes, qual o projeto)

## Categorias de Extracao

### 1. Decisoes
O que foi decidido na conversa? Acordos firmes.
- Exemplo: "Jucilene decidiu que nao quer preco nas fotos do Instagram"

### 2. Pendencias
O que ficou pendente, alguem precisa fazer algo?
- Exemplo: "Vitor vai mandar os templates ate sexta"

### 3. Prazos
Datas ou deadlines mencionados.
- Exemplo: "Primeira postagem tem que sair ate quarta que vem"

### 4. Preferencias do Cliente
Gostos, disgostos, estilo que o cliente quer.
- Exemplo: "Jucilene prefere fotos com fundo limpo, sem bagunca atras"

### 5. Oportunidades
Ideias, sugestoes, possibilidades levantadas.
- Exemplo: "Gigante mencionou que tem contato com influencer local"

## Prompt de Extracao

```
Voce e um analista de inteligencia de projeto. Analise a transcricao abaixo e extraia APENAS o que esta explicito no texto. Nao invente, nao suponha.

Contexto:
- Projeto: Fialho Motors (seminovos, Campo Grande/MS)
- Participantes possiveis: Gabriel (agencia), Vitor/Victor (social media), Jucilene (dona da loja), Gigante (socio)
- Foco: gestao de conteudo para Instagram e WhatsApp

Categorias para extrair:
1. DECISOES — o que foi acordado
2. PENDENCIAS — o que alguem precisa fazer
3. PRAZOS — datas mencionadas
4. PREFERENCIAS DO CLIENTE — gostos e disgostos
5. OPORTUNIDADES — ideias levantadas

Se uma categoria nao tem nada, escreva "Nenhuma identificada."
Se um trecho esta ambiguo, marque com [?].

TRANSCRICAO:
{transcricao}
```

## Output
- Markdown estruturado com as 5 categorias
- Integrado ao template do collector (ver agents/collector.md)

## Regras
- **Zero invencao** — so o que esta no audio
- **Atribuir falas** — "Gabriel disse...", "Jucilene pediu..."
- **Marcar incerteza** — usar [?] quando nao tiver certeza de quem falou
