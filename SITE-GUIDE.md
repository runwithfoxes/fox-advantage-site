# Fox Advantage Site — How Everything Works

## The Short Version

You make changes in Claude Code. You push to GitHub. Vercel sees the push and deploys automatically. That's it.

```
Claude Code (edit) → GitHub (push) → Vercel (auto-deploy) → live site
```

---

## Where Things Live

| Thing | Where | URL |
|-------|-------|-----|
| Code | Your laptop | `/Users/pauldervan/projects/fox-advantage-site/next-site/` |
| Git repo | GitHub | `github.com/runwithfoxes/fox-advantage-site` |
| Hosting | Vercel | Vercel dashboard (auto-deploys from GitHub) |
| Domain | Your registrar | `runwithfoxes.com` (point DNS at Vercel) |

---

## Making Changes

### 1. Open Claude Code

All editing happens here. You don't need to touch GitHub or Vercel directly for content changes.

**To change text on the landing page:**
- File: `src/components/Landing.tsx`
- This has the hero, about, parts, chapters, download, author, and projects sections
- Just tell Claude Code what you want changed

**To change how it looks:**
- File: `src/app/globals.css`
- All styling lives here, including mobile rules

**To change chapter content:**
- Markdown files in `content/chapters/`
- Each chapter is a `.md` file

**To add a new fox image:**
- See `public/fox/HOW-TO-MAKE-FOX-IMAGES.md` for the full recipe
- Generate with SeedReam, remove background, drop into `public/fox/`
- Add to the `FOX_POSES` array in `src/components/ChapterReader.tsx`

### 2. Test locally

Claude Code can start the dev server for you. Or run it yourself:

```bash
cd /Users/pauldervan/projects/fox-advantage-site/next-site
npm run dev
```

Then open `http://localhost:3000` in your browser.

### 3. Push to go live

Once you're happy, tell Claude Code to commit and push. Or do it yourself:

```bash
git add -A
git commit -m "describe what changed"
git push
```

Vercel picks up the push automatically. Your site updates in about 60 seconds.

---

## Key Files

```
next-site/
├── src/
│   ├── app/
│   │   ├── globals.css          ← all styling
│   │   ├── layout.tsx           ← fonts, meta tags
│   │   └── page.tsx             ← landing page route
│   ├── components/
│   │   ├── Landing.tsx          ← landing page content
│   │   ├── ChapterReader.tsx    ← chapter page layout + fox rotation
│   │   └── EmailGate.tsx        ← email signup form
│   └── lib/
│       └── chapters.ts          ← loads markdown chapters
├── content/
│   └── chapters/                ← 41 markdown chapter files
├── public/
│   ├── fox/                     ← all fox images
│   │   └── HOW-TO-MAKE-FOX-IMAGES.md
│   └── Paul_photo.jpg
└── package.json
```

---

## Adding or Editing Projects

The projects section is in `src/components/Landing.tsx`. Each project is a card like this:

```tsx
<div className="project-card">
  <div className="project-tag">\brand</div>
  <div className="project-name">National Lottery</div>
  <div className="project-desc">Marketer of the Year. Rebuilt the brand, delivered 21:1 ROI.</div>
</div>
```

To add a new one, copy a card block and change the tag, name, and description. Tags so far: `\brand`, `\book`, `\teaching`, `\ai`. Make up new ones as needed.

The grid automatically handles layout. Two columns on desktop, one on mobile.

---

## Custom Domain (runwithfoxes.com)

### Step 1: Add domain in Vercel

1. Go to your Vercel dashboard (vercel.com)
2. Click your project (fox-advantage-site)
3. Go to **Settings** → **Domains**
4. Type `runwithfoxes.com` and click **Add**
5. Vercel will show you the DNS records you need

### Step 2: Update DNS at your registrar

Wherever you bought `runwithfoxes.com` (GoDaddy, Namecheap, Cloudflare, etc.):

**Option A — If Vercel asks for an A record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**Option B — If Vercel asks for a CNAME:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

You'll probably want both: the A record for `runwithfoxes.com` and the CNAME for `www.runwithfoxes.com`.

### Step 3: Wait

DNS takes anywhere from 5 minutes to 48 hours. Usually under 30 minutes. Vercel will show a green tick when it's working. SSL certificate is automatic.

### Where to do this

- **Vercel dashboard**: Add the domain to your project
- **Your domain registrar**: Update the DNS records
- You do NOT need Claude Code or GitHub for this part

---

## Common Tasks

| I want to... | Do this |
|--------------|---------|
| Change text on the site | Tell Claude Code what to change |
| Add a project card | Tell Claude Code, or edit `Landing.tsx` |
| Add a fox image | Follow `public/fox/HOW-TO-MAKE-FOX-IMAGES.md` |
| Fix mobile layout | Tell Claude Code the issue, or edit `globals.css` |
| See changes live | Push to GitHub (Vercel auto-deploys) |
| Add custom domain | Vercel dashboard + DNS registrar |
| Check deployment status | Vercel dashboard |
| Run locally | `npm run dev` then open `localhost:3000` |

---

## Things Still To Do

- [ ] **Custom domain**: Point `runwithfoxes.com` at Vercel
- [ ] **PDF download**: The email gate collects emails but there's no actual PDF yet at `/public/the-fox-advantage.pdf`
- [ ] **SEO / social sharing**: No page titles, descriptions, or Open Graph images yet
- [ ] **More fox poses**: See the pose ideas in `HOW-TO-MAKE-FOX-IMAGES.md`
- [ ] **New Replicate API token**: Old one was disabled when the repo went public. Create a new one at replicate.com and store in a `.env` file (not committed to git)
