# Task: transcribe-audio

## Objetivo
Transcrever um arquivo de audio para texto usando Whisper.

## Pre-requisitos
- `ffmpeg` instalado (`apt-get install ffmpeg` ou `brew install ffmpeg`)
- Uma das opcoes de transcricao:
  - **Opcao A (recomendada):** `pip3 install openai` + OPENAI_API_KEY no .env
  - **Opcao B (local):** `pip3 install openai-whisper` (requer ~1-2GB download)

## Input
- Caminho do arquivo de audio (ex: `/tmp/intel/download/subpasta/audio.m4a`)

## Passos

### Opcao A: Whisper API (OpenAI)
```python
import openai
client = openai.OpenAI()

with open(audio_path, "rb") as f:
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=f,
        language="pt",
        response_format="text"
    )
print(transcript)
```

### Opcao B: Whisper Local
```bash
whisper audio.m4a --model medium --language pt --output_format txt
```

### Pos-processamento
1. Limpar texto (remover timestamps se desnecessario)
2. Parografar por pausas naturais
3. Marcar trechos inaudiveis como `[inaudivel]`

## Output
- Texto transcrito pronto para analise
- Metadados: duracao estimada, modelo usado, confianca

## Custo estimado (Opcao A)
- Whisper API: ~$0.006/minuto
- Audio de 10 min = ~$0.06
- Audio de 1 hora = ~$0.36
