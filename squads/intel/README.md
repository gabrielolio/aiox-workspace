# Squad Intel — Coleta e Processamento de Inteligencia

## O que faz

Transforma audios de conversas em conhecimento estruturado. Pega os .m4a do Google Drive, transcreve via **Groq Whisper** (gratis e rapido), extrai o que importa (decisoes, pendencias, prazos, preferencias) e salva tudo organizado em `knowledge-base/conversas/`.

Pensa nele como um estagiario que ouve todas as reunioes e anota os pontos-chave num caderno organizado.

## Fonte de Dados

| Item | Valor |
|------|-------|
| **Google Drive** | [Pasta compartilhada](https://drive.google.com/drive/folders/1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY) |
| **Folder ID** | `1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY` |
| **Formatos** | .m4a, .mp3, .ogg, .wav |
| **Participantes** | Gabriel, Vitor, Jucilene (Fialho Motors) |

## Engine de Transcricao

| Item | Valor |
|------|-------|
| **Engine** | Groq Whisper |
| **Modelo** | `whisper-large-v3` |
| **Custo** | Gratis (tier gratuito generoso) |
| **Limite** | 20 requests/min, max 25MB por arquivo |
| **API Key** | `GROQ_API_KEY` no `.env` |

## Comandos

| Comando | O que faz |
|---------|-----------|
| `*intel` | Pipeline completo: baixa + transcreve + extrai insights |
| `*sync` | Apenas baixa audios novos do Drive |
| `*transcribe [arquivo]` | Transcreve um audio especifico |
| `*extract [arquivo]` | Extrai insights de uma transcricao ja feita |

## Pre-requisitos (instalar na maquina local)

```bash
# 1. gdown — baixa arquivos do Google Drive
pip3 install gdown

# 2. groq — SDK para transcricao via Groq Whisper (GRATIS)
pip3 install groq

# 3. ffmpeg — opcional, mas util para converter formatos
# No Ubuntu/WSL:
sudo apt-get install ffmpeg
# No Mac:
brew install ffmpeg
```

## Verificar se esta tudo pronto

```bash
which gdown && echo "OK" || echo "FALTA gdown"
python3 -c "import groq; print('OK')" 2>/dev/null || echo "FALTA groq SDK"
python3 -c "import os; assert os.getenv('GROQ_API_KEY') or open('.env').read().count('GROQ_API_KEY'); print('OK')" 2>/dev/null || echo "FALTA GROQ_API_KEY"
```

## Scripts Prontos

| Script | O que faz | Uso |
|--------|-----------|-----|
| `scripts/transcribe.py` | Transcreve audio via Groq Whisper | `python3 scripts/transcribe.py audio.m4a` |
| `scripts/download_drive.py` | Baixa arquivo ou pasta do Drive | `python3 scripts/download_drive.py <file-id>` |

### Exemplos rapidos

```bash
# Transcrever um audio local
python3 squads/intel/scripts/transcribe.py /caminho/do/audio.m4a

# Transcrever e salvar em arquivo
python3 squads/intel/scripts/transcribe.py audio.m4a --output transcricao.txt

# Baixar um arquivo do Drive
python3 squads/intel/scripts/download_drive.py 1PgGabx3m30BNeL4n2U_WCcoQHTXV7v6D --output audio.m4a

# Baixar toda a pasta do Drive
python3 squads/intel/scripts/download_drive.py 1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY --folder
```

## Fluxo Completo

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌──────────────────────┐
│ Google Drive │────▶│  sync-drive  │────▶│ transcribe-audio│────▶│  extract-insights    │
│ (audios)    │     │ (gdown)      │     │ (Groq Whisper)  │     │ (Claude AI)          │
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
3. **Transcribe** — Cada audio novo passa pelo Groq Whisper (whisper-large-v3) e vira texto
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
├── scripts/
│   ├── transcribe.py      ← script Python para transcricao Groq
│   └── download_drive.py  ← script Python para download do Drive
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
2. Roda: `python3 squads/intel/scripts/transcribe.py /caminho/do/audio.m4a`
3. O sistema transcreve e mostra o texto na tela

## Primeiro Teste

Para validar que tudo funciona, rode na maquina local:

```bash
# Baixar audio de teste do Drive
python3 squads/intel/scripts/download_drive.py 1PgGabx3m30BNeL4n2U_WCcoQHTXV7v6D --output /tmp/intel/teste-audio.m4a

# Transcrever
python3 squads/intel/scripts/transcribe.py /tmp/intel/teste-audio.m4a

# Se funcionou, o pipeline esta pronto!
```

## Proximos Passos

- [ ] Testar `*intel` com o primeiro audio na maquina local
- [ ] Avaliar se vale configurar Google Drive MCP (`@devops *add-mcp google-drive`) pra acesso mais robusto
- [ ] Implementar divisao automatica de audios > 25MB (pydub)
