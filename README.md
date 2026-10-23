# Phoenix Gardening GSY – website

Static website for **Phoenix Gardening GSY**, a professional gardening service in Guernsey.
Plain HTML + Tailwind CSS + a small vanilla JS file. No framework, no build step needed to deploy.

- 📞 07781 103908
- ✉️ phoenix4710@yahoo.com

---

## Folder structure

```
├── index.html            ← the whole homepage (every section is commented)
├── thank-you.html        ← where the quote form lands after sending
├── 404.html              ← "page not found"
├── assets/
│   ├── css/styles.css    ← BUILT Tailwind file the site loads (don't edit by hand)
│   └── js/main.js        ← menu, animations, slider, seasons planner, form checks
├── src/input.css         ← edit styles here, then rebuild (see below)
├── tailwind.config.js    ← brand colours + fonts
├── images/
│   ├── brand/            ← logos, phoenix emblem, app icons, social share image
│   ├── work/             ← job photos (each has -sm and -lg sizes)
│   └── tools/            ← the round service photos (from the flyer)
├── favicon.ico / favicon.svg / apple-touch-icon.png / site.webmanifest
├── robots.txt / sitemap.xml
└── _headers              ← Cloudflare Pages caching + security headers
```

## Editing

**Text**: open `index.html` and search for the section banner, e.g. `===== SERVICES =====`. All the copy is plain HTML.
The seasons planner text lives in `assets/js/main.js` under `SEASONS`.

**Photos**: drop new photos into `images/work/` and update the `src` in `index.html`. Use `.webp` around 1000–1400px wide for big images and ~600px for small ones.

**Before / after**:
- Pressure washing slider → `patio-before-*.webp` and `patio-after-*.webp`.
- Gallery toggles → `strimming-before/after` and `hedge-before/after`.

**Colours / fonts**: `tailwind.config.js`:

| Name   | Hex       | Used for                        |
|--------|-----------|---------------------------------|
| forest | `#173d1c` | headings, dark sections         |
| fern   | `#2f7a2a` | accents                         |
| leaf   | `#6aa531` | flyer leaf green, hero curve    |
| lime   | `#9bd136` | phoenix t-shirt green, buttons  |
| mist   | `#eef1e8` | page background                 |

Fonts: **Fraunces** (headings) + **Manrope** (body), loaded from Google Fonts. The logo wordmark is Cinzel, already converted to shapes inside the SVGs.

### Rebuilding the CSS

Only needed if you add new Tailwind classes or edit `src/input.css`:

```bash
npm install
npm run build     # or: npm run watch while editing
```

Commit the updated `assets/css/styles.css`. The live site uses that file directly.

## Contact form (FormSubmit)

The form posts to `https://formsubmit.co/phoenix4710@yahoo.com`.
**The first time it's used, FormSubmit emails phoenix4710@yahoo.com an activation link that must be clicked**, otherwise no messages come through. Send a test enquiry once the site is live and get the client to click it (check spam).

After sending, people land on `thank-you.html`. The JS sets this automatically to the current domain.

## Deploying (Cloudflare Pages)

- Connect this repo in Cloudflare Pages.
- Framework preset: **None**, build command: *(leave empty)*, output directory: `/`.

## Domain

The site currently uses **`https://www.phoenixgardening.gg`** as a placeholder in the canonical tag, Open Graph tags, structured data, `robots.txt` and `sitemap.xml`.
When the real domain is confirmed, find & replace it across the repo.

## SEO included

- Unique title and meta description aimed at "gardener Guernsey" style searches.
- LocalBusiness and FAQPage structured data (JSON-LD).
- Open Graph / Twitter share image (`images/brand/og-image.jpg`, 1200×630).
- Descriptive alt text on every photo, one `h1`, logical heading order.
- `sitemap.xml`, `robots.txt`, favicons, web manifest, theme colour.
- Responsive `srcset` images, lazy loading below the fold, cache headers.

Once live, add the site to **Google Search Console** and set up a **Google Business Profile** with the same name, phone and website. That's the biggest win for local search.

## To check with the client

- [ ] Final domain (see above).
- [ ] Owner's first name, if he wants it in the About section.
- [ ] Service descriptions and FAQ answers read right, especially areas covered and regular visits.
- [ ] Real customer reviews. There's a ready-made, commented-out **REVIEWS** section in `index.html`; paste genuine reviews in and uncomment it.
- [ ] Accreditation logos (City & Guilds, Lantra, The ALBAS). Currently shown as text with icons. Swap in the official logos only if he's allowed to use them.
- [ ] Facebook / Instagram links, if any, can go in the footer.
