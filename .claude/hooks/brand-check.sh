#!/bin/bash
# brand-check.sh — Validação de brand para conteúdo da Fialho Motors
# Hook PreToolUse (Write) — apenas alerta, nunca bloqueia

FILE_PATH="${1:-}"
CONTENT="${2:-}"

# Apenas verificar arquivos de conteúdo (.md ou .txt)
if [[ "$FILE_PATH" != *.md && "$FILE_PATH" != *.txt ]]; then
  exit 0
fi

# Termos de brand esperados em conteúdo da agência
BRAND_TERMS=("GWM" "Fialho" "Motors" "concessionária" "veículo" "SUV" "Haval" "Tank" "Ora Cat" "automotivo" "carro" "campo grande")

# Verificar se algum termo está presente (case-insensitive)
CONTENT_LOWER=$(echo "$CONTENT" | tr '[:upper:]' '[:lower:]')
FOUND=0

for term in "${BRAND_TERMS[@]}"; do
  term_lower=$(echo "$term" | tr '[:upper:]' '[:lower:]')
  if echo "$CONTENT_LOWER" | grep -q "$term_lower"; then
    FOUND=1
    break
  fi
done

# Se nenhum termo encontrado, logar aviso (não bloquear)
if [ "$FOUND" -eq 0 ] && [ -n "$CONTENT" ]; then
  LOG_DIR=".claude/logs"
  mkdir -p "$LOG_DIR"

  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  WARNING_MSG="$TIMESTAMP | BRAND-WARNING | Arquivo: $FILE_PATH | Nenhum termo de brand encontrado (GWM, Fialho, Motors, concessionária, veículo, SUV, Haval). Verifique se o conteúdo é destinado ao cliente Fialho Motors."

  echo "$WARNING_MSG" >> "$LOG_DIR/brand-warnings.log"

  # Avisar no terminal (não bloqueia — exit 0)
  echo "⚠️  BRAND CHECK: Nenhum termo de brand identificado em $FILE_PATH — aviso registrado em .claude/logs/brand-warnings.log"
fi

# Sempre exit 0 — hook é apenas informativo, nunca bloqueia
exit 0
