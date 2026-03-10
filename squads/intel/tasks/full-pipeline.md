# Task: full-pipeline (*intel)

## Objetivo
Pipeline completo de inteligencia: baixar audios novos, transcrever e extrair insights.

## Trigger
```
*intel
```

## Fluxo

```
sync-drive → transcribe-audio (para cada novo) → extract-insights (para cada transcricao)
```

### Passo 1: Sync
- Executar task `sync-drive`
- Resultado: lista de arquivos novos em `/tmp/intel/download/`

### Passo 2: Transcribe
- Para cada arquivo de audio novo:
  - Executar task `transcribe-audio`
  - Salvar transcricao temporaria

### Passo 3: Extract
- Para cada transcricao:
  - Executar task `extract-insights`
  - Montar markdown final com template do collector

### Passo 4: Save
- Salvar cada resultado em `knowledge-base/conversas/YYYY-MM-DD-{origem}-{resumo}.md`
- Atualizar `squads/intel/data/processed.json` com os arquivos processados

### Passo 5: Report
- Resumo para Gabriel:
  ```
  Intel Report:
  - X audios novos encontrados
  - Y transcritos com sucesso
  - Z insights extraidos
  - Arquivos salvos em knowledge-base/conversas/
  ```

## Pre-requisitos Completos
1. `gdown` instalado (`pip3 install gdown`)
2. `ffmpeg` instalado
3. Whisper disponivel (API ou local)
4. Pasta do Drive acessivel

## Verificacao de Pre-requisitos
```bash
# Rodar antes do pipeline
which gdown || echo "FALTA: pip3 install gdown"
which ffmpeg || echo "FALTA: apt-get install ffmpeg"
python3 -c "import openai" 2>/dev/null || echo "FALTA: pip3 install openai (ou openai-whisper)"
```

## Modo Manual (fallback)
Se o acesso automatico ao Drive falhar:
1. Gabriel baixa os audios manualmente para `/tmp/intel/download/`
2. Roda `*transcribe /tmp/intel/download/audio.m4a`
3. O sistema transcreve e extrai insights normalmente
