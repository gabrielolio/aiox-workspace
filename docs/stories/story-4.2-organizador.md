# Story 4.2 — Organizador: Google Drive Automático

**Status:** Ready for Review

**Executor:** @dev
**Quality Gate:** @qa

---

## Story

**As a** Vitor (produtor de conteúdo),
**I want** que o KING salve automaticamente meus vídeos, fotos e roteiros no Google Drive já organizados na pasta certa,
**so that** eu não perca tempo organizando arquivos manualmente e encontre tudo rapidamente quando precisar.

---

## Acceptance Criteria

1. Quando Vitor manda uma mídia (vídeo ou foto) com contexto de marca identificável, o Organizador salva no Google Drive na pasta correta: `KING/{Marca}/{Tipo}/{Ano-Semana}/`
2. Quando Vitor manda um roteiro (texto longo ou documento), o Organizador salva em `KING/{Marca}/roteiros/{Ano-Semana}/`
3. O Diretor detecta a intenção `organization` e chama o Organizador
4. O Organizador confirma para Vitor: "Salvo! 📁 GWM > vídeos > 2026-W10"
5. Se a marca não puder ser identificada, o Organizador pergunta: "Qual marca? Porsche ou GWM?"
6. A estrutura de pastas é criada automaticamente se não existir
7. Os arquivos são nomeados com timestamp para evitar colisão: `{timestamp}-{nome_original}`

### Estrutura de pastas no Drive
```
KING/
  Porsche/
    videos/
    fotos/
    roteiros/
  GWM/
    videos/
    fotos/
    roteiros/
```

---

## Tasks / Subtasks

- [x] Configurar Google Drive API
  - [x] Adicionar `googleapis` como dependência no `package.json` (já estava presente)
  - [x] Criar `src/services/gdrive/client.ts` com autenticação via Service Account
  - [x] Adicionar variáveis de ambiente: `GDRIVE_SERVICE_ACCOUNT_KEY`, `GDRIVE_ROOT_FOLDER_ID`
  - [x] Atualizar `src/config/env.ts` com as novas variáveis
- [x] Criar agente Organizador em `src/agents/organizador/`
  - [x] `index.ts` — função `handleOrganization(message, brand): Promise<string>`
  - [x] `drive-uploader.ts` — lógica de upload e criação de pastas
  - [x] `path-resolver.ts` — calcula o caminho correto baseado em marca, tipo de mídia e data
- [x] Integrar Organizador no Diretor
  - [x] Importar `handleOrganization` em `src/agents/diretor/index.ts`
  - [x] Chamar Organizador no bloco `organization` do `handleMessage` (padrão Guardião)
  - [x] Remover stub do `router.ts` no case `organization`
- [x] Registrar uploads no SQLite
  - [x] Adicionar tabela `uploads` ao schema: `(id, timestamp, brand, type, drive_url, filename)`
  - [x] Organizador registra cada upload na tabela

---

## Dev Notes

### Autenticação Google Drive (Service Account)

O método mais simples para uso em servidor — sem OAuth interativo:

```typescript
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GDRIVE_SERVICE_ACCOUNT_KEY!),
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });
```

A pasta raiz `KING/` no Drive deve ser compartilhada com o e-mail do Service Account.

### Resolução de caminho

```
marca: "Porsche" | "GWM"
tipo: "videos" | "fotos" | "roteiros"
semana: "2026-W10"  ← format: YYYY-W{getISOWeek()}
```

Caminho final: `KING/{marca}/{tipo}/{semana}/`

### Criação de pasta (evitar duplicatas)

Antes de criar uma pasta, buscar se já existe:
```typescript
const res = await drive.files.list({
  q: `name = '${folderName}' and '${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
  fields: 'files(id, name)',
});
```
Se não existe, criar com `mimeType: 'application/vnd.google-apps.folder'`.

### Download de mídia do WhatsApp

O Diretor já tem lógica de download via Evolution API (ver `src/agents/diretor/index.ts` — `processMediaMessage`). O Organizador recebe o buffer/stream e faz upload direto para o Drive.

### Padrão de integração — seguir o Guardião

Mesma estrutura já usada para Guardião e Muse:
- Importado diretamente no `handleMessage` do Diretor
- Retorna `Promise<string>` (mensagem para o Vitor)
- Erros retornam mensagem amigável

### Tabela SQLite nova (`uploads`)

```sql
CREATE TABLE IF NOT EXISTS uploads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  brand TEXT NOT NULL,
  type TEXT NOT NULL,
  drive_url TEXT NOT NULL,
  filename TEXT NOT NULL
);
```

Adicionar ao schema em `src/database/db.ts`.

### Variáveis de ambiente novas

Adicionar ao `.env.example`:
```
GDRIVE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
GDRIVE_ROOT_FOLDER_ID=1abc...xyz
```

### Testing

- Mock do cliente Google Drive para não depender de rede nos testes
- Testar `path-resolver.ts` isoladamente — é lógica pura, fácil de testar
- Testar que tabela `uploads` é criada corretamente no SQLite

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-03-07 | 1.0 | Story criada | River (sm) |

---

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
Sem issues críticos. 1 ajuste de teste: mock de `loadEnv` com `mockReturnValueOnce` não funciona após ESM resolution — substituído por mock do `uploadToDrive` com `mockRejectedValueOnce`.

### Completion Notes
- `googleapis` já estava no package.json (v144) — nenhuma alteração necessária
- `env.ts` já tinha `GOOGLE_CREDENTIALS_PATH` e `GOOGLE_DRIVE_FOLDER_ID`; adicionei as novas vars sem remover as antigas para não quebrar código existente
- `handleOrganization` recebe `(message, brand)` — brand vem da inferência de texto ou sessão
- Para mensagens sem mídia (text-only), cria um `.txt` com o conteúdo como roteiro
- 79/79 testes passando

### File List
- `src/services/gdrive/client.ts` (criado)
- `src/agents/organizador/index.ts` (criado)
- `src/agents/organizador/path-resolver.ts` (criado)
- `src/agents/organizador/drive-uploader.ts` (criado)
- `src/agents/organizador/__tests__/index.test.ts` (criado)
- `src/agents/organizador/__tests__/path-resolver.test.ts` (criado)
- `src/database/db.ts` (modificado — tabela `uploads` + `recordUpload`)
- `src/config/env.ts` (modificado — GDRIVE_SERVICE_ACCOUNT_KEY, GDRIVE_ROOT_FOLDER_ID)
- `src/agents/diretor/index.ts` (modificado — import + bloco organization)
- `src/agents/diretor/router.ts` (modificado — stub removido)
- `src/agents/diretor/__tests__/router.test.ts` (modificado — teste atualizado para null)

---

## QA Results

*(preenchido pelo @qa após revisão)*
