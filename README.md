# luisbobadilladias.github.io

My personal site: full-time work, consulting and teaching. Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages by GitHub Actions.

- Spanish (default): `/`
- English: `/en/`

## Run it locally

Requires Node 22 or newer.

```sh
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # type-check + build into dist/
npm run preview   # serve the built dist/ folder
```

`npm run build` fails if a content file is missing a field or one language has a key the other doesn't, so run it before pushing.

## Where the text lives

All copy is in `src/content/`. You never need to touch components to change text.

```
src/content/
  contact.json          email, WhatsApp number, LinkedIn, GitHub, Instagram (shared)
  teaching.json         course dates, prices, sign-up form (shared)
  es/  en/              one folder per language, same file names in both
    site.json           nav labels, footer, small UI strings, default SEO description
    home.json           home tagline and the three cards
    now.md              the "Ahora / Now" block on the home page
    career.json         Plub narrative, timeline, education, certifications, skills
    consulting.json     services, process, CTA copy
    course.json         course page copy: syllabus, FAQ, workshops
    projects.json       projects and notes page headings
    cases/*.md          consulting case studies (one file each)
    projects/*.md       project cards (one file each)
    blog/*.md           posts
```

If you change something in `es/`, change it in `en/` too.

### Update the "Now" block

Edit `src/content/es/now.md` and `src/content/en/now.md`. Change `updated:` to today's date.

### Change the course dates or price

Edit **only** `src/content/teaching.json`. All times are Paraguay time (`-03:00`).

| Field | What it controls |
|---|---|
| `masterclass.start` | Masterclass date and time shown on the page |
| `waitlistFrom` | From this moment the CTAs switch to "Sumate a la lista de espera de la próxima cohorte" / "Join the waitlist for the next cohort" |
| `cohort.start`, `cohort.end` | Cohort dates (`YYYY-MM-DD`) |
| `cohort.weekdays` | Class days, 1 = Monday … 7 = Sunday |
| `cohort.startTime`, `cohort.endTime` | Class hours (`HH:MM`) |
| `price.launch`, `price.regular`, `price.launchUntil` | Launch price is shown until `launchUntil`, then only the regular price |
| `signupUrl`, `waitlistUrl` | Google Forms links |

The switch happens on its own. The page is built in the right state, a small script re-checks the visitor's clock on load, and the site also rebuilds every day at 03:00 Paraguay time.

For a new cohort, update the dates, set `waitlistFrom` to after the new masterclass, and push.

### Add a case study or project

Copy an existing file in `src/content/es/cases/` (or `projects/`), rename it, edit the frontmatter, and do the same in `en/`.

- Cases are sorted by `order`. Set `placeholder: true` to show a "details coming soon" card.
- Projects use `status`: `in-progress`, `available` or `archived`. Optional `url` and `repo`.

### Add a blog post

Create `src/content/es/blog/my-slug.md` (the file name becomes the URL):

```md
---
title: Post title
description: One or two sentences. Used for SEO and social previews.
date: 2026-11-20
tags: [pandas, excel]
translationKey: my-topic   # optional: same value in the ES and EN versions links them
draft: false               # true = only visible in `npm run dev`
---

Text in Markdown. Code blocks with ```python get syntax highlighting.
```

The English version goes in `src/content/en/blog/` with its own slug. Tag pages and RSS (`/rss.xml`, `/en/rss.xml`) update automatically.

### Photo, CV and badges

- Photo: `src/assets/luis.jpg` (square). Home banner: `src/assets/space.jpg`.
- CV: `public/cv.pdf`.
- Certification badges: `src/assets/badges/<name>.png`, referenced as `"badge": "<name>"` in `career.json`.
- Social share images: `npm run og` regenerates `public/og/` from the photo. Re-run it if you change the photo or your title.

## Deploy

Every push to `master` builds and deploys through `.github/workflows/deploy.yml`. In the repo settings, **Pages → Source** must be set to **GitHub Actions**.

## Notes

- No analytics or tracking scripts.
- Never put bank details or ID numbers in any content file.
- Colors follow the original site: white and near-black sections with a magenta accent (`#CC005F`, or `#FF4D94` on dark backgrounds for contrast). The tokens are at the top of `src/styles/global.css`.
