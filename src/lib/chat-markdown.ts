/**
 * Lightweight markdown renderer for chat messages.
 * Handles: bold, italic, links, and paragraph breaks.
 * Escapes HTML first to prevent XSS from injected content.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, "https://placeholder.com");
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function renderChatMarkdown(text: string): string {
  // Escape HTML entities first, then apply markdown formatting
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_match, linkText, url) => {
        const decodedUrl = url.replace(/&amp;/g, "&");
        if (!isSafeUrl(decodedUrl)) return linkText;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      }
    )
    .split("\n\n")
    .map((p: string) => `<p>${p.trim()}</p>`)
    .join("");
}
