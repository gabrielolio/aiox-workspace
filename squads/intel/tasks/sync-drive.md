# Task: sync-drive

## Objetivo
Baixar audios novos do Google Drive para processamento local.

## Pre-requisitos
- `gdown` instalado (`pip3 install gdown`)
- Pasta do Drive acessivel (publica ou com credenciais)

## Passos

### 1. Carregar registro de processados
```bash
# Se nao existir, criar vazio
cat squads/intel/data/processed.json 2>/dev/null || echo '{"files":[]}' > squads/intel/data/processed.json
```

### 2. Listar conteudo do Drive
```bash
# Baixar estrutura de pastas (dry-run nao disponivel, baixar para /tmp)
mkdir -p /tmp/intel/download
gdown --folder "https://drive.google.com/drive/folders/1wGiSvbMu_iV3P2-CRqBerCQvMsNIlDkY" \
  --remaining-ok \
  -O /tmp/intel/download
```

### 3. Identificar arquivos novos
- Listar todos os `.m4a`, `.mp3`, `.ogg`, `.wav` baixados
- Comparar com `processed.json`
- Novos = arquivos que nao constam no registro

### 4. Output
- Arquivos de audio em `/tmp/intel/download/`
- Lista de novos arquivos para processar

## Alternativa: Google Drive MCP
Se o MCP do Google Drive estiver configurado (`@devops *add-mcp google-drive`), usar a API diretamente em vez de `gdown`. Mais confiavel e permite listar sem baixar tudo.

## Notas
- `gdown` funciona com pastas publicas ou com link compartilhado
- Para pastas privadas, configurar Google Drive MCP ou `rclone`
- Sempre usar `--remaining-ok` para ignorar arquivos que falharem
