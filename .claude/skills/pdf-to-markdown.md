# pdf-to-markdown

Converte PDFs para Markdown usando OCR local — sem gastar tokens de API Claude.

## Quando usar
- Antes de analisar qualquer documento PDF: contrato, relatório, livro, artigo
- Quando precisar indexar PDFs na base de conhecimento
- Substituição direta de: "leia este PDF e me diga..."

**Economia estimada:** uma análise de PDF de 100 páginas via API = ~$2-5. Via OCR local = $0.

## Pré-requisitos

### Opção A — Marker (recomendado, ML-based, alta qualidade)
```bash
pip install marker-pdf
# Requer: Python 3.9+, ~2GB de modelos baixados na primeira execução
```

### Opção B — pdfplumber (simples, sem ML, texto nativo apenas)
```bash
pip install pdfplumber
# Funciona apenas para PDFs com texto selecionável (não escaneados)
```

### Opção C — Docling (IBM, enterprise-grade)
```bash
pip install docling
```

## Instruções

### Passo 1 — Verificar o PDF
```python
import subprocess, sys
pdf_path = "{CAMINHO_DO_PDF}"

# Testar se é PDF com texto nativo ou escaneado
result = subprocess.run(
    ["python", "-c", f"import pdfplumber; p=pdfplumber.open('{pdf_path}'); print(len(p.pages[0].extract_text() or ''))"],
    capture_output=True, text=True
)
char_count = int(result.stdout.strip() or "0")
is_native_text = char_count > 50
print(f"PDF tipo: {'texto nativo' if is_native_text else 'escaneado/imagem'}")
```

### Passo 2 — Converter (escolher método)

**Se texto nativo (pdfplumber):**
```python
import pdfplumber, os, re

pdf_path = "{CAMINHO_DO_PDF}"
output_path = pdf_path.replace('.pdf', '.md')

with pdfplumber.open(pdf_path) as pdf:
    pages = []
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ""
        if text.strip():
            pages.append(f"## Página {i+1}\n\n{text}")

markdown = "\n\n---\n\n".join(pages)
open(output_path, 'w', encoding='utf-8').write(markdown)
print(f"Salvo: {output_path} ({len(markdown)} chars)")
```

**Se escaneado ou alta qualidade necessária (marker):**
```bash
marker_single "{CAMINHO_DO_PDF}" --output_dir ".aios/tmp/" --output_format markdown
# Output em: .aios/tmp/{nome_sem_extensao}/{nome_sem_extensao}.md
```

**Com Docling:**
```python
from docling.document_converter import DocumentConverter
converter = DocumentConverter()
result = converter.convert("{CAMINHO_DO_PDF}")
markdown = result.document.export_to_markdown()
open("{OUTPUT_PATH}", 'w').write(markdown)
```

### Passo 3 — Localização padrão do output

Salvar sempre em:
```
.aios/tmp/{nome-do-arquivo}.md
```

Criar diretório se não existir:
```bash
mkdir -p .aios/tmp/
```

### Passo 4 — Verificar qualidade

```python
md_path = "{OUTPUT_PATH}"
content = open(md_path, encoding='utf-8').read()
word_count = len(content.split())
print(f"Output: {word_count} palavras, {len(content)} chars")
if word_count < 50:
    print("AVISO: output muito pequeno — verificar se PDF tem conteúdo extraível")
```

## Exemplos

```
# Converter relatório anual
Input:  downloads/relatorio-2025.pdf
Output: .aios/tmp/relatorio-2025.md

# Converter livro escaneado
Input:  biblioteca/the-lean-startup.pdf
Output: .aios/tmp/the-lean-startup.md (via marker)
```

## Saída esperada

```
STATUS: SUCCESS
Output: .aios/tmp/{nome}.md
Tamanho: {N} palavras
Método: pdfplumber | marker | docling
```

## Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `ModuleNotFoundError: pdfplumber` | Lib não instalada | `pip install pdfplumber` |
| Output vazio | PDF é imagem/escaneado | Usar marker em vez de pdfplumber |
| `marker_single: command not found` | marker não no PATH | `python -m marker.scripts.convert_single` |
| PDF protegido por senha | Restrição de DRM | Remover com `qpdf --decrypt input.pdf output.pdf` |
| Caracteres estranhos | Encoding | Adicionar `encoding='utf-8', errors='ignore'` |

## Integração com base de conhecimento

Após conversão bem-sucedida, o arquivo `.md` pode ser:
1. Lido diretamente pelo agente via `Read` tool (muito mais barato que processar o PDF)
2. Indexado na base de dados com `@analyst *build-kb`
3. Enviado ao Gemini CLI para análise pesada (`cat arquivo.md | gemini -p "instrução"`)
