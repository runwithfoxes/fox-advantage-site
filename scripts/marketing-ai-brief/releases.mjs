/**
 * Read the last 7 days of GitHub RELEASES for a repo.
 *
 * Releases are the human-written "what's new" for a product repo, which is why
 * this brief reads them instead of raw commits. Needs a token (public repos are
 * readable anonymously but the token lifts the rate limit and is required in the
 * scoped session proxy).
 *
 * Returns: { repo, name, tag, published, highlights: [lines] }[]
 */

const WINDOW_DAYS = 7;

function sinceMs(days = WINDOW_DAYS) {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

/**
 * Release bodies are markdown, often long. We keep the lines that read like a
 * change (bullets, "feat"/"add"/"new"), drop the boilerplate (contributors,
 * changelog links, "Full Changelog"), and cap the count so the writer prompt
 * stays tight. The model does the real selection later; this is just triage.
 */
function highlightsFromBody(body, max = 12) {
  if (!body) return [];
  const out = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^#{1,6}\s/.test(line)) continue; // headings
    if (/full changelog|new contributors|^\*\*full|https?:\/\/github\.com\/.*\/compare\//i.test(line))
      continue;
    if (/@[\w-]+ made their first contribution/i.test(line)) continue;
    const bullet = line.replace(/^[-*]\s+/, "");
    if (bullet.length < 6) continue;
    out.push(bullet);
    if (out.length >= max) break;
  }
  return out;
}

export async function readReleases(source, token, days = WINDOW_DAYS) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rwf-marketing-ai-brief",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/repos/${source.repo}/releases?per_page=20`,
    { headers },
  );
  if (!res.ok) {
    throw new Error(`releases ${source.repo}: ${res.status} ${await res.text()}`);
  }
  const all = await res.json();
  const cutoff = sinceMs(days);
  const recent = all.filter((r) => {
    const t = Date.parse(r.published_at || r.created_at || "");
    return !r.draft && Number.isFinite(t) && t >= cutoff;
  });

  return recent.map((r) => ({
    repo: source.repo,
    name: r.name || r.tag_name,
    tag: r.tag_name,
    published: r.published_at,
    highlights: highlightsFromBody(r.body),
  }));
}
