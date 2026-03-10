#!/usr/bin/env python3
"""
Squad Intel — Download de arquivo individual do Google Drive

Uso:
    python3 download_drive.py <file-id> [--output <caminho-saida>]

Para IDs de arquivo, extrair da URL:
    https://drive.google.com/file/d/<FILE_ID>/view

Requer:
    - pip install gdown
"""

import sys
import os
from pathlib import Path


def download_file(file_id: str, output_path: str = None) -> str:
    """Baixa um arquivo do Google Drive pelo ID."""
    try:
        import gdown
    except ImportError:
        print("ERRO: gdown nao instalado. Rode: pip install gdown", file=sys.stderr)
        sys.exit(1)

    url = f"https://drive.google.com/uc?id={file_id}"
    output = output_path or f"/tmp/intel/{file_id}"

    os.makedirs(os.path.dirname(output) if os.path.dirname(output) else "/tmp/intel", exist_ok=True)

    print(f"Baixando arquivo {file_id}...", file=sys.stderr)
    result = gdown.download(url, output, quiet=False)

    if result:
        print(f"Salvo em: {result}", file=sys.stderr)
        return result
    else:
        print("ERRO: Falha ao baixar arquivo.", file=sys.stderr)
        sys.exit(1)


def download_folder(folder_id: str, output_dir: str = "/tmp/intel/download") -> str:
    """Baixa todos os arquivos de uma pasta do Google Drive."""
    try:
        import gdown
    except ImportError:
        print("ERRO: gdown nao instalado. Rode: pip install gdown", file=sys.stderr)
        sys.exit(1)

    url = f"https://drive.google.com/drive/folders/{folder_id}"
    os.makedirs(output_dir, exist_ok=True)

    print(f"Baixando pasta {folder_id}...", file=sys.stderr)
    gdown.download_folder(url, output=output_dir, quiet=False, remaining_ok=True)

    return output_dir


def main():
    if len(sys.argv) < 2:
        print("Uso: python3 download_drive.py <file-id-ou-folder-id> [--output <caminho>] [--folder]")
        sys.exit(1)

    target_id = sys.argv[1]
    output_path = None
    is_folder = "--folder" in sys.argv

    if "--output" in sys.argv:
        idx = sys.argv.index("--output")
        if idx + 1 < len(sys.argv):
            output_path = sys.argv[idx + 1]

    if is_folder:
        result = download_folder(target_id, output_path or "/tmp/intel/download")
    else:
        result = download_file(target_id, output_path)

    print(result)


if __name__ == "__main__":
    main()
