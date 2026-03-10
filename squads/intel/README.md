# Squad Intel — Coleta e Processamento de Inteligencia

## O que faz

Transforma audios de conversas em conhecimento estruturado. Pega os .m4a do Google Drive, transcreve, extrai o que importa (decisoes, pendencias, prazos, preferencias) e salva tudo organizado em `knowledge-base/conversas/`.

Pensa nele como um estagiario que ouve todas as reunioes e anota os pontos-chave num caderno organizado.

## Fonte de Dados

| Item | Valor |
|------|-------|
| **Google Drive** | [Pasta compartilhada](https://drive.google.com/drive/folders/1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY) |
| **Folder ID** | `1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY` |
| **Formatos** | .m4a, .mp3, .ogg, .wav |
| **Participantes** | Gabriel, Vitor, Jucilene (Fialho Motors) |

## Comandos

| Comando | O que faz |
|---------|-----------|
| `*intel` | Pipeline completo: baixa + transcreve + extrai insights |
| `*sync` | Apenas baixa audios novos do Drive |
| `*transcribe [arquivo]` | Transcreve um audio especifico |
| `*extract [arquivo]` | Extrai insights de uma transcricao ja feita |

## Pre-requisitos (instalar na maquina local)

```bash
# 1. ffmpeg — converte formatos de audio
# No Ubuntu/WSL:
sudo apt-get install ffmpeg
# No Mac:
brew install ffmpeg

# 2. gdown — baixa arquivos do Google Drive
pip3 install gdown

# 3. Transcricao (escolher UM):

# Opcao A: Whisper API (recomendada — rapida, ~$0.006/min)
pip3 install openai
# Requer OPENAI_API_KEY no .env

# Opcao B: Whisper local (gratis, mais lento)
pip3 install openai-whisper
```

## Verificar se esta tudo pronto

```bash
which ffmpeg && echo "OK" || echo "FALTA ffmpeg"
which gdown && echo "OK" || echo "FALTA gdown"
python3 -c "import openai; print('OK')" 2>/dev/null || echo "FALTA openai SDK"
```

## Fluxo Completo

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌──────────────────────┐
│ Google Drive │────▶│  sync-drive  │────▶│ transcribe-audio│────▶│  extract-insights    │
│ (audios)    │     │ (gdown)      │     │ (Whisper)       │     │ (Claude AI)          │
└─────────────┘     └──────────────┘     └─────────────────┘     └──────────┬───────────┘
                                                                            │
                                                                            ▼
                                                              ┌──────────────────────────┐
                                                              │ knowledge-base/conversas/ │
                                                              │ YYYY-MM-DD-origem-tema.md │
                                                              └──────────────────────────┘
```

### Passo a passo detalhado

1. **Sync** — `gdown` acessa a pasta do Drive, baixa tudo pra `/tmp/intel/download/`
2. **Dedup** — Compara com `data/processed.json` pra nao reprocessar audios antigos
3. **Transcribe** — Cada audio novo passa pelo Whisper (API ou local) e vira texto
4. **Extract** — Claude analisa a transcricao e extrai 5 categorias de insights:
   - Decisoes (o que foi acordado)
   - Pendencias (o que alguem precisa fazer)
   - Prazos (datas mencionadas)
   - Preferencias do cliente (gostos e disgostos)
   - Oportunidades (ideias levantadas)
5. **Save** — Resultado salvo como `.md` em `knowledge-base/conversas/`
6. **Register** — Arquivo adicionado ao `data/processed.json` pra nao processar de novo

## Estrutura do Squad

```
squads/intel/
├── README.md              ← voce esta aqui
├── squad.yaml             ← definicao do squad
├── agents/
│   └── collector.md       ← agente principal (orquestra o pipeline)
├── tasks/
│   ├── full-pipeline.md   ← *intel (ponto de entrada)
│   ├── sync-drive.md      ← *sync
│   ├── transcribe-audio.md← *transcribe
│   └── extract-insights.md← *extract
└── data/
    └── processed.json     ← registro de audios ja processados
```

## Output: Formato do Markdown

Cada audio gera um arquivo assim:

```markdown
# Conversa: {titulo descritivo}

**Data:** 2026-03-10
**Origem:** Google Drive / {subpasta}
**Arquivo:** reuniao-jucilene.m4a
**Participantes:** Gabriel, Jucilene
**Duracao:** ~15min

---

## Transcricao
{texto completo}

---

## Insights Extraidos

### Decisoes
- Jucilene decidiu que nao quer preco nas fotos

### Pendencias
- Vitor vai mandar as fotos do Tank 300

### Prazos
- Primeiro post tem que sair ate quarta 12/03

### Preferencias do Cliente
- Prefere fotos com fundo limpo

### Oportunidades
- Gigante tem contato com influencer local
```

## Modo Manual (fallback)

Se o acesso automatico ao Drive nao funcionar:

1. Gabriel baixa os audios manualmente pra qualquer pasta
2. Roda: `*transcribe /caminho/do/audio.m4a`
3. O sistema transcreve e extrai insights normalmente

## Proximos Passos

- [ ] Instalar ffmpeg na maquina local
- [ ] Configurar OPENAI_API_KEY no .env
- [ ] Testar `*intel` com o primeiro audio
- [ ] Avaliar se vale configurar Google Drive MCP (`@devops *add-mcp google-drive`) pra acesso mais robusto
