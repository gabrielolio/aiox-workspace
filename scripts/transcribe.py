#!/usr/bin/env python3
"""
KING - Motor de Transcricao e Analise de Audio
===============================================
Transcreve audio, identifica interlocutores, analisa contexto
e gera dossie detalhado em formato profissional.

Uso:
    python3 scripts/transcribe.py <arquivo_audio>
    python3 scripts/transcribe.py audio.mp3 --modelo medium --idioma pt
"""

import sys
import os
import json
import re
import hashlib
from datetime import datetime, timedelta
from pathlib import Path
from collections import defaultdict

# ---------------------------------------------------------------------------
# Dependencias
# ---------------------------------------------------------------------------
try:
    import whisper
except ImportError:
    sys.exit("ERRO: openai-whisper nao instalado. Rode: pip3 install openai-whisper")

try:
    from pydub import AudioSegment
    from pydub.silence import detect_nonsilent
except ImportError:
    sys.exit("ERRO: pydub nao instalado. Rode: pip3 install pydub")


# ---------------------------------------------------------------------------
# Constantes
# ---------------------------------------------------------------------------
MODELOS_WHISPER = ["tiny", "base", "small", "medium", "large"]
SILENCIO_LIMIAR_DB = -40        # dBFS para considerar silencio
SILENCIO_MIN_MS = 700           # pausa minima entre falas (ms)
TROCA_SPEAKER_PAUSA_MS = 1500   # pausa que indica troca de interlocutor
ENERGIA_DELTA_DB = 6            # delta de energia para diferenciar speakers


# ===========================================================================
# 1. CARREGAMENTO E PRE-PROCESSAMENTO
# ===========================================================================
def carregar_audio(caminho: str) -> AudioSegment:
    """Carrega audio em qualquer formato suportado pelo ffmpeg."""
    ext = Path(caminho).suffix.lower().lstrip(".")
    if ext in ("mp3", "wav", "ogg", "flac", "m4a", "aac", "wma", "webm", "opus"):
        audio = AudioSegment.from_file(caminho, format=ext if ext != "m4a" else "mp4")
    else:
        audio = AudioSegment.from_file(caminho)
    return audio


def info_audio(audio: AudioSegment, caminho: str) -> dict:
    """Extrai metadados do audio."""
    duracao_s = len(audio) / 1000.0
    return {
        "arquivo": os.path.basename(caminho),
        "caminho_completo": os.path.abspath(caminho),
        "duracao_segundos": round(duracao_s, 2),
        "duracao_formatada": str(timedelta(seconds=int(duracao_s))),
        "canais": audio.channels,
        "taxa_amostragem": audio.frame_rate,
        "bits_por_amostra": audio.sample_width * 8,
        "tamanho_bytes": os.path.getsize(caminho),
        "formato": Path(caminho).suffix.lstrip(".").upper(),
        "hash_md5": hashlib.md5(open(caminho, "rb").read()).hexdigest(),
    }


# ===========================================================================
# 2. TRANSCRICAO COM WHISPER
# ===========================================================================
def transcrever(caminho: str, modelo: str = "base", idioma: str = None) -> dict:
    """Transcreve audio usando OpenAI Whisper."""
    print(f"\n[WHISPER] Carregando modelo '{modelo}'...")
    model = whisper.load_model(modelo)

    print(f"[WHISPER] Transcrevendo '{os.path.basename(caminho)}'...")
    opcoes = {"fp16": False, "verbose": False}
    if idioma:
        opcoes["language"] = idioma

    resultado = model.transcribe(caminho, **opcoes)
    print(f"[WHISPER] Transcricao concluida. Idioma detectado: {resultado.get('language', '?')}")
    return resultado


# ===========================================================================
# 3. IDENTIFICACAO DE INTERLOCUTORES (SPEAKER DIARIZATION SIMPLES)
# ===========================================================================
def segmentar_por_energia(audio: AudioSegment) -> list:
    """
    Segmenta o audio em blocos de fala e atribui speakers
    baseado em padroes de energia e pausas.
    """
    # Detectar regioes nao-silenciosas
    regioes = detect_nonsilent(
        audio,
        min_silence_len=SILENCIO_MIN_MS,
        silence_thresh=SILENCIO_LIMIAR_DB,
    )

    if not regioes:
        return []

    segmentos = []
    speaker_atual = "Interlocutor A"
    energia_anterior = None

    for i, (inicio_ms, fim_ms) in enumerate(regioes):
        trecho = audio[inicio_ms:fim_ms]
        energia = trecho.dBFS

        # Detectar troca de speaker por pausa longa ou mudanca de energia
        if i > 0:
            pausa = inicio_ms - regioes[i - 1][1]
            delta_energia = abs(energia - energia_anterior) if energia_anterior else 0

            if pausa >= TROCA_SPEAKER_PAUSA_MS or delta_energia >= ENERGIA_DELTA_DB:
                speaker_atual = (
                    "Interlocutor B" if speaker_atual == "Interlocutor A"
                    else "Interlocutor A"
                )

        energia_anterior = energia

        segmentos.append({
            "speaker": speaker_atual,
            "inicio_ms": inicio_ms,
            "fim_ms": fim_ms,
            "inicio_fmt": str(timedelta(milliseconds=inicio_ms))[:-3],
            "fim_fmt": str(timedelta(milliseconds=fim_ms))[:-3],
            "duracao_s": round((fim_ms - inicio_ms) / 1000.0, 2),
            "energia_dbfs": round(energia, 1),
        })

    return segmentos


def atribuir_texto_a_speakers(segmentos_energia: list, resultado_whisper: dict) -> list:
    """
    Cruza os segmentos de energia (com speakers) com os segmentos
    do Whisper (com texto) para atribuir texto a cada interlocutor.
    """
    segmentos_whisper = resultado_whisper.get("segments", [])
    falas = []

    for seg_w in segmentos_whisper:
        inicio_w = int(seg_w["start"] * 1000)
        fim_w = int(seg_w["end"] * 1000)
        texto = seg_w["text"].strip()

        if not texto:
            continue

        # Encontrar speaker com maior sobreposicao temporal
        melhor_speaker = "Interlocutor A"
        melhor_sobrep = 0

        for seg_e in segmentos_energia:
            sobrep_inicio = max(inicio_w, seg_e["inicio_ms"])
            sobrep_fim = min(fim_w, seg_e["fim_ms"])
            sobrep = max(0, sobrep_fim - sobrep_inicio)

            if sobrep > melhor_sobrep:
                melhor_sobrep = sobrep
                melhor_speaker = seg_e["speaker"]

        falas.append({
            "speaker": melhor_speaker,
            "texto": texto,
            "inicio": seg_w["start"],
            "fim": seg_w["end"],
            "inicio_fmt": str(timedelta(seconds=int(seg_w["start"]))),
            "fim_fmt": str(timedelta(seconds=int(seg_w["end"]))),
        })

    return falas


# ===========================================================================
# 4. ANALISE DE CONTEXTO
# ===========================================================================
def analisar_contexto(falas: list, info: dict) -> dict:
    """Analisa o contexto geral da conversa."""
    # Contadores por speaker
    stats_speaker = defaultdict(lambda: {"falas": 0, "palavras": 0, "tempo_s": 0.0})

    for f in falas:
        sp = f["speaker"]
        stats_speaker[sp]["falas"] += 1
        stats_speaker[sp]["palavras"] += len(f["texto"].split())
        stats_speaker[sp]["tempo_s"] += f["fim"] - f["inicio"]

    # Texto completo
    texto_completo = " ".join(f["texto"] for f in falas)
    total_palavras = len(texto_completo.split())

    # Palavras mais frequentes (excluindo stopwords basicas)
    stopwords_pt = {
        "a", "o", "e", "de", "do", "da", "em", "que", "um", "uma", "para",
        "com", "nao", "no", "na", "os", "as", "se", "por", "mais", "foi",
        "mas", "eu", "ele", "ela", "isso", "esse", "essa", "tem", "ser",
        "ter", "como", "nos", "voce", "ai", "la", "ja", "vai", "ta", "ne",
        "eh", "assim", "entao", "porque", "quando", "muito", "so", "ou",
        "ate", "das", "dos", "ao", "me", "meu", "minha", "seu", "sua",
        "uns", "umas", "este", "esta", "aqui", "ali", "onde", "qual",
        "quem", "lhe", "nos", "vos", "eles", "elas", "era", "era", "tudo",
    }
    palavras = re.findall(r'\b[a-zA-Zà-ú]{3,}\b', texto_completo.lower())
    freq = defaultdict(int)
    for p in palavras:
        if p not in stopwords_pt:
            freq[p] += 1
    top_palavras = sorted(freq.items(), key=lambda x: -x[1])[:20]

    # Speakers
    speakers_info = {}
    for sp, st in stats_speaker.items():
        speakers_info[sp] = {
            "total_falas": st["falas"],
            "total_palavras": st["palavras"],
            "tempo_total_fala": round(st["tempo_s"], 1),
            "percentual_palavras": round(st["palavras"] / max(total_palavras, 1) * 100, 1),
            "media_palavras_por_fala": round(st["palavras"] / max(st["falas"], 1), 1),
        }

    return {
        "total_interlocutores": len(stats_speaker),
        "interlocutores": speakers_info,
        "total_falas": len(falas),
        "total_palavras": total_palavras,
        "duracao_audio": info["duracao_formatada"],
        "idioma_detectado": "Portugues (BR)" if any(
            p in texto_completo.lower() for p in ["voce", "entao", "nao", "tambem"]
        ) else "Outro/Indefinido",
        "palavras_chave": [p for p, _ in top_palavras[:15]],
        "top_frequencias": dict(top_palavras),
    }


# ===========================================================================
# 5. GERACAO DO DOSSIE
# ===========================================================================
def gerar_dossie(
    falas: list,
    contexto: dict,
    info: dict,
    resultado_whisper: dict,
    caminho_saida: str,
) -> str:
    """Gera o dossie completo em formato Markdown."""

    agora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    idioma_whisper = resultado_whisper.get("language", "desconhecido")

    linhas = []
    linhas.append("=" * 80)
    linhas.append("  DOSSIE DE TRANSCRICAO E ANALISE DE AUDIO")
    linhas.append("  KING - Sistema de Automacoes e Inteligencia Criativa")
    linhas.append("=" * 80)
    linhas.append("")

    # -- CABECALHO --
    linhas.append("## 1. INFORMACOES DO DOCUMENTO")
    linhas.append("")
    linhas.append(f"  Data de Geracao      : {agora}")
    linhas.append(f"  Gerado por           : KING / Synkra AIOS v4.4.6")
    linhas.append(f"  Classificacao        : CONFIDENCIAL")
    linhas.append(f"  Hash de Integridade  : {info['hash_md5']}")
    linhas.append("")

    # -- DADOS DO AUDIO --
    linhas.append("-" * 80)
    linhas.append("## 2. DADOS DO AUDIO ANALISADO")
    linhas.append("")
    linhas.append(f"  Arquivo              : {info['arquivo']}")
    linhas.append(f"  Formato              : {info['formato']}")
    linhas.append(f"  Duracao              : {info['duracao_formatada']} ({info['duracao_segundos']}s)")
    linhas.append(f"  Canais               : {info['canais']}")
    linhas.append(f"  Taxa de Amostragem   : {info['taxa_amostragem']} Hz")
    linhas.append(f"  Resolucao            : {info['bits_por_amostra']} bits")
    linhas.append(f"  Tamanho              : {info['tamanho_bytes']:,} bytes")
    linhas.append(f"  Idioma Detectado     : {idioma_whisper}")
    linhas.append("")

    # -- PERFIL DOS INTERLOCUTORES --
    linhas.append("-" * 80)
    linhas.append("## 3. PERFIL DOS INTERLOCUTORES")
    linhas.append("")
    linhas.append(f"  Total Identificados  : {contexto['total_interlocutores']}")
    linhas.append("")

    for sp, dados in contexto["interlocutores"].items():
        linhas.append(f"  ### {sp}")
        linhas.append(f"    Intervencoes       : {dados['total_falas']}")
        linhas.append(f"    Total de Palavras  : {dados['total_palavras']}")
        linhas.append(f"    Tempo de Fala      : {dados['tempo_total_fala']}s")
        linhas.append(f"    Participacao       : {dados['percentual_palavras']}%")
        linhas.append(f"    Media por Fala     : {dados['media_palavras_por_fala']} palavras")
        linhas.append("")

    # -- ANALISE DE CONTEXTO --
    linhas.append("-" * 80)
    linhas.append("## 4. ANALISE DE CONTEXTO")
    linhas.append("")
    linhas.append(f"  Total de Falas       : {contexto['total_falas']}")
    linhas.append(f"  Total de Palavras    : {contexto['total_palavras']}")
    linhas.append(f"  Duracao do Audio     : {contexto['duracao_audio']}")
    linhas.append(f"  Idioma Predominante  : {contexto['idioma_detectado']}")
    linhas.append("")
    linhas.append("  ### Palavras-Chave Identificadas:")
    for i, kw in enumerate(contexto["palavras_chave"], 1):
        freq = contexto["top_frequencias"].get(kw, 0)
        linhas.append(f"    {i:2d}. {kw:<25s} ({freq}x)")
    linhas.append("")

    # -- TRANSCRICAO COMPLETA --
    linhas.append("-" * 80)
    linhas.append("## 5. TRANSCRICAO COMPLETA")
    linhas.append("")

    speaker_anterior = None
    for f in falas:
        if f["speaker"] != speaker_anterior:
            linhas.append("")
            linhas.append(f"  [{f['inicio_fmt']}] **{f['speaker']}**:")
            speaker_anterior = f["speaker"]
        linhas.append(f"    \"{f['texto']}\"")
    linhas.append("")

    # -- TRANSCRICAO BRUTA --
    linhas.append("-" * 80)
    linhas.append("## 6. TRANSCRICAO BRUTA (SEM SPEAKERS)")
    linhas.append("")
    texto_bruto = resultado_whisper.get("text", "")
    # Quebrar em linhas de ~100 chars
    palavras_bruto = texto_bruto.split()
    linha_atual = "  "
    for p in palavras_bruto:
        if len(linha_atual) + len(p) + 1 > 100:
            linhas.append(linha_atual)
            linha_atual = "  " + p
        else:
            linha_atual += " " + p if linha_atual.strip() else "  " + p
    if linha_atual.strip():
        linhas.append(linha_atual)
    linhas.append("")

    # -- RODAPE --
    linhas.append("=" * 80)
    linhas.append("  FIM DO DOSSIE")
    linhas.append(f"  Gerado em {agora} por KING")
    linhas.append(f"  Modelo Whisper: {resultado_whisper.get('language', '?')} | Segmentos: {len(falas)}")
    linhas.append("=" * 80)

    conteudo = "\n".join(linhas)

    with open(caminho_saida, "w", encoding="utf-8") as f:
        f.write(conteudo)

    return conteudo


# ===========================================================================
# 6. EXPORTAR JSON ESTRUTURADO
# ===========================================================================
def exportar_json(falas, contexto, info, resultado_whisper, caminho_json):
    """Exporta dados estruturados em JSON para consumo programatico."""
    dados = {
        "meta": {
            "gerado_em": datetime.now().isoformat(),
            "versao": "1.0.0",
            "motor": "KING / Whisper",
        },
        "audio": info,
        "contexto": contexto,
        "falas": falas,
        "texto_completo": resultado_whisper.get("text", ""),
    }
    with open(caminho_json, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    return caminho_json


# ===========================================================================
# MAIN
# ===========================================================================
def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="KING - Transcricao de Audio e Geracao de Dossie",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python3 scripts/transcribe.py audio.mp3
  python3 scripts/transcribe.py reuniao.wav --modelo medium --idioma pt
  python3 scripts/transcribe.py entrevista.m4a --saida relatorio.md
        """,
    )
    parser.add_argument("audio", help="Caminho do arquivo de audio")
    parser.add_argument("--modelo", default="base", choices=MODELOS_WHISPER,
                        help="Modelo Whisper (default: base)")
    parser.add_argument("--idioma", default=None,
                        help="Codigo do idioma (ex: pt, en, es). Auto-detecta se omitido")
    parser.add_argument("--saida", default=None,
                        help="Caminho do arquivo de saida (default: <audio>_dossie.md)")

    args = parser.parse_args()

    if not os.path.isfile(args.audio):
        sys.exit(f"ERRO: Arquivo nao encontrado: {args.audio}")

    # Caminhos de saida
    base = Path(args.audio).stem
    dir_saida = Path(args.audio).parent
    caminho_dossie = args.saida or str(dir_saida / f"{base}_dossie.md")
    caminho_json = str(dir_saida / f"{base}_dados.json")

    print("=" * 60)
    print("  KING - Motor de Transcricao")
    print("=" * 60)

    # 1. Carregar audio
    print("\n[1/5] Carregando audio...")
    audio = carregar_audio(args.audio)
    info = info_audio(audio, args.audio)
    print(f"       Duracao: {info['duracao_formatada']} | Formato: {info['formato']}")

    # 2. Transcrever
    print("\n[2/5] Transcrevendo com Whisper...")
    resultado = transcrever(args.audio, modelo=args.modelo, idioma=args.idioma)

    # 3. Identificar speakers
    print("\n[3/5] Identificando interlocutores...")
    segmentos = segmentar_por_energia(audio)
    falas = atribuir_texto_a_speakers(segmentos, resultado)
    n_speakers = len(set(f["speaker"] for f in falas))
    print(f"       {n_speakers} interlocutor(es) identificado(s), {len(falas)} falas")

    # 4. Analisar contexto
    print("\n[4/5] Analisando contexto...")
    contexto = analisar_contexto(falas, info)
    print(f"       Palavras-chave: {', '.join(contexto['palavras_chave'][:5])}")

    # 5. Gerar dossie
    print("\n[5/5] Gerando dossie...")
    dossie = gerar_dossie(falas, contexto, info, resultado, caminho_dossie)
    exportar_json(falas, contexto, info, resultado, caminho_json)

    print(f"\n{'=' * 60}")
    print(f"  CONCLUIDO")
    print(f"  Dossie  : {caminho_dossie}")
    print(f"  JSON    : {caminho_json}")
    print(f"{'=' * 60}")

    # Imprimir dossie no terminal tambem
    print("\n")
    print(dossie)

    return 0


if __name__ == "__main__":
    sys.exit(main() or 0)
