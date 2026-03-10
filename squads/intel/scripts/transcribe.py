#!/usr/bin/env python3
"""
Squad Intel — Transcricao de audio via Groq Whisper (whisper-large-v3)

Uso:
    python3 transcribe.py <caminho-do-audio> [--output <caminho-saida.txt>]

Requer:
    - pip install groq
    - GROQ_API_KEY no .env ou variavel de ambiente
"""

import os
import sys
import json
from pathlib import Path


def load_env():
    """Carrega .env do projeto se existir."""
    env_path = Path(__file__).resolve().parents[3] / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    os.environ.setdefault(key.strip(), value.strip())


def transcribe(audio_path: str) -> str:
    """Transcreve um arquivo de audio usando Groq Whisper."""
    from groq import Groq

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("ERRO: GROQ_API_KEY nao encontrada. Configure no .env ou como variavel de ambiente.", file=sys.stderr)
        sys.exit(1)

    client = Groq(api_key=api_key)
    file_path = Path(audio_path)

    if not file_path.exists():
        print(f"ERRO: Arquivo nao encontrado: {audio_path}", file=sys.stderr)
        sys.exit(1)

    file_size_mb = file_path.stat().st_size / (1024 * 1024)
    print(f"Transcrevendo: {file_path.name} ({file_size_mb:.1f} MB)", file=sys.stderr)

    if file_size_mb > 25:
        print("AVISO: Arquivo > 25MB. Groq aceita ate 25MB por request.", file=sys.stderr)
        print("Considere dividir o audio com pydub.", file=sys.stderr)
        sys.exit(1)

    with open(file_path, "rb") as f:
        transcription = client.audio.transcriptions.create(
            file=(file_path.name, f.read()),
            model="whisper-large-v3",
            language="pt",
            response_format="text",
        )

    return transcription.text


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 transcribe.py <caminho-do-audio> [--output <arquivo.txt>]")
        sys.exit(1)

    load_env()

    audio_path = sys.argv[1]
    output_path = None

    if "--output" in sys.argv:
        idx = sys.argv.index("--output")
        if idx + 1 < len(sys.argv):
            output_path = sys.argv[idx + 1]

    text = transcribe(audio_path)

    if output_path:
        Path(output_path).write_text(text, encoding="utf-8")
        print(f"Transcricao salva em: {output_path}", file=sys.stderr)
    else:
        print(text)


if __name__ == "__main__":
    main()
