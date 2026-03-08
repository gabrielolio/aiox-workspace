const LINE_MAX_CHARS = 45; // Standard for Instagram/TikTok captions

/**
 * Formats a raw transcript into subtitle blocks suitable for WhatsApp and social media.
 *
 * Rules:
 * - Each line has at most LINE_MAX_CHARS characters
 * - Breaks happen at word boundaries
 * - Sentences separated by punctuation get a blank line between them
 * - Output includes a header with word count
 */
export function formatAsSubtitles(transcript: string): string {
  if (!transcript.trim()) return 'Não consegui captar nada no áudio. 🤔';

  // Split into sentences on punctuation
  const sentences = transcript
    .replace(/([.!?])\s+/g, '$1\n')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const blocks: string[] = [];

  for (const sentence of sentences) {
    const words = sentence.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (candidate.length <= LINE_MAX_CHARS) {
        currentLine = candidate;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);
    blocks.push(lines.join('\n'));
  }

  const wordCount = transcript.split(/\s+/).filter(Boolean).length;
  const header = `📝 *Legenda* (${wordCount} palavras)\n`;
  const divider = '─'.repeat(28);

  return `${header}${divider}\n\n${blocks.join('\n\n')}`;
}
