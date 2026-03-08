# Roteiro — Reunião com o Vítor (KING)

> Para: Gabriel usar hoje na apresentação do KING para o Vítor
> Tempo estimado da reunião: 30-40 minutos
> Formato: Presencial ou vídeo chamada — mostra a tela

---

## ANTES DA REUNIÃO — O que você precisa fazer

**Tempo necessário: 20 minutos**

### 1. Ler (10 min)
- Este roteiro do início ao fim
- `docs/clients/kit-apresentacao-king.md` — as 5 perguntas e o mapa de objeções

### 2. Abrir no computador (2 min)
- Abra o arquivo `presentations/king-apresentacao-vitor.html` no Chrome
- Teste a navegação com as setas do teclado (← →)
- Deixe na tela inicial (KING)

### 3. Ter em mãos (sem precisar abrir na hora)
- O WhatsApp do Vítor para adicionar o número do KING depois
- Agenda para marcar o onboarding (30 min)

### O que NÃO fazer antes
- ❌ Não tente fazer uma demo ao vivo do sistema — ele ainda não está deployado
- ❌ Não entre em detalhes técnicos (TypeScript, SQLite, API) — Vítor não precisa saber
- ❌ Não mostre código

---

## A REUNIÃO — Passo a passo

### Fase 1: Abertura (5 min)
**Objetivo:** Ativar o problema antes de apresentar a solução.

Comece direto, sem apresentar o KING ainda:

> "Vítor, antes de te mostrar o que eu construí, me responde uma coisa.
> Quanto tempo você gasta por semana fazendo legenda no CapCut?"

Deixa ele responder. Se ele não souber exato, ajuda a calcular:

> "Se você faz 4 vídeos por semana, e cada um leva uns 30 minutos,
> são 2 horas por semana. 8 horas por mês. Isso é um dia inteiro de trabalho."

Segunda pergunta:

> "Quando você tá no meio de uma edição e surge uma dúvida de guideline,
> tipo 'posso usar essa fonte no Porsche?' — o que você faz?"

Deixa ele responder. A maioria diz "abro o PDF". Isso é o gancho.

Terceira (opcional, se a conversa fluir):

> "Você tem uma rotina definida de produção, ou vai fazendo conforme aparece?"

Com essas 3 respostas, você já tem as dores confirmadas na boca dele.
Aí você fala:

> "Então deixa eu te mostrar o que eu montei."

---

### Fase 2: A apresentação (15-20 min)
**Abra o arquivo `king-apresentacao-vitor.html`**

#### Slide 1 — Título (10 seg)
Fale só: "Isso é o KING. É um assistente de conteúdo automotivo que fica no WhatsApp."
Avança.

#### Slide 2 — O problema (1 min)
Aponta para cada ponto e comenta com o que ele disse antes.
> "Isso aqui é o que você me falou — legenda, guideline, arquivo espalhado, sem rotina."
Avança.

#### Slide 3 — Quanto tempo (30 seg)
Deixa o número falar. "8 horas → 45 minutos." Avança.

#### Slide 4 — Os agentes (1 min)
> "São 5 especialistas que ficam no WhatsApp. Três já estão prontos, dois chegam em abril."
Nomeia cada um brevemente. Avança.

#### Slide 5 — Legendador (2-3 min)
**Este é o slide principal. Dedica tempo aqui.**

Lê a conversa do slide em voz alta, como se fosse acontecer de verdade:
> "Imagina você mandando um vídeo do Tank 300. 60 segundos depois recebe isso:"

Lê as 3 versões. Destaca o arquivo .ass:
> "Esse arquivo você só arrasta no CapCut. Sem digitar nada. Sem assistir o vídeo de novo."
Avança.

#### Slide 6 — Guardião (1-2 min)
Lê a conversa. Destaca:
> "O importante aqui é que ele nunca inventa. Não é ChatGPT genérico.
> Ele consultou o PDF oficial da Porsche e te deu a regra exata."
Avança.

#### Slide 7 — Briefer (1-2 min)
> "Esse é o Briefer. Ele manda mensagem automática sem você fazer nada."

Aponta para o calendário:
> "Já configurado: Porsche segunda, quarta e sexta — GWM terça e quinta.
> Exatamente como a Bamaq funciona."
Avança.

#### Slide 8 — Status (1 min)
> "O que tá verde já tá funcionando. O que tá amarelo chega em abril."
Avança rápido.

#### Slide 9 — O fluxo completo (2-3 min)
Lê cada passo devagar. Deixa ele imaginar usando.
> "O que muda na sua vida: você continua filmando, continua editando.
> O KING resolve as partes chatas no meio do caminho."
Avança.

#### Slide 10 — Próximos passos (1 min)
**Não pule este slide.** É aqui que você fecha.
Avança.

#### Slide 11 — Encerramento
Fecha a apresentação.

---

### Fase 3: Conversação e fechamento (10 min)
**Objetivo:** Ouvir as reações, quebrar objeções e marcar o próximo passo concreto.

#### Pergunta de abertura da conversa:
> "O que achou? Faz sentido pro seu fluxo?"

**Resposta mais comum:** "Cara, é exatamente o que eu precisava."

**Se ele perguntar "Quando começa?":**
> "Preciso de uma coisa da sua parte: os PDFs de guideline que você tem da Porsche e GWM.
> Com isso em mãos eu configuro em 30 minutos.
> Daí marcamos 30 minutos juntos pra te mostrar ao vivo."

**Se ele perguntar "Quanto custa?":**
> "Por agora, zero. Você é o parceiro fundador — vai usar no período beta sem custo.
> A gente refina juntos antes de abrir pra outros criadores."

**Se ele perguntar "Como funciona de verdade?" (técnico):**
> "É um sistema que fica num servidor. Você só vê o WhatsApp.
> A parte técnica é minha — você não precisa mexer em nada."

---

### Como fechar a reunião (obrigatório)
Antes de sair, você tem que fechar pelo menos:

- [ ] **Combinado:** Ele vai te mandar os PDFs de guideline (ou você já tem)
- [ ] **Data:** Marcar o onboarding de 30 minutos (próxima semana)
- [ ] **Número:** Você vai criar o número de WhatsApp do KING e mandar pra ele adicionar

Se fechar esses 3 pontos, a reunião foi um sucesso.

---

## DEPOIS DA REUNIÃO — O que você precisa fazer

Esses são os passos técnicos para o sistema ir ao ar. Você faz, não precisa de mim pra isso.

### 1. Criar/separar número de WhatsApp para o KING
- Opção mais simples: chip pré-pago dedicado (qualquer operadora)
- Vai no `.env.example` do projeto — campo `WHATSAPP_PHONE_NUMBER`

### 2. Preencher o .env com as chaves reais
Arquivo: `C:/Windows/System32/.env.example` → copiar para `.env` e preencher:
- `ANTHROPIC_API_KEY` — no site console.anthropic.com
- `OPENAI_API_KEY` — no site platform.openai.com (pra o Whisper)
- `EVOLUTION_API_URL` e `EVOLUTION_API_KEY` — da sua instância Evolution API
- `WHATSAPP_PHONE_NUMBER` — o número novo que você criou

### 3. Me chamar para fazer o deploy
Depois que o `.env` estiver preenchido, me chama. Eu rodo o sistema localmente primeiro pra testar, depois organizamos o deploy.

---

## Resumo: quem faz o quê

| O que | Quem faz | Quando |
|-------|----------|--------|
| Ler este roteiro | Gabriel | Antes da reunião |
| Abrir apresentação | Gabriel | Antes da reunião |
| Apresentação ao Vítor | Gabriel | Hoje |
| PDFs de guideline | Vítor (manda pra Gabriel) | Até o fim da semana |
| Preencher .env | Gabriel | Depois da reunião |
| Deploy do sistema | Gabriel + eu (Claude) | Após .env preenchido |
| Onboarding com Vítor | Gabriel | Semana que vem |

---

## O que eu já fiz (não precisa recriar)

- ✅ Código do sistema completo (6 agentes em TypeScript)
- ✅ Guidelines Porsche + GWM carregadas no Guardião
- ✅ Calendário Porsche/GWM configurado no Briefer
- ✅ Apresentação de slides (`king-apresentacao-vitor.html`)
- ✅ Guia de uso para o Vítor (`docs/process/guia-fluxo-criador-king.md`)
- ✅ Proposta comercial (`docs/clients/proposta-comercial-king.md`)

---

*Boa reunião, Gabriel. Você construiu algo real — só precisa mostrar.*
