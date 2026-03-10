# Task: transcribe-audio

## Objetivo
Transcrever um arquivo de audio para texto usando Groq Whisper (whisper-large-v3).

## Pre-requisitos
- `pip install groq` (SDK Groq)
- `GROQ_API_KEY` configurada no `.env`
- ffmpeg NAO e necessario — Groq aceita .m4a direto

## Input
- Caminho do arquivo de audio (ex: `/tmp/intel/download/subpasta/audio.m4a`)

## Execucao

### Via script Python (squads/intel/scripts/transcribe.py)
```bash
python3 squads/intel/scripts/transcribe.py /caminho/do/audio.m4a
```

### Via codigo direto
```python
import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

with open(audio_path, "rb") as f:
    transcription = client.audio.transcriptions.create(
        file=(os.path.basename(audio_path), f.read()),
        model="whisper-large-v3",
        language="pt",
        response_format="text"
    )
print(transcription.text)
```

## Pos-processamento
1. Limpar texto (remover timestamps se desnecessario)
2. Parografar por pausas naturais
3. Marcar trechos inaudiveis como `[inaudivel]`

## Output
- Texto transcrito pronto para analise
- Metadados: modelo usado (whisper-large-v3), engine (Groq)

## Custo estimado
- Groq Whisper: GRATIS no tier gratuito (limites generosos)
- Limite: 20 requests/min, audio ate 25MB por request
- Para audios > 25MB: dividir com pydub antes de enviar

## Limitacoes Groq
- Arquivo maximo: 25MB
- Formatos aceitos: .m4a, .mp3, .mp4, .mpeg, .mpga, .ogg, .wav, .webm
- Se o audio for muito grande, usar `pydub` para dividir em chunks
