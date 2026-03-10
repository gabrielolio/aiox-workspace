# Pendencias — Instalacoes e Configuracoes

## Paperclip

### O que e
Paperclip e uma ferramenta de gestao de contexto para LLMs — compacta, organiza e injeta contexto relevante em sessoes de IA. Util para projetos grandes onde o contexto excede a janela do modelo.

### Status atual
**NAO INSTALADO.** Nao encontrado no repositorio como binario, pacote pip, pacote npm, nem arquivo avulso.

### Requisitos para instalar no WSL2

#### Pre-requisitos
- WSL2 com Ubuntu 22.04+ (ja configurado)
- Python 3.9+ ou Node.js 18+ (dependendo da versao do Paperclip)
- Git

#### Instalacao (verificar fonte oficial antes de executar)

**Nota:** "Paperclip" e um nome generico — existem varios projetos com esse nome. Antes de instalar, Gabriel precisa confirmar QUAL Paperclip ele quer. Opcoes conhecidas:

1. **Paperclip (Ruby gem)** — gestao de uploads em Rails (provavelmente NAO e esse)
2. **Paperclip MCP** — servidor MCP para contexto (possivel, mas nao confirmado)
3. **Outro Paperclip** — ferramenta especifica mencionada em algum curso/comunidade

#### Acao necessaria
Gabriel: confirmar qual Paperclip voce quer instalar (link, repositorio, ou onde viu a referencia). Com essa info, documento os comandos exatos.

---

## .aios-core (Framework Core)

### O que e
Diretorio com os runtimes, parsers e engines do framework Synkra AIOX. Necessario para que hooks como `synapse-engine.cjs` e `precompact-session-digest.cjs` funcionem.

### Status atual
**AUSENTE.** O diretorio `.aios-core/` nao existe no repositorio. No ambiente local anterior, estava em `C:\Windows\System32\.aios-core\`.

### Instalacao no WSL2
```bash
cd ~/aiox-workspace
npx aiox-core install --quiet --force
# Se o pacote foi renomeado e nao funcionar:
npx aios-core install --quiet --force
```

**Nota:** O pacote `aios-core@4.4.6` mostra aviso de deprecacao — foi renomeado para `aiox-core`. Tentar `aiox-core` primeiro.

---

## Chaves API pendentes no .env

| Variavel | Onde obter | Prioridade |
|----------|-----------|------------|
| `GEMINI_API_KEY` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | ALTA (core IA do KING) |
| `EVOLUTION_API_KEY` | Painel da Evolution API local | ALTA (WhatsApp bot) |
| `GOOGLE_DRIVE_FOLDER_ID` | URL da pasta no Drive | MEDIA |
| `VITOR_WHATSAPP` | Numero do Victor com DDI | MEDIA |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | MEDIA (alternativa ao Gemini) |
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) | BAIXA (Whisper alternativo) |

---

## MCPs (Model Context Protocol)

Nenhum MCP configurado. Prioridades do MEMORY:

1. **ClickUp MCP** — gestao de tarefas da agencia
2. **Notion MCP** — hub operacional (ja tem page_ids documentados no MEMORY)

Instalacao via Claude Code local: `@devops *add-mcp <nome>`

---

## npm install

Dependencias do KING System nunca foram instaladas neste ambiente.

```bash
cd ~/aiox-workspace && npm install
```

---

*Documento gerado em 2026-03-10*
