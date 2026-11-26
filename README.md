# Ray Realty — website (rayreal)

React 18 + Vite + Tailwind front end for **rayrealtysl.com**: public property site, `/login` and `/admin`.
It talks to the **rayreal-backend** REST API (separate repo) and uses Firebase only for admin
sign-in (Auth) and photo uploads (Storage).

## Run locally

```bash
npm install
cp .env.example .env      # fill in values, or leave VITE_API_BASE_URL empty for demo mode
npm run dev               # http://localhost:5173
```

**Demo mode:** with `VITE_API_BASE_URL` empty the site runs on bundled sample data (the 91 migrated
listings) and `/login` opens the admin panel without a password. Changes stay in your browser only.
Never deploy demo mode to production.

## Build & deploy

```bash
npm run build             # outputs dist/
```

Deploy `dist/` to any static host. SPA rewrites are included for Vercel (`vercel.json`) and
Netlify/Render static sites (`public/_redirects`). On **Render**: *New → Static Site*, build command
`npm install && npm run build`, publish directory `dist`, add a rewrite `/* → /index.html`, and set
the `VITE_*` environment variables.

## Environment variables

See `.env.example`. All `VITE_*` values end up in the browser bundle — never put secrets here.
The Firebase web config is designed to be public; access is enforced by Firebase security rules and
by the API checking the admin's ID token.

## How it fits together

| Concern | Where |
|---|---|
| Listings data | `rayreal-backend` → Firestore (`GET /api/properties`) |
| Admin auth | Firebase Auth (email/password) + `admin` custom claim, verified by the API |
| Photos | Browser resizes to ≤2000px WebP → uploads directly to Firebase Storage `properties/{refId}/…` → URL saved on the listing |
| WhatsApp leads | `wa.me` links pre-filled with title, location, price, Ref ID and URL |

API contract: see the comment at the top of `src/lib/api.js`.

## Project structure

```
src/
  pages/            HomePage, ListingsPage, PropertyPage, About, Contact, Login, admin/*
  components/       Header, Footer, PropertyCard, FilterBar, MapEmbed, ContactBlock, admin/ImageUploader
  lib/              api.js (REST + demo store), format.js (LKR/perches), whatsapp.js, upload.js, firebase.js
  hooks/            useProperties (fetch, cache, client-side filtering)
  data/             sample-properties.json (demo mode only, loaded lazily)
```

## Design

Calm, airy layout modelled on the *Dubai Prime Properties* reference (Inter Tight, light headlines,
pill buttons, soft 32px cards), recoloured to the Ray Realty logo: navy `#0A1250`, powder `#C9D5F7`,
ice `#F2F5FD`, with the logo red `#C4000F` used only as a small accent. Tokens live in `tailwind.config.js`.

## SEO

- **Per-page tags** (`src/components/Seo.jsx`): title, description, canonical URL, Open Graph / Twitter cards,
  and JSON-LD structured data — `RealEstateAgent` (every page, in `index.html`), `WebSite` + site search (home),
  `ItemList` + breadcrumbs (listings), `RealEstateListing` with price, extent and location + breadcrumbs (property),
  `AboutPage`, `ContactPage`.
- **Link previews** (`middleware.js`, Vercel Routing Middleware): WhatsApp/Facebook don't run JavaScript, so for
  `/property/...` the server writes that listing's title, price, description and a 1200×630 crop of the cover
  photo into the page head. Uses `API_BASE_URL` or `VITE_API_BASE_URL`; falls back to the normal page if the API is slow.
- **Sitemap**: `/sitemap.xml` is proxied to the API (`vercel.json`), which lists every page and property.
  `robots.txt` points to it and blocks `/admin` and `/login`. Submit `https://www.rayrealtysl.com/sitemap.xml`
  in Google Search Console once the domain is live.
- **Share image** `public/og-image.jpg`, app icons and `manifest.webmanifest` for "Add to home screen".
- Clean listing URLs with a canonical that keeps only type / district / land use filters.
