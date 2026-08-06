/**
 * Gather the last 7 days of commits for a product, from GitHub or local git.
 *
 * Both sources return the same shape so the rest of the workflow never knows
 * which one ran:
 *   { sha, date, author, subject, body, files: [changed paths] }
 */

import { execFileSync } from "node:child_process";

const WINDOW_DAYS = 7;

function sinceISO(days = WINDOW_DAYS) {
  const ms = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(ms).toISOString();
}

/**
 * GitHub API path. Used in production for repos we don't have on disk
 * (Revid, Outrank). Needs a token with read access to the repo.
 */
async function fromGitHub(repo, token, days = WINDOW_DAYS) {
  const since = sinceISO(days);
  const base = `https://api.github.com/repos/${repo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rwf-affiliate-newsletter",
  };

  const listRes = await fetch(`${base}/commits?since=${since}&per_page=100`, {
    headers,
  });
  if (!listRes.ok) {
    throw new Error(
      `GitHub list commits failed for ${repo}: ${listRes.status} ${await listRes.text()}`,
    );
  }
  const list = await listRes.json();

  // Fetch each commit for its file list. Capped so a very busy week can't fan
  // out into hundreds of calls; the selector only needs a representative set.
  const capped = list.slice(0, 40);
  const out = [];
  for (const c of capped) {
    let files = [];
    try {
      const detRes = await fetch(`${base}/commits/${c.sha}`, { headers });
      if (detRes.ok) {
        const det = await detRes.json();
        files = (det.files || []).map((f) => f.filename);
      }
    } catch {
      // file list is a nicety, not a blocker
    }
    const [subject, ...rest] = (c.commit.message || "").split("\n");
    out.push({
      sha: c.sha.slice(0, 7),
      date: c.commit.author?.date || c.commit.committer?.date || "",
      author: c.commit.author?.name || "",
      subject: subject.trim(),
      body: rest.join("\n").trim(),
      files,
    });
  }
  if (list.length > capped.length) {
    console.warn(
      `  note: ${list.length} commits this week, read the first ${capped.length} for detail`,
    );
  }
  return out;
}

/**
 * Local git path. Used by the prototype and for any repo we have checked out.
 * No network, no token.
 *
 * Two passes, because mixing `--name-only` into a custom pretty format
 * interleaves the file list with the next commit's fields and is a nightmare to
 * split. Pass 1 is metadata only; pass 2 is files keyed by sha; we merge them.
 */
function fromLocalGit(cwd, days = WINDOW_DAYS) {
  const REC = "\x1e"; // commit record separator, safe inside messages
  const FIELD = "\x1f"; // field separator
  const git = (fArgs) =>
    execFileSync("git", ["log", `--since=${days} days ago`, ...fArgs], {
      cwd,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });

  // Pass 1: metadata. REC at the START of each commit so split() is clean.
  const metaFmt = `${REC}%h${FIELD}%aI${FIELD}%an${FIELD}%s${FIELD}%b`;
  const metaRaw = git([`--pretty=format:${metaFmt}`]);
  const commits = [];
  const bySha = new Map();
  for (const rec of metaRaw.split(REC)) {
    if (!rec.trim()) continue;
    const [sha, date, author, subject, ...bodyParts] = rec.split(FIELD);
    const c = {
      sha: sha.trim(),
      date: (date || "").trim(),
      author: (author || "").trim(),
      subject: (subject || "").trim(),
      body: bodyParts.join(FIELD).trim(),
      files: [],
    };
    commits.push(c);
    bySha.set(c.sha, c);
  }

  // Pass 2: files per commit. Each chunk starts with the sha, then file paths.
  const fileRaw = git([`--pretty=format:${REC}%h`, "--name-only"]);
  for (const chunk of fileRaw.split(REC)) {
    if (!chunk.trim()) continue;
    const lines = chunk.split("\n");
    const sha = lines.shift().trim();
    const c = bySha.get(sha);
    if (!c) continue;
    c.files = lines.map((l) => l.trim()).filter(Boolean);
  }

  return commits;
}

/**
 * Pick a source and return commits. `source` is "github" or "local"; when
 * omitted it auto-selects: GitHub if a token exists, else local if a path does.
 */
export async function gatherCommits(product, { source, token } = {}) {
  // A product with a localPath (the prototype) reads local git unless GitHub is
  // explicitly asked for. A product without one (Revid, Outrank) uses GitHub.
  const wantLocal =
    source === "local" || (source !== "github" && product.localPath);
  if (wantLocal) {
    if (!product.localPath) {
      throw new Error(`${product.name} has no localPath; use --source github`);
    }
    return { source: "local", commits: fromLocalGit(product.localPath) };
  }
  if (!token) throw new Error("GITHUB_TOKEN required to read from GitHub");
  return { source: "github", commits: await fromGitHub(product.github, token) };
}
