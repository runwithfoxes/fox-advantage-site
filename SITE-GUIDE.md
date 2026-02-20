# Fox Advantage Site — How Everything Works

## The Short Version

You make changes in Claude Code. It commits and pushes to GitHub. Vercel sees the push and deploys automatically. That's it. Site is live at **runwithfoxes.com**.

```
Claude Code (edit) → GitHub (push) → Vercel (auto-deploy) → runwithfoxes.com
```

---

## Where Things Live

| Thing | Where | URL |
|-------|-------|-----|
| Code | Your laptop | `/Users/pauldervan/projects/fox-advantage-site/next-site/` |
| Git repo | GitHub | `github.com/runwithfoxes/fox-advantage-site` |
| Hosting | Vercel | `vercel.com` (auto-deploys from GitHub) |
| Domain | Vercel DNS | `runwithfoxes.com` (nameservers point to Vercel) |
| Email subscribers | Substack | `runwithfoxes.substack.com` → Subscribers |

---

## Making a Change to the Site

### Step 1: Open Claude Code

Open Claude Code on your laptop. Navigate to the project folder or just tell Claude what you want changed. All editing happens here. You don't need to touch GitHub or Vercel.

**Examples of things you can say:**
- "Change the hero subtitle text"
- "Add a new project card for Heineken"
- "Make the fonts bigger on mobile"
- "Ungating chapter 13"

### Step 2: Claude makes the change

Claude edits the files, tests locally, commits and pushes to GitHub.

### Step 3: Site updates automatically

Vercel picks up the push. Your site updates at runwithfoxes.com in about 60 seconds.

**That's the whole workflow.** You never need to log into GitHub or Vercel for content changes.

---

## What You'd Change and Where

| I want to... | File to edit |
|--------------|-------------|
| Change landing page text | `src/components/Landing.tsx` |
| Add or edit a project card | `src/components/Landing.tsx` |
| Change how it looks (CSS) | `src/app/globals.css` |
| Edit a chapter | `src/content/chapters/chXX-slug.md` |
| Add a fox image | `public/fox/` (see `HOW-TO-MAKE-FOX-IMAGES.md`) |
| Change chapter gating | `src/lib/chapters.ts` (change `part >= 3` threshold) |
| Change the signup text | `src/components/EmailGate.tsx` and `Landing.tsx` |

---

## Key Files

```
next-site/
├── src/
│   ├── app/
│   │   ├── globals.css          ← all styling
│   │   ├── layout.tsx           ← fonts, meta tags
│   │   ├── page.tsx             ← landing page route
│   │   └── api/                 ← API routes (if added later)
│   ├── components/
│   │   ├── Landing.tsx          ← landing page (hero, about, parts, chapters, projects, author, signup)
│   │   ├── ChapterReader.tsx    ← free chapter page layout + fox rotation
│   │   ├── ChapterGate.tsx      ← gated chapter "coming soon" page
│   │   └── EmailGate.tsx        ← email signup form (posts to Substack)
│   └── lib/
│       └── chapters.ts          ← chapter data, gating logic, helpers
├── src/content/
│   └── chapters/                ← 41 markdown chapter files
├── public/
│   ├── fox/                     ← all fox images
│   │   └── HOW-TO-MAKE-FOX-IMAGES.md
│   └── Paul_photo.jpg
├── SITE-GUIDE.md                ← this file
└── package.json
```

---

## Chapter Gating

Currently, **Parts 1 and 2 (chapters 1-12) are free** to read. **Parts 3 and 4 (chapters 13-41) show a "coming soon" gate** instead of the chapter content. The markdown for gated chapters is never sent to the browser.

### How gating works

In `src/lib/chapters.ts`, there's a function:

```ts
export function isChapterGated(chapter: Chapter): boolean {
  return chapter.part >= 3;
}
```

Every chapter has a `part` number (1-4). If the part is 3 or higher, the chapter is gated.

### To ungating all chapters (when the book is ready)

Change the function to always return false:

```ts
export function isChapterGated(chapter: Chapter): boolean {
  return false;
}
```

Or tell Claude Code: "Ungating all chapters, the book is ready."

### To ungating just Part 3

Change `>= 3` to `>= 4`:

```ts
return chapter.part >= 4;
```

### What happens on gated chapters

- The chapter title still shows in the landing page list (with a "coming soon" tag)
- Clicking it takes you to a page that says "This chapter isn't published yet" with a "get notified" button
- The button links to the email signup section

---

## Adding or Editing Projects

The projects section is in `src/components/Landing.tsx`. Each project is a card:

```tsx
<div className="project-card">
  <div className="project-tag">\brand</div>
  <div className="project-name">National Lottery</div>
  <div className="project-desc">Marketer of the Year. Rebuilt the brand, delivered 21:1 ROI.</div>
</div>
```

To add a new one, copy a card block and change the tag, name, and description. Tags so far: `\brand`, `\book`, `\teaching`, `\ai`. Make up new ones as needed.

Two columns on desktop, one column on mobile. Automatic.

---

## Email Signup

The signup form posts to `https://runwithfoxes.substack.com/api/v1/free` via a hidden iframe. It subscribes people to your Substack newsletter.

**To check subscribers:** Log into `runwithfoxes.substack.com` → Subscribers.

After signing up, the browser stores `fox_access = true` in localStorage so the form doesn't show again. Clearing browser data or using incognito brings the form back.

---

## Domain and DNS

The domain is managed through Vercel, not GoDaddy.

- **Nameservers** were switched from GoDaddy to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- **DNS records** are managed in Vercel dashboard → your project → Settings → Domains → "View DNS Records"
- **GoDaddy** still owns the domain registration, but doesn't control DNS anymore
- **Email records** (MX, SPF, Microsoft CNAMEs) are set up in Vercel DNS to keep your Outlook/Smartlead email working
- **SSL** is automatic via Let's Encrypt

If you ever need to change DNS records, do it in Vercel, not GoDaddy.

---

## Common Tasks

| I want to... | Do this |
|--------------|---------|
| Change text on the site | Tell Claude Code what to change |
| Add a project card | Tell Claude Code, or edit `Landing.tsx` |
| Ungating chapters | Tell Claude Code, or change `chapters.ts` |
| Add a fox image | Follow `public/fox/HOW-TO-MAKE-FOX-IMAGES.md` |
| Fix mobile layout | Tell Claude Code the issue |
| See changes live | Claude Code pushes, Vercel auto-deploys in ~60s |
| Check email subscribers | Log into `runwithfoxes.substack.com` → Subscribers |
| Check deployment status | `vercel.com` → your project |
| Run locally | `npm run dev` then open `localhost:3000` |
| Change DNS records | Vercel dashboard → Domains → DNS Records |

---

## Things Still To Do

- [x] ~~Custom domain: runwithfoxes.com~~ (done)
- [x] ~~Email signup working~~ (done, posts to Substack)
- [x] ~~Chapter gating~~ (done, Parts 3 & 4 gated)
- [x] ~~Projects section~~ (done)
- [ ] **SEO / social sharing**: No page titles, descriptions, or Open Graph images yet
- [ ] **More fox poses**: See the pose ideas in `HOW-TO-MAKE-FOX-IMAGES.md`
- [ ] **New Replicate API token**: Old one was disabled when the repo went public. Create a new one at replicate.com and store in a `.env` file (not committed to git)
