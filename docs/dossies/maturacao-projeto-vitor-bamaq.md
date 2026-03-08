# Maturacao do Projeto: Sistema para Vitor — Bamaq Marketing

**Data:** 2026-02-27
**Autor:** KING (analise critica aprofundada)
**Objetivo:** Amadurecer a ideia, corrigir falhas de concepcao, projetar algo que REALMENTE funcione

---

## PARTE 1: ANALISE CRITICA — O QUE ESTA ERRADO NO DOSSIE ANTERIOR

Antes de construir qualquer coisa, preciso ser honesto sobre os problemas da primeira abordagem.

### 1.1. Estamos pensando em tecnologia, nao em comportamento

O dossie anterior lista "Editor de Video com IA", "Orquestrador de Conhecimento", "Organizador de Documentos". Sao nomes bonitos. Mas nenhum deles responde a pergunta mais importante:

> **O Vitor vai usar isso amanha de manha?**

A resposta honesta e: **provavelmente nao.**

Por que? Porque o Vitor:
- Se autodefine como "vagabundo" (linha 127 da transcricao)
- Admite que faz "o basico" (linha 188)
- Precisa que alguem de direcao (linha 288: "a pessoa chega e fala, mano, da direcao")
- Tem dia a dia volatil e sem controle (linha 344: "nao tem")
- Ja tentou mudar processos na empresa e foi ignorado (linha 233: "eu ja falei isso la e eles nao escutam")

Se der pra ele um sistema que exige disciplina, rotina, aprendizado de ferramenta nova — **ele vai usar duas vezes e abandonar.** Isso e certeza. Nao e pessimismo. E leitura de comportamento.

### 1.2. O gap tecnologico e enorme

O Vitor trabalha com:
- **Celular** (galeria de fotos)
- **CapCut** (edicao mobile)
- **WhatsApp** (recebe demandas)
- **Notas** do celular (anotacoes de segunda)
- **Google Drive** (backup basico)

E o dossie propoe:
- Agentes de IA
- Pipeline de transcricao
- Obsidian
- Sistemas de automacao

**O abismo entre esses dois mundos e o lugar onde projetos morrem.**

Um cara que anota tarefas no bloco de notas do celular na segunda-feira nao vai adotar uma plataforma de agentes inteligentes da noite pro dia. E se a gente forcar, ele vai se sentir burro, inadequado, ou simplesmente vai achar que "nao e pra ele". E ai perdemos tudo.

### 1.3. Priorizamos errado

O dossie colocou "Editor de Video" como prioridade ALTA. Mas:

1. **E a coisa mais dificil de construir** — edicao de video com IA no nivel que o Vitor quer (animacoes de legenda customizadas, transicoes especificas) ainda nao existe de forma plug-and-play
2. **E a mais subjetiva** — o Vitor tem gosto especifico, vai comparar com o trabalho manual dele e provavelmente nao vai gostar no comeco
3. **Demora pra dar resultado** — precisa de iteracoes, treinamento, refinamento

A prioridade REAL deveria ser o que resolve a dor mais imediata com menor esforco: **direcao e organizacao da rotina.**

O Vitor disse com todas as letras (linha 283): **"Ate se ele me der um insight, um mapa para seguir."**

Ele quer um GPS. A gente estava propondo construir o carro.

### 1.4. Ignoramos onde o Vitor vive

O Vitor vive no WhatsApp e no celular. Qualquer solucao que o tire desse ambiente vai criar atrito. E atrito mata adocao.

A solucao precisa **ir ate o Vitor**, nao pedir que o Vitor va ate ela.

### 1.5. Os tres pilares sao genericos demais

"Editor de Video Assistido por IA" poderia ser para qualquer social media do mundo. "Orquestrador de Conhecimento" e um buzzword. "Organizador de Documentos" e uma pasta com subpastas.

Nada disso grita: **"isso foi feito pro Vitor, pro cara que trabalha com GWM e Porsche na Bamaq."**

Se a gente quer que ele use, precisa ser tao personalizado que ele sinta que o sistema CONHECE ele.

---

## PARTE 2: QUEM E O VITOR DE VERDADE

Antes de projetar qualquer sistema, preciso desenhar o perfil comportamental real do Vitor.

### 2.1. Perfil Comportamental

| Traco | Evidencia na Transcricao | Implicacao para o Projeto |
|-------|--------------------------|---------------------------|
| **Procrastinador produtivo** | "As vezes eu tiro uma foto, nao tiro o tempo pra editar e nao posto" (L136) | A solucao precisa eliminar barreiras, nao adicionar etapas |
| **Precisa de direcao externa** | "A pessoa chega e fala, mano, da direcao" (L288) | O sistema TEM que dar direcao proativamente, nao esperar ser acionado |
| **Orgulhoso do trabalho** | "Solta meu nome na rua ai pra voce ver" (L195) | A solucao deve fazer ele parecer MELHOR, nao substituir ele |
| **Estetica acima de tudo** | Legendas grandes, curvas, animadas, preenchidas (L42-60) | Qualquer output de IA que parecer "generico" vai ser rejeitado |
| **Basico por padrao** | "Eu faco o basico" (L188) | A solucao deve tornar o "A+" mais facil do que o "basico" atual |
| **Sazonal e volatil** | "A bem mao dele e sazional" (L317) | Sistema rigido nao funciona; precisa ser flexivel e adaptavel |
| **Informal** | Demandas via WhatsApp, sem processo (L220-228) | Nao tentar formalizar demais; trabalhar DENTRO da informalidade |
| **Auto-critico mas defensivo** | Admite ser "vagabundo" mas logo depois defende: "quando eu faco o basico, eu ja faco muito" (L192) | Nunca fazer o sistema parecer uma "bronca"; deve ser um aliado |

### 2.2. O Paradoxo do Vitor

O Vitor e um cara que:
- **TEM talento** (ele e reconhecido, cria valor alem da funcao)
- **TEM gosto estetico** (sabe exatamente o que quer nas edicoes)
- **NAO TEM estrutura** (rotina, direcionamento, organizacao)
- **NAO QUER ter estrutura** (quer o resultado dela, nao o processo de manter)

Esse paradoxo e o nucleo do projeto. A solucao precisa dar **estrutura invisivel** — ele sente o resultado mas nao sente o peso.

### 2.3. O Que Motiva o Vitor

1. **Ver resultado imediato** — "caralho, isso aqui e bom" (L626)
2. **Sentir que esta fazendo mais com menos esforco**
3. **Autonomia criativa** — ele quer ser solto, mas com direcao
4. **Reconhecimento** — ele ja e reconhecido e quer manter/ampliar isso
5. **Praticidade** — se for complicado, nao usa

### 2.4. O Que Desmotiva o Vitor

1. **Processo repetitivo** — editar legenda por legenda, foto por foto
2. **Falta de novidade** — postar a mesma condição do mes repetidamente
3. **Cobrancinhas sem direção** — "faz alguma coisa" sem saber o quê
4. **Ferramentas que nao fazem o que promete** — legenda automatica do CapCut que "e uma aposta"
5. **Complexidade desnecessária** — se precisa de tutorial, ja perdeu

---

## PARTE 3: CORRECAO DE ROTA — O QUE DEVEMOS FAZER DIFERENTE

### 3.1. Principio #1: WhatsApp-First (Encontrar o Vitor Onde Ele Esta)

**Antes:** Plataforma/sistema/dashboard separado
**Depois:** Tudo comeca e termina no WhatsApp

O Vitor ja recebe demandas no WhatsApp. Ja manda fotos pelo WhatsApp. Ja se comunica pelo WhatsApp. Entao o ponto de entrada do sistema deve ser um **bot no WhatsApp** (ou um numero dedicado) que:

- Recebe fotos/videos e organiza automaticamente
- Responde perguntas ("o que posso postar hoje pra GWM?")
- Envia o briefing semanal toda segunda de manha
- Gera legendas e roteiros sob demanda
- Faz a ponte com o Drive (upload automatico e organizado)

**Por que isso impressiona:** O Vitor nao precisa aprender nada novo. Ele manda uma mensagem como ja faz todo dia. So que agora alguem responde com inteligencia.

### 3.2. Principio #2: Proativo, Nao Reativo

**Antes:** O Vitor precisa abrir o sistema, pedir coisas, interagir
**Depois:** O sistema vai ate o Vitor sem ele pedir

Exemplos concretos:

- **Segunda 8h:** "Bom dia Vitor! Essa semana na Porsche: foco no Cayenne Turbo GT. Na GWM: Tank 300 HEV chegou. Aqui estao 3 ideias de conteudo pra cada marca."
- **Quarta 14h:** "Voce postou 2 conteudos essa semana. Ta no ritmo pra bater os 12 do mes. Quer uma sugestao pro proximo?"
- **Sexta 17h:** "Resumo da semana: 4 conteudos criados, engajamento medio X. O video do Haval H6 performou melhor. Quer explorar mais esse modelo semana que vem?"

**Por que isso impressiona:** O Vitor pediu um "mapa pra seguir". Isso e o mapa que aparece na mao dele sem ele pedir.

### 3.3. Principio #3: Resultado Antes de Processo

**Antes:** Instalar ferramentas -> Configurar -> Aprender -> Usar -> Ver resultado
**Depois:** Ver resultado -> Querer mais -> Entender o processo -> Evoluir

Na primeira interacao, o Vitor precisa ter um momento "caralho". Se a primeira experiencia dele for configurar pasta no Drive, perdemos ele.

A primeira experiencia deve ser:
1. Vitor manda um video cru pelo WhatsApp
2. Em 5 minutos, recebe de volta o video com legendas no estilo dele, organizadas, prontas pra postar
3. Vitor: "caralho"

**Esse momento e tudo.** Depois disso ele confia e aceita evoluir.

### 3.4. Principio #4: Personalidade, Nao Ferramenta

O sistema nao deve se apresentar como "sistema". Deve ser o **Diretor Criativo Virtual do Vitor** — alguem que:

- Conhece as marcas que ele atende (GWM e Porsche)
- Sabe o estilo visual dele (legendas grandes, animadas, curvas)
- Entende a rotina dele (Porsche seg/qua/sex, GWM ter/qui)
- Conhece as guidelines da Porsche (do PDF)
- Sabe que a GWM e mais solta
- Conhece os modelos da frota
- Sabe o que funcionou e o que nao funcionou nos ultimos posts

Nao e um bot. E o "diretor criativo" que o Vitor sempre quis ter e nunca teve.

---

## PARTE 4: A ESTRUTURA REAL — O QUE VAMOS CONSTRUIR

### Visao Geral: "Diretor" — O Assistente Criativo do Vitor

**Nome interno do projeto:** Diretor
**Conceito:** Um assistente pessoal de criacao de conteudo que CONHECE o Vitor, suas marcas, seus padroes e sua rotina.

### Camada 1: O Canal (WhatsApp)

```
VITOR <--WhatsApp--> DIRETOR <--Backend--> [Drive | IA | Base de Conhecimento]
```

O Vitor so interage via WhatsApp. Todo o resto e invisivel pra ele.

**Interacoes suportadas:**

| Vitor manda... | Diretor responde... |
|----------------|---------------------|
| Video cru | Video com legendas estilizadas prontas para postar |
| Foto crua | Foto tratada (upscale, contraste, padronizada) |
| "O que posto hoje?" | 3 sugestoes de conteudo para a marca do dia |
| "Me da um roteiro pro Cayenne" | Roteiro pronto no estilo do Vitor |
| "Posso usar fundo preto no post da Porsche?" | Resposta baseada nas guidelines oficiais |
| Audio de briefing | Transcricao + roteiro estruturado |
| "Como foi essa semana?" | Resumo de performance + sugestoes |

### Camada 2: A Inteligencia (Backend)

#### 2.1. Base de Conhecimento (Knowledge Base)

Informacoes que o Diretor precisa ter:

**Sobre o Vitor:**
- Estilo de edicao preferido (legendas grandes, curvas, animadas)
- Tipos de animacao de legenda que gosta (subindo, descendo, transicao)
- Tom de voz nos roteiros
- Historico de conteudos criados
- Performance de cada conteudo (engajamento)

**Sobre a Porsche:**
- Guidelines oficiais (do PDF que o Vitor tem)
- Modelos da frota atual (Cayenne, 911, Panamera, Taycan, Macan)
- Restricoes: emblema em pe, paleta de cores, tipografia
- Tom da marca: exclusivo, sofisticado, minimalista
- Conceito "Destination Porsche"
- Rotina: segunda, quarta, sexta

**Sobre a GWM:**
- Tom da marca: moderno, tecnologico, acessivel, inovador
- Modelos da frota (Haval H6, Tank 300, Poer P30, Ora 03, Haval H9)
- Lancamentos 2026: 12 novos modelos (Tank 300 HEV Flex, Haval H6 Facelift, etc.)
- Liberdade criativa: alta (primeira marca a fazer comercial com IA no Brasil)
- Acessorios, opcionais, boutique (frentes de conteudo)
- Rotina: terca, quinta

**Sobre o Grupo Bamaq:**
- Concessionarias GWM: BH (3 lojas), Contagem, Campo Grande, Dourados
- Porsche Centers: BH, Salvador, Campo Grande
- Fluxo de aprovacao: Vitor cria -> gestao aprova -> publica

#### 2.2. Motor de Sugestoes

Toda segunda-feira, o Diretor gera um **briefing semanal** baseado em:

1. **Calendario de marcas:** Porsche (seg/qua/sex) vs GWM (ter/qui)
2. **Modelo-foco da semana:** rotacionar entre modelos para cobertura completa
3. **Lacunas de conteudo:** quais modelos/temas nao foram cobertos recentemente
4. **Sazonalidade:** condicoes comerciais do mes, lancamentos, eventos
5. **Performance:** o que funcionou bem na semana anterior

**Formato do briefing semanal:**

```
BRIEFING SEMANA 10 — 03 a 07 de marco

PORSCHE (seg/qua/sex)
  Modelo-foco: Macan Electric
  Ideias:
  1. Walk-around dos acessorios do Macan Electric (video 60s)
  2. Comparativo visual: Macan classico vs Macan Electric
  3. Detalhe: a cor exclusiva Papaya Metallic

GWM (ter/qui)
  Modelo-foco: Tank 300 HEV
  Ideias:
  1. Funcionalidades off-road do Tank 300 (video demonstrativo)
  2. "5 acessorios que voce nao sabia que o Tank 300 tem"
  3. Bastidores: um dia na concessionaria com o Tank 300

Meta da semana: 5 conteudos (3 Porsche + 2 GWM)
Progresso do mes: 7/12 conteudos entregues
```

#### 2.3. Gerador de Legendas

**Esse e o ponto mais importante tecnicamente.** O Vitor disse que a maior dor e a legenda.

Pipeline:
1. Vitor envia video pelo WhatsApp
2. Audio extraido automaticamente (ffmpeg)
3. Transcricao via Whisper (modelo medium, pt-BR)
4. Geracao de arquivo de legendas ASS/SRT com:
   - Fonte grande, bold
   - Estilo curvo (background arredondado)
   - Animacoes de entrada: slide up, fade in, bounce
   - Animacoes de saida: slide down, fade out
   - Cores e posicionamento diferenciados por marca (Porsche: elegante | GWM: moderno)
5. Arquivo devolvido ao Vitor para importar no CapCut
6. **Opcional:** Video ja renderizado com legendas embedadas

**Templates de legenda por contexto:**

| Contexto | Estilo | Animacao Entrada | Animacao Saida | Cor |
|----------|--------|-----------------|----------------|-----|
| Porsche Comercial | Fino, elegante, minimalista | Fade suave | Fade suave | Branco sobre escuro |
| Porsche Apresentacao | Moderno, limpo | Slide lateral | Dissolve | Prata/cinza |
| GWM Comercial | Bold, impactante | Bounce/pop | Slide down | Verde GWM |
| GWM Lifestyle | Dinamico, cheio | Slide up rapido | Fade | Branco vibrante |
| GWM Off-road | Robusto, forte | Shake-in | Cut | Laranja/terra |

#### 2.4. Guardiao de Guidelines

Quando o Vitor tiver duvida sobre o que pode ou nao pode em cada marca:

- "Posso colocar o logo da Porsche deitado?" -> "Nao. Segundo as guidelines, o emblema deve estar sempre na posicao vertical."
- "Qual fonte uso nos posts da Porsche?" -> "A fonte oficial e Porsche Next. Para legendas de video, use sans-serif limpa."
- "A GWM permite fundo colorido nos stories?" -> "Sim, a GWM tem liberdade criativa. Use cores da paleta oficial ou cores complementares."

Isso transforma o PDF de guidelines em um **consultor vivo**.

### Camada 3: A Organizacao (Drive Automatico)

**O Vitor NAO deve organizar nada manualmente.** Tudo que passa pelo Diretor e automaticamente salvo no Drive na estrutura correta.

```
Bamaq Marketing/
  Porsche/
    2026/
      03-Marco/
        Videos/
          brutos/
          editados/
          aprovados/
        Fotos/
          brutos/
          editadas/
        Roteiros/
        Legendas/
        Metricas/
  GWM/
    2026/
      03-Marco/
        Videos/
          brutos/
          editados/
          aprovados/
        Fotos/
          brutos/
          editadas/
        Roteiros/
        Legendas/
        Metricas/
  Guidelines/
    Porsche/
      brand-guidelines-porsche.pdf
    GWM/
      (a ser obtido)
  Briefings/
    2026/
      semana-10.md
      semana-11.md
```

**Regra de ouro:** O Vitor manda o video pro WhatsApp. O Diretor processa, gera a legenda, salva o bruto na pasta correta, salva o editado na pasta correta, e devolve o resultado pro Vitor. Ele nao toca no Drive. Ele so abre o Drive quando quer revisar algo.

---

## PARTE 5: RISCOS DE ABANDONO E CONTRAMEDIDAS

Esse e o ponto mais critico. Nao adianta construir se o Vitor vai abandonar.

### 5.1. Mapa de Riscos

| Risco | Probabilidade | Impacto | Contramedida |
|-------|---------------|---------|--------------|
| **Legenda gerada nao agrada o Vitor** | ALTA | CRITICO | Oferecer 3 estilos diferentes; Vitor escolhe; sistema aprende a preferencia |
| **Vitor esquece de usar o sistema** | ALTA | ALTO | Sistema e PROATIVO — envia briefing segunda de manha sem pedir |
| **WhatsApp bot parece robotico** | MEDIA | ALTO | Tom casual, informal, como um amigo que manja de marketing |
| **Demora pra processar video** | MEDIA | MEDIO | Feedback imediato: "Recebi! Processando... 2 minutinhos" |
| **Vitor muda de celular/numero** | BAIXA | ALTO | Dados no backend, facil reconectar |
| **Gestao nao aprova conteudo sugerido** | MEDIA | MEDIO | Ajustar sugestoes com base no feedback de aprovacao/rejeicao |
| **Vitor sente que o sistema "manda nele"** | MEDIA | CRITICO | Tom de sugestao, nunca de obrigacao: "E ai, quer testar isso?" |
| **Custo de API fica alto** | MEDIA | MEDIO | Comecar com modelos leves, escalar conforme valor percebido |

### 5.2. Mecanismos Anti-Abandono

#### a) O Efeito "Sem Volta"
Quando o Vitor usa o sistema por 2 semanas e percebe que:
- Nao precisa mais editar legenda manualmente
- Toda segunda ja tem um plano pronto
- Todo video ja vai pro Drive organizado

Ele nao consegue mais voltar pro jeito antigo. **O basico dele vira o A+ do antigo dele.** E ai ele nao larga.

#### b) Celebracao de Progresso
O sistema deve reconhecer conquistas:
- "Parabens! Essa semana voce postou 5 conteudos — melhor semana do mes!"
- "O video do Tank 300 teve 3x mais engajamento que a media. Monstro."
- "Voce ja cobriu 8 dos 12 modelos da GWM esse trimestre. Falta pouco!"

**Por que isso funciona pro Vitor:** Ele e um cara que tem orgulho do trabalho ("solta meu nome na rua"). Validacao positiva alimenta isso.

#### c) Simplicidade Radical
Regra de 3 toques:
1. Vitor abre WhatsApp (ja estava aberto)
2. Manda o video/foto/pergunta
3. Recebe o resultado

Se precisar de mais de 3 interacoes, estamos complicando demais.

#### d) Evolucao Gradual
- **Semana 1-2:** So briefing semanal + gerador de legendas
- **Semana 3-4:** Adiciona organizacao automatica no Drive
- **Mes 2:** Adiciona roteiros e sugestoes de conteudo mais refinadas
- **Mes 3:** Adiciona analise de performance e recomendacoes baseadas em dados
- **Mes 4+:** Squad de consultores virtuais (se houver demanda)

Nunca entregar tudo de uma vez. O Vitor precisa digerir aos poucos.

---

## PARTE 6: O FATOR WOW — O QUE DIFERENCIA ISSO DE TUDO QUE EXISTE

### 6.1. Ninguem Faz Isso no Mercado Automotivo Brasileiro

Ferramentas como Template Track e Deskfy existem para gerenciar materiais graficos de franquias. Mas nenhuma:
- Da direcao criativa proativa ao social media
- Conhece as guidelines de CADA marca que o profissional atende
- Gera legendas personalizadas no estilo especifico do produtor
- Funciona 100% pelo WhatsApp
- Aprende com o tempo o que funciona e o que nao funciona

**O Vitor seria o primeiro social media de concessionaria no Brasil com um assistente criativo pessoal.** Isso nao so impressiona — muda o patamar do trabalho dele.

### 6.2. O Efeito Multiplicador

Se o sistema funcionar bem pro Vitor, ele automaticamente:
- Posta mais (porque e mais facil)
- Posta melhor (porque tem direcao e padrao)
- Cobre mais modelos (porque recebe sugestoes)
- Gera mais engajamento (porque tem constancia)
- Se destaca na empresa (porque o output e superior)

**Isso cria um ciclo virtuoso:** Mais resultado -> Mais reconhecimento -> Mais motivacao -> Mais uso do sistema -> Mais resultado.

### 6.3. A Experiencia de Primeira Vez

O primeiro contato do Vitor com o sistema deve ser assim:

```
[Gabriel adiciona o numero do Diretor no WhatsApp do Vitor]

Diretor: "E ai Vitor! Sou o Diretor, seu assistente criativo pra GWM
e Porsche. O Gabriel me contou sobre o seu trabalho e eu ja estudei
as guidelines da Porsche e os modelos da GWM. Quer ver o que eu
consigo fazer? Me manda um video que voce gravou recentemente."

Vitor: [manda um video cru de 30 segundos do Haval H6]

Diretor: "Show! Recebi o video do H6. Processando... 2 minutinhos."

[2 minutos depois]

Diretor: "Pronto! Aqui estao 3 versoes com legendas diferentes:
1. Estilo bold (letras grandes, animacao bounce)
2. Estilo smooth (letras medias, fade suave)
3. Estilo dinamico (letras grandes, slide up)

Qual te agrada mais? Posso ajustar."

Vitor: [fica impressionado, escolhe a opcao 1]

Diretor: "Anotado! Estilo bold salvo como seu padrao pra GWM.
Na proxima, ja vou direto nesse estilo. Ah, e ja salvei tudo
no Drive: bruto em GWM/2026/02/Videos/brutos/ e editado em
GWM/2026/02/Videos/editados/. Quer um roteiro pro proximo
conteudo?"
```

**Esse momento e projetado para gerar o "caralho" do Vitor.** Em 3 minutos, ele viu:
- Legenda pronta no estilo dele
- 3 opcoes pra escolher
- Arquivo ja organizado no Drive
- Sistema que aprende a preferencia
- Oferta proativa de proxima acao

---

## PARTE 7: PLANO DE IMPLEMENTACAO REVISADO

### Fase 0: Pre-Requisitos (Antes de Tudo)

- [ ] **Obter o PDF de guidelines da Porsche** com o Vitor
- [ ] **Mapear os modelos atuais** de GWM e Porsche na Bamaq BH
- [ ] **Coletar 5-10 videos ja editados pelo Vitor** para entender padrao estetico
- [ ] **Documentar o estilo de legenda preferido** com exemplos especificos
- [ ] **Identificar referencia de social media** que o Vitor gosta (ele mencionou mas nao lembrou o nome)
- [ ] **Definir numero/canal WhatsApp** para o Diretor

### Fase 1: MVP — O Briefing + Legendas (Semana 1-2)

**Entrega:** O Vitor recebe briefing semanal e pode gerar legendas pelo WhatsApp.

Componentes tecnicos:
- [ ] Bot WhatsApp (WhatsApp Business API ou alternativa como Evolution API)
- [ ] Pipeline de transcricao (Whisper)
- [ ] Gerador de legendas ASS/SRT com templates estilizados
- [ ] Base de conhecimento inicial (guidelines Porsche, modelos GWM)
- [ ] Motor de briefing semanal (cronjob segunda 8h)

**Criterio de sucesso:** Vitor usa pelo menos 3 vezes na primeira semana.

### Fase 2: Organizacao Invisivel (Semana 3-4)

**Entrega:** Tudo que o Vitor envia e automaticamente organizado no Drive.

Componentes tecnicos:
- [ ] Integracao Google Drive API
- [ ] Classificacao automatica por marca (deteccao de modelo no video/foto)
- [ ] Estrutura de pastas automatizada
- [ ] Backup semanal vinculado ao briefing de segunda

**Criterio de sucesso:** Vitor abre o Drive e encontra tudo organizado sem ter feito nada.

### Fase 3: Diretor Criativo Completo (Mes 2)

**Entrega:** O sistema da sugestoes inteligentes e gera roteiros.

Componentes tecnicos:
- [ ] Gerador de roteiros baseado no estilo do Vitor
- [ ] Tracker de progresso mensal (X/12 conteudos)
- [ ] Sugestoes baseadas em lacunas de cobertura de modelos
- [ ] Guardiao de guidelines (consulta ao PDF da Porsche via chat)

**Criterio de sucesso:** Vitor passa de 12 conteudos/mes para 16+ sem sentir esforco extra.

### Fase 4: Refinamento e Escala (Mes 3+)

**Entrega:** O sistema aprende e evolui com o Vitor.

Componentes tecnicos:
- [ ] Analise de performance dos conteudos (se possivel via Instagram API)
- [ ] Recomendacoes baseadas em dados reais de engajamento
- [ ] Templates visuais cada vez mais refinados
- [ ] Possibilidade de expandir pra Mercedes-Benz (outra marca da Bamaq)

**Criterio de sucesso:** O Vitor nao consegue imaginar trabalhar sem o Diretor.

---

## PARTE 8: O QUE O DOSSIE ANTERIOR ACERTOU E O QUE PRECISA MUDAR

### Acertou:

1. **Os 3 pilares existem** — edicao, rotina, organizacao. So precisam ser reordenados e repensados
2. **O principio 80/20** — automatizar o processual, liberar pra criatividade
3. **A diferenciacao GWM vs Porsche** — fundamental para personalizar templates
4. **O PDF de guidelines como base** — ativo mais valioso do projeto
5. **A evolucao gradual** — nao entregar tudo de uma vez

### Precisa mudar:

1. **Prioridade:** Rotina/direcao primeiro, edicao segundo, organizacao terceiro (era o contrario)
2. **Canal:** WhatsApp-first, nao dashboard/sistema separado
3. **Postura:** Proativo (vai ate o Vitor), nao reativo (espera o Vitor ir)
4. **Tom:** Informal, como um colega, nao como um sistema
5. **Identidade:** "Diretor Criativo" com personalidade, nao "ferramenta de automacao"
6. **Onboarding:** Resultado imediato na primeira interacao, nao setup/configuracao
7. **Anti-abandono:** Mecanismos explicitos de retencao e celebracao
8. **Mobile-first:** Tudo deve funcionar do celular, porque o Vitor trabalha do celular

---

## PARTE 9: DECISOES QUE PRECISAMOS TOMAR

Antes de comecar a implementar, precisamos alinhar:

### 9.1. Decisoes Tecnicas

| Decisao | Opcoes | Recomendacao |
|---------|--------|--------------|
| **Canal WhatsApp** | WhatsApp Business API (oficial) vs Evolution API (open source) vs Baileys | Evolution API — mais flexivel, custo menor, bom pra MVP |
| **Hospedagem** | VPS proprio vs Cloud (Railway/Fly.io) vs Local | Cloud (Railway) — facil de manter, custo baixo |
| **Modelo de IA** | Claude (Anthropic) vs GPT (OpenAI) vs Local (Llama) | Claude — ja estamos no ecossistema, melhor pra instrucoes complexas |
| **Transcricao** | Whisper local vs Whisper API vs AssemblyAI | Whisper API — mais rapido, custo aceitavel |
| **Renderizacao de legenda** | FFmpeg + ASS vs Remotion vs CapCut API | FFmpeg + ASS — maior controle, sem dependencia externa |
| **Storage** | Google Drive vs S3 vs Cloudflare R2 | Google Drive — o Vitor ja usa, zero atrito |

### 9.2. Decisoes de Produto

| Decisao | Implicacao |
|---------|-----------|
| **Nome do assistente** | "Diretor" e interno. Pro Vitor, pode ser algo mais pessoal. O que combina com ele? |
| **Tom de voz** | Informal mas competente? Casual? Direto? Precisa refletir algo que o Vitor confie |
| **Frequencia do briefing** | Toda segunda? Domingo a noite (pra ele ja acordar com o plano)? |
| **Quantidade de opcoes de legenda** | 3 e ideal? 2 e melhor pro comeco? |
| **Quem valida a qualidade?** | Vitor sempre valida antes de postar? Ou confia no sistema pra coisas basicas? |

---

## CONCLUSAO

O dossie anterior era um levantamento de requisitos. Este documento e a **autocritica necessaria** para transformar uma ideia boa em um produto que REALMENTE funciona.

A diferenca entre um projeto que o Vitor usa e um que ele abandona esta nos detalhes:
- No canal certo (WhatsApp, nao dashboard)
- No tom certo (colega, nao sistema)
- Na postura certa (proativo, nao reativo)
- No timing certo (resultado antes de processo)
- Na evolucao certa (gradual, nao tudo de uma vez)

O Vitor nao precisa de mais uma ferramenta. Ele precisa de um **aliado invisivel** que torna o dia a dia dele mais facil, mais produtivo e mais reconhecido — sem ele sentir que esta fazendo algo diferente do que ja faz.

E isso que vamos construir.

---

*Documento de maturacao — KING*
*Analise critica baseada em transcricao de 32 min + pesquisa de mercado*
*"Se nao impressionar na primeira vez, nao vai ter segunda vez"*
