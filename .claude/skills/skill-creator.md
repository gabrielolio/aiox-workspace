# skill-creator

Meta-skill que ensina a criar novas skills para o framework AIOX.

## Quando usar
Invoque quando precisar criar uma nova skill que encapsule um processo especializado, economizando tokens ao carregar apenas o conhecimento necessário para uma tarefa.

## O que é uma Skill AIOX

Skills são módulos de habilidade carregados dinamicamente. A IA lê apenas os metadados (cabeçalho) e carrega a skill completa só quando a tarefa exige. Isso economiza drasticamente tokens em sessões longas.

**Anatomia de uma skill:**
```
.claude/skills/
  {nome-da-skill}.md   ← arquivo markdown com instruções completas
```

## Processo de Criação

### Passo 1 — Identificar a skill
Determine:
- **Nome:** kebab-case, descritivo (ex: `pdf-to-markdown`, `extract-youtube-captions`)
- **Gatilho:** quando o agente deve carregar esta skill?
- **Entrada:** o que a skill recebe como input?
- **Saída:** o que a skill produz como output?
- **Ferramentas externas:** quais CLIs/libs são necessárias?

### Passo 2 — Estrutura padrão

Crie `.claude/skills/{nome-da-skill}.md` com:

```markdown
# {nome-da-skill}

{Uma linha descrevendo o propósito}

## Quando usar
{Condições que disparam esta skill}

## Pré-requisitos
{Ferramentas, libs, ou configs necessárias — com comandos de instalação}

## Instruções
{Passo a passo exato de execução}

## Exemplos
{Exemplos de uso real}

## Saída esperada
{Formato e localização do output}

## Erros comuns
{O que pode dar errado e como resolver}
```

### Passo 3 — Princípios de qualidade

- **Determinismo primeiro:** a skill deve produzir resultado consistente e reproduzível
- **Ferramentas locais > API:** prefira OCR local, CLIs gratuitas, scripts Python ao invés de chamadas de LLM
- **Falha informativa:** quando a skill falha, deve retornar status claro (SUCCESS | NO_OUTPUT | ERROR) com motivo
- **Tokens mínimos:** a skill não deve fazer a IA "pensar" — deve executar um processo definido
- **Testável:** inclua um comando de teste rápido na seção de exemplos

### Passo 4 — Registrar na KB de skills

Após criar a skill, adicione à lista em `.claude/skills/README.md` (criar se não existir):

```markdown
| Skill | Propósito | Quando usar |
|-------|-----------|-------------|
| skill-creator | Criar novas skills | Quando precisar encapsular um processo novo |
| pdf-to-markdown | Converter PDF para Markdown | Antes de analisar documentos PDF |
```

### Passo 5 — Testar

Valide a skill com um caso real antes de considerar pronta.

## Exemplo: Criar skill de web scraping

```
Objetivo: extrair dados de uma página web sem gastar tokens de API

Nome: web-scraper
Ferramentas: playwright, beautifulsoup4
Input: URL da página
Output: markdown com conteúdo extraído em .aios/tmp/{slug}.md
```

## Anti-padrões a evitar

- ❌ Skill que apenas reformata um prompt (isso não é skill, é agente)
- ❌ Skill que chama LLM para fazer processamento que um script faria melhor
- ❌ Skills gigantes que fazem múltiplas coisas (uma skill = uma responsabilidade)
- ❌ Hardcoding de paths absolutos (use variáveis de ambiente ou paths relativos ao CWD)
