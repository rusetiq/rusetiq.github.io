# portfolio backend

The public guestbook runs separately from GitHub Pages at:

https://rusetiq-guestbook.aarush-uae.workers.dev/entries

A dedicated Cloudflare Worker stores normalized handwriting strokes and short notes in D1. There are no browser credentials. The portfolio shows the latest six signatures, then loads more on request.

Visitors can remove their own signature using a random receipt stored in their browser. Only its hash is stored server-side. Public input is bounded, rendered as text and SVG coordinates, and limited to six entries per day and one entry per minute for each salted network identifier. `RATE_SECRET` is a Worker secret; do not put it in source files.

## github activity

`GET /contributions` reads the public GitHub calendar for `rusetiq`, pairs each day with its exact tooltip count, and caches it at the edge for an hour. The total is the sum of the displayed days. It needs no GitHub credentials. If GitHub is unavailable or changes its markup, the frontend shows a retry and a profile link instead of fabricated activity.

The calendar supports touch inspection and keyboard navigation: arrow keys move between days or weeks, and home/end move to the first/latest day.

## local development

```sh
npx wrangler d1 execute rusetiq-guestbook --config backend/wrangler.jsonc --local --file backend/schema.sql
npx wrangler dev --config backend/wrangler.jsonc --port 8787 --ip 127.0.0.1
```

Serve `dist/` on localhost port 4173 in another terminal. The portfolio uses the local API when opened on localhost. Local and production databases are separate.

## checks and publishing

```sh
node --test backend/*.test.mjs
npx wrangler deploy --config backend/wrangler.jsonc
```

The static portfolio is published independently to GitHub Pages and Sites. Run `node scripts/sync-static.mjs` after changing HTML, CSS or JavaScript. It creates content-versioned assets and synchronizes the Pages root.

For moderation, inspect records with `npx wrangler d1 execute rusetiq-guestbook --config backend/wrangler.jsonc --remote --command "SELECT id,name,message FROM signatures ORDER BY created_at DESC LIMIT 20"`, then remove only an identified record when needed. There is no public administrator route.

## portfolio additions

`GET /repos` returns all public repositories (paginated upstream). `GET /readme` returns the rendered profile README, which the client sanitizes with a tag and URL allowlist. Verified public snapshots in `dist/data/` are available if GitHub is temporarily unavailable. `GET /github-day?date=YYYY-MM-DD` reads the public activity timeline for that exact day, including older dates. Private contribution details are never requested or inferred. These routes cache public data for one hour.

Pixel art uses the existing guestbook table and deletion receipts. A drawing can contain either bounded signature strokes, a typed signature, or an 8/16/24/32-square grid with up to 24 hex colors and one palette index per cell. No schema migration is needed. The client supports brush, eraser, flood fill, undo, redo, keyboard painting, and a voxel preview. Signature and pixel cards open in a replay dialog.

The share-card source is `scripts/share-card.html`. Serve the project root to render it at 1200×630; the published bitmap is `dist/assets/orbit-card.png`. It uses the same procedural planet art as the homepage.
