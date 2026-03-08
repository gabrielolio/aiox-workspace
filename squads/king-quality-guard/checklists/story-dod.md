# Checklist: Definition of Done — KING System Stories

**Uso:** Antes de marcar uma story como concluida, todos os itens devem estar ✅ ou justificados.

---

## Criterios obrigatorios (todos precisam ser ✅)

- [ ] Todos os Acceptance Criteria do arquivo de story verificados
- [ ] Todos os arquivos do File List da story foram criados
- [ ] Verificacao de codigo passa sem erros (typecheck + lint)
- [ ] Novos agentes tem rota configurada no Diretor (router.ts)
- [ ] Novos agentes tem index.ts exportando a funcao principal
- [ ] Nenhuma informacao inventada pelo agente — so responde o que esta na base de dados

## Criterios de verificacao manual (registrar resultado)

- [ ] Teste manual realizado: funcionalidade funciona no WhatsApp
- [ ] Consultas/acoes registradas corretamente no SQLite
- [ ] Resposta do agente esta no formato correto (sem texto tecnico exposto)

## Criterios de qualidade de codigo (desejavel mas nao bloqueante)

- [ ] Sem console.log esquecido no codigo
- [ ] Sem variaveis declaradas e nao usadas
- [ ] Comentarios em ingles (convencao do projeto)
- [ ] Arquivo de story atualizado: ACs marcados como [x], File List atualizada

---

## Notas

- Um story so e considerada "concluida" quando o commit sobe e o *check retorna tudo ✅/⚠️
- Itens ⚠️ precisam ser verificados manualmente — documentar o resultado
- Em caso de duvida: chamar `*check [story-id]` e seguir o relatorio
