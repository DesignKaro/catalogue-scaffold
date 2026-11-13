# Deploying to Hostinger shared hosting

This site is exported as static HTML, CSS, and JavaScript so it can run on regular shared hosting without Node.js.

## Upload the ready-made package

1. Open Hostinger hPanel → **Files → File Manager** for the domain.
2. Open `public_html` (or the document root assigned to the domain).
3. Upload `hostinger-shared-hosting.zip` and extract it there. The archive contains the site files directly, including `index.html` and the route folders; do not upload an `out` folder inside `public_html`.

## Rebuild the package after site changes

Run `npm run build` in the project. Next.js generates the static site in `out/`. Package the contents of `out/` with this command from the project root:

```sh
cd out && zip -r ../hostinger-shared-hosting.zip .
```

Upload and extract the new ZIP into `public_html`, replacing the previous files. Because this is static hosting, server-only Next.js features are not available; the current site uses statically generated pages and client-side interactions.
