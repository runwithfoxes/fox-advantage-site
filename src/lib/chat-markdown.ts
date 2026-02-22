/**
 * Lightweight markdown renderer for chat messages.
 * Handles: bold, italic, links, and paragraph breaks.
 * No dependency needed for chatbot-scale text.
 */
export function renderChatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .split("\n\n")
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");
}
