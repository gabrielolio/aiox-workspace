# Story 3.2 — Briefer MVP: 3 Mensagens Semanais

**Sprint:** 3 (Guardiao + Briefer MVP)
**Status:** [x] Concluida
**Prioridade:** ALTA
**Agentes AIOS:** @dev, @qa

---

## Descricao

Como Vitor, quero receber 3 mensagens automaticas por semana no WhatsApp que me ajudem a organizar a producao de conteudo, para que eu nao perca o ritmo e saiba exatamente o que esta pendente.

## Acceptance Criteria

- [x] Toda segunda-feira as 8h: Briefer envia resumo da semana (ex: "Semana 12 — Porsche: 2 posts. GWM: 1 reel. Por onde voce comeca?")
- [x] Toda quarta-feira as 17h: Briefer envia status check com base nos jobs registrados no SQLite (ex: "Fez 1 de 3 conteudos previstos. O que esta travando?")
- [x] Toda sexta-feira as 17h: Briefer envia fechamento da semana com pendencias (ex: "Semana encerrada. Tank 300 ficou pra proxima — confirma?")
- [x] Na sexta, Vitor responde "sim" ou "nao" sobre cada pendencia — Briefer registra no SQLite
- [x] Na semana seguinte, o resumo de segunda ja inclui os itens que ficaram pendentes
- [x] O calculo de conteudos esperados usa o calendario: Porsche = seg/qua/sex, GWM = ter/qui (Bamaq)
- [x] Mensagens chegam via WhatsApp (Evolution API) para o numero do Vitor
- [x] Scheduler usa node-cron (sem servico externo)

## Notas Tecnicas

- Calendario Bamaq: Porsche nos dias seg/qua/sex, GWM nos dias ter/qui
- Contagem semanal esperada: 3 conteudos Porsche + 2 GWM = 5 por semana (considerando semana cheia)
- Contagem real: baseada nos jobs com status "done" registrados no SQLite na semana corrente
- Aprendizado MVP: tabela `weekly_feedback` no SQLite (semana, item_pendente, confirmado: bool)
- Formato das mensagens: direto, sem enrolacao, maximo 3 linhas por mensagem
- Vitor responde sim/nao via WhatsApp — o Diretor detecta resposta e passa para o Briefer processar

## Dependencias

- Story 1.3 (Agente Diretor — canal WhatsApp)
- Story 2.1 (SQLite — leitura de jobs e escrita de weekly_feedback)
- node-cron instalado como dependencia

## File List

- [x] src/agents/briefer/scheduler.ts (node-cron: agenda as 3 mensagens semanais)
- [x] src/agents/briefer/weekly-summary.ts (calcula esperado vs realizado, formata mensagens)
- [x] src/agents/briefer/index.ts (agente principal — processa respostas sim/nao do Vitor)
- [x] src/database/db.ts (adicionar tabela weekly_feedback ao schema SQLite)
- [x] src/agents/diretor/router.ts (adicionar rota para respostas sim/nao → Briefer)
- [x] package.json (adicionar node-cron como dependencia)
