# AIOX Skills Registry

Skills são módulos de habilidade carregados dinamicamente — a IA lê apenas os metadados e carrega a skill completa só quando necessário. Isso economiza tokens em sessões longas.

## Skills Disponíveis

| Skill | Propósito | Quando usar |
|-------|-----------|-------------|
| `skill-creator` | Criar novas skills para o framework AIOX | Quando precisar encapsular um processo novo como skill |
| `pdf-to-markdown` | Converter PDF para Markdown via OCR local | Antes de analisar qualquer documento PDF — evita gastar tokens de API |

## Como usar uma skill

Mencione a skill no seu prompt ou peça ao agente:
```
"Use a skill pdf-to-markdown para processar este arquivo: relatorio.pdf"
```

## Como criar uma nova skill

Use a skill `skill-creator`:
```
"Use a skill skill-creator para criar uma nova skill de [X]"
```

## Princípios

1. **Uma skill = uma responsabilidade**
2. **Ferramentas locais primeiro** — OCR local, CLIs gratuitas, scripts Python
3. **Output determinístico** — mesma entrada = mesma saída sempre
4. **Falha informativa** — SUCCESS | NO_OUTPUT | ERROR com motivo claro

---
*Criado: 2026-03-05 — implementação gap AIOX "Skills (Framework)" prioridade CRÍTICA*
