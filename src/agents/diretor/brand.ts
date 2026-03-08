export type Brand = 'porsche' | 'gwm';

// Camada 2 — palavras-chave que identificam a marca no conteúdo da mensagem
const PORSCHE_KEYWORDS = [
  'porsche', 'cayenne', '911', 'taycan', 'macan', 'panamera',
  'gt3', 'gt4', 'cayman', 'boxster', 'carrera',
];

const GWM_KEYWORDS = [
  'gwm', 'tank', 'tank 300', 'haval', 'ora', 'jolion', 'h6',
  'tank300', 'great wall',
];

// Camada 1 — inferência por calendário de Vitor
// Seg/Qua/Sex → Porsche | Ter/Qui → GWM | Fim de semana → ambíguo
// 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb
function inferByCalendar(): Brand | null {
  const day = new Date().getDay();
  if (day === 1 || day === 3 || day === 5) return 'porsche';
  if (day === 2 || day === 4) return 'gwm';
  return null;
}

function inferByContent(text: string): Brand | null {
  const lower = text.toLowerCase();
  if (PORSCHE_KEYWORDS.some((kw) => lower.includes(kw))) return 'porsche';
  if (GWM_KEYWORDS.some((kw) => lower.includes(kw))) return 'gwm';
  return null;
}

export type BrandSource = 'content' | 'session' | 'calendar' | 'default';

export interface BrandInference {
  brand: Brand;
  source: BrandSource;
}

/**
 * Infere a marca ativa em 3 camadas:
 * 1. Conteúdo da mensagem (palavras-chave explícitas)
 * 2. Sessão ativa (marca já estabelecida na conversa)
 * 3. Calendário (padrão semanal de Vitor)
 * 4. Default: porsche (fallback para fim de semana sem contexto)
 */
export function inferBrand(text: string, sessionBrand: Brand | null): BrandInference {
  // Camada 2: conteúdo tem prioridade — Vitor mencionou a marca explicitamente
  const byContent = inferByContent(text);
  if (byContent) return { brand: byContent, source: 'content' };

  // Camada sessão: marca já estabelecida nesta conversa
  if (sessionBrand) return { brand: sessionBrand, source: 'session' };

  // Camada 1: calendário
  const byCalendar = inferByCalendar();
  if (byCalendar) return { brand: byCalendar, source: 'calendar' };

  // Fallback: fim de semana sem contexto — assume Porsche, confirma passivamente
  return { brand: 'porsche', source: 'default' };
}
