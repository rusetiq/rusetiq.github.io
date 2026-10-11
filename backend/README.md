# portfolio guestbook

The public guestbook runs separately from GitHub Pages at:

https://rusetiq-guestbook.aarush-uae.workers.dev/entries

A dedicated Cloudflare Worker stores normalized handwriting strokes and short notes in D1. There are no browser credentials. The portfolio shows the latest six signatures, then loads more on request.

Visitors can remove their own signature using a random receipt stored in their browser. Only its hash is stored server-side. Public input is bounded, rendered as text and SVG coordinates, and limited to six entries per day and one entry per minute for each salted network identifier. `RATE_SECRET` is a Worker secret; do not put it in source files.

## local development

```sh
npx wrangler d1 execute rusetiq-guestbook --config backend/wrangler.jsonc --local --file backend/schema.sql
npx wrangler dev --config backend/wrangler.jsonc --port 8787 --ip 127.0.0.1
```

Serve `dist/` on localhost port 4173 in another terminal. The portfolio uses the local API when opened on localhost. Local and production databases are separate.

## checks and publishing

```sh
node --test backend/worker.test.mjs
npx wrangler deploy --config backend/wrangler.jsonc
```

The static portfolio is published independently to GitHub Pages and Sites. Run `node scripts/sync-static.mjs` after changing HTML, CSS or JavaScript. It creates content-versioned assets and synchronizes the Pages root.

For moderation, inspect records with `npx wrangler d1 execute rusetiq-guestbook --config backend/wrangler.jsonc --remote --command "SELECT id,name,message FROM signatures ORDER BY created_at DESC LIMIT 20"`, then remove only an identified record when needed. There is no public administrator route.
