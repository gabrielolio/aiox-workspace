# KING — Princípios Arquiteturais

**Versão:** 1.0
**Data:** 2026-03-06
**Autor:** Aria (Architect Agent)
**Status:** Ativo — guia todas as decisões de desenvolvimento

---

## A Visão de Longo Prazo

O KING está sendo construído hoje para o Bamaq.
Mas cada linha de código deve ser escrita como se amanhã houvesse 20 clientes.

Isso não significa over-engineering. Significa não fechar portas.

```
HOJE       → KING para Bamaq (aprender, validar, errar com segurança)
6 MESES    → KING estabilizado, processo documentado, erros conhecidos
FUTURO     → KING multi-cliente, base de uma operação de agência
```

A diferença entre um sistema que escala e um que precisa ser reescrito está
em decisões pequenas feitas no início — não em grandes refatorações depois.

---

## As 3 Regras de Ouro

### Regra 1 — Nunca costurar cliente no código

Qualquer coisa específica de um cliente deve viver em **configuração**, não em código.

**Errado:**
```typescript
export type Brand = 'porsche' | 'gwm'; // isso é o Bamaq, não o sistema
```

**Certo:**
```typescript
// src/config/clients/bamaq.yaml
client_id: bamaq
operator_whatsapp: "+5531..."
brands:
  - id: porsche
    keywords: [porsche, cayenne, 911, taycan]
    calendar_days: [1, 3, 5]  # seg, qua, sex
  - id: gwm
    keywords: [gwm, tank, haval, jolion]
    calendar_days: [2, 4]     # ter, qui
weekly_content_target: 5
```

**Regra prática:** Antes de escrever qualquer valor específico de cliente no código,
pergunte: "isso mudaria se eu tivesse outro cliente?" Se sim — vai para config.

---

### Regra 2 — Sempre perguntar "e se fosse outro cliente?"

Antes de implementar qualquer feature, fazer as duas perguntas:

1. **Isso funciona para qualquer concessionária ou só para o Bamaq?**
   - Funciona para qualquer um → vai para o core do sistema
   - Só para o Bamaq → vai para a config do Bamaq

2. **Isso usa dado específico do Bamaq como constante?**
   - Sim → extrair para arquivo de configuração
   - Não → pode ficar no código

**Exemplos práticos:**

| Elemento | Onde fica | Por quê |
|----------|-----------|---------|
| Lógica de inferência de marca | Core (`brand-inference.ts`) | Todo cliente tem marcas |
| Keywords "porsche, cayenne, 911" | Config (`bamaq.yaml`) | Específico do Bamaq |
| Calendário seg/qua/sex = Porsche | Config (`bamaq.yaml`) | Específico do Vitor |
| Número do WhatsApp do Vitor | Config (`bamaq.yaml`) | Específico do Bamaq |
| Lógica de transcrição Whisper | Core (`transcriber.ts`) | Todo cliente usa |
| Template de legenda "bold GWM" | Config (`bamaq.yaml`) | Estilo específico |
| Lógica de limpeza de sessão | Core (`session.ts`) | Todo cliente tem sessões |

---

### Regra 3 — Dados sempre com dono

Toda informação salva no banco deve ter um campo `client_id`.

**Por quê:** Adicionar `client_id` depois de 2 anos de dados é uma migração dolorosa.
Adicionar agora, mesmo com um único cliente, não custa nada.

```sql
-- jobs
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL DEFAULT 'bamaq',  -- pronto para multi-tenant
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  ...
);

-- weekly_feedback
CREATE TABLE weekly_feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT NOT NULL DEFAULT 'bamaq',  -- pronto para multi-tenant
  week_start TEXT NOT NULL,
  ...
);
```

Enquanto há um único cliente, o campo sempre vale `'bamaq'`.
Quando o segundo cliente chegar, o campo já está lá.

---

## Estrutura de Configuração por Cliente

```
src/config/
  clients/
    bamaq.yaml           ← configuração completa do Bamaq
    _template.yaml       ← modelo para novo cliente
  env.ts                 ← variáveis de ambiente globais (sem dados de cliente)
```

### O que vai no arquivo de cada cliente

```yaml
# Exemplo: src/config/clients/bamaq.yaml
client_id: bamaq
display_name: "Grupo Bamaq"
active: true

operator:
  name: "Vitor King"
  whatsapp: "+5531XXXXXXXXX"  # via env var: BAMAQ_OPERATOR_WHATSAPP

brands:
  - id: porsche
    display_name: "Porsche Bamaq"
    keywords: [porsche, cayenne, 911, taycan, macan, panamera, gt3, gt4, cayman, boxster, carrera]
    calendar_days: [1, 3, 5]       # 1=seg, 3=qua, 5=sex
    guidelines_path: "knowledge-base/brands/porsche-bamaq.yaml"
    caption_style: "elegant"

  - id: gwm
    display_name: "GWM Bamaq"
    keywords: [gwm, tank, haval, ora, jolion, h6, tank300, great wall]
    calendar_days: [2, 4]          # 2=ter, 4=qui
    guidelines_path: "knowledge-base/brands/gwm-bamaq.yaml"
    caption_style: "bold"

scheduler:
  briefing_day: 1                  # Segunda-feira
  briefing_hour: 8
  weekly_content_target: 5

storage:
  google_drive_folder_id: ""       # via env var: BAMAQ_DRIVE_FOLDER_ID
```

---

## Checklist Antes de Implementar Qualquer Feature

Antes de abrir um arquivo de código, responder:

```
[ ] Estou costurando algum dado do Bamaq diretamente no código?
    Se sim → extrair para bamaq.yaml

[ ] Essa feature usaria dados diferentes para outro cliente?
    Se sim → a feature deve ler de config, não de constantes

[ ] Estou salvando algo no banco sem client_id?
    Se sim → adicionar o campo

[ ] A lógica de negócio está misturada com config de cliente?
    Se sim → separar antes de implementar
```

---

## O que NÃO fazer

| Anti-pattern | Consequência |
|-------------|--------------|
| `type Brand = 'porsche' \| 'gwm'` no código | Reescrita total quando o terceiro cliente tiver 3 marcas |
| Número de WhatsApp no `.env` sem `client_id` | Impossível adicionar segundo operador |
| Tabelas sem `client_id` | Migração dolorosa com dados de produção |
| Calendário hard-coded no código | Segunda cliente não pode ter calendário diferente |
| Keywords de marca como constante | Não funciona para marcas que o sistema não conhece |

---

## Quando Refatorar vs Quando Ignorar

Esse documento **não exige refatoração imediata** do que já existe.

O KING está em construção. Aplicar essas regras significa:
- No código **novo**: seguir as regras desde o início
- No código **existente**: refatorar quando a feature for mexida
- **Não parar tudo** para refatorar antes de validar com o Bamaq

O momento de aplicar o multi-tenant completo é quando o **segundo cliente
bater na porta com contrato assinado** — não antes.

---

*KING — construindo para hoje, sem fechar portas para amanhã*
*Powered by Synkra AIOS v4.4.6*
