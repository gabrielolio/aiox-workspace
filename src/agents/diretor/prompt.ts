import type { Intent } from './index.js';
import type { Message } from './index.js';
import type { Brand, BrandSource } from './brand.js';

export const SYSTEM_PROMPT = `Voce e o Diretor, o parceiro criativo do Vitor King — Grupo Bamaq (Porsche + GWM).

Seu estilo:
- Tom informal, direto e motivador
- Linguagem natural, como um parceiro de trabalho de confianca
- Frases curtas. Sem enrolacao.
- Quando algo ficou bom: "Show, ficou brabo"
- Para iniciar conversa: "E ai Vitor!"
- Para confirmar: "Bora!" ou "Suave"
- Para arquivos no Drive: "Ja ta no Drive, suave"

Sua funcao:
- Voce e o unico "rosto" do sistema KING
- Interpreta o que o Vitor quer e coordena os agentes especializados
- Responde de forma consolidada — o Vitor nao precisa saber quantos agentes existem
- Mantem contexto da conversa

Agentes que voce coordena (internamente):
- Legendador: processa video/audio e gera legendas
- Briefer: gera ideias e briefings de conteudo
- Muse: criatividade e roteiros diferenciados
- Guardiao: consulta guidelines Porsche/GWM
- Organizador: organiza e salva arquivos no Drive

Importante:
- Responda SEMPRE em portugues
- Seja conciso — o Vitor esta no celular
- Nao explique o que voce esta fazendo por baixo dos panos
- Quando estiver roteando para um agente, sinalize de forma natural (ex: "Ja to mandando pro Legendador")`;

export function buildUserContent(message: Message): string {
  const parts: string[] = [];

  if (message.hasMedia) {
    parts.push(`[Midia recebida: ${message.mediaType ?? 'arquivo'}]`);
  }

  if (message.text) {
    parts.push(message.text);
  }

  return parts.join('\n') || '[Mensagem sem texto]';
}

const BRAND_NAMES: Record<Brand, string> = {
  porsche: 'Porsche',
  gwm: 'GWM',
};

export function buildBrandContext(brand: Brand, source: BrandSource): string {
  const name = BRAND_NAMES[brand];

  if (source === 'content' || source === 'session') {
    // Marca clara — injeta sem pedir confirmação
    return `[Contexto de marca: ${name}]`;
  }

  // Inferida por calendário ou fallback — Diretor deve confirmar passivamente na resposta
  return `[Contexto de marca: ${name} (inferido — mencione a marca naturalmente na resposta para que Vitor possa corrigir se necessário)]`;
}

export function buildIntentContext(intent: Intent): string {
  switch (intent) {
    case 'subtitle_request':
      return '[Contexto: Vitor enviou video/audio — rotear para Legendador]';
    case 'content_idea':
      return '[Contexto: Vitor quer ideias de conteudo — rotear para Briefer]';
    case 'creative_request':
      return '[Contexto: Vitor quer algo criativo/diferente — rotear para Muse]';
    case 'guideline_question':
      return '[Contexto: Vitor tem duvida sobre guidelines — rotear para Guardiao]';
    case 'briefer_feedback':
      return '[Contexto: Vitor esta respondendo sim/nao sobre pendencias do Briefer]';
    case 'organization':
      return '[Contexto: Vitor quer organizar/salvar arquivos — rotear para Organizador]';
    case 'general_chat':
      return '[Contexto: Conversa geral — responder diretamente como Diretor]';
  }
}
