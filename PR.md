# Abandoned PR — copy-paste playbook

## Setup

On the demo repo, create branch `sentry-source-maps` with the diff below,
open a PR against `main`, add the review comments, then leave it.

The PR should NOT be merged. Baton's `github_inventory` treats an open PR with
no activity in 20d, or one labeled `abandoned`, as an abandoned PR.

Add label: `abandoned` (create the label).

---

## Branch diff — `sentry-source-maps`

**New file:** `scripts/upload-sourcemaps.ts`
```ts
// Uploads source maps to Sentry after each production build.
// Runs as a `postbuild` hook — see package.json.
import { execSync } from "node:child_process";

const token = process.env.SENTRY_AUTH_TOKEN;
const release = process.env.VERCEL_GIT_COMMIT_SHA;

if (!token) {
  console.warn("SENTRY_AUTH_TOKEN not set, skipping source map upload");
  process.exit(0);
}

execSync(
  `bunx @sentry/cli releases files ${release} upload-sourcemaps ./dist`,
  { stdio: "inherit", env: { ...process.env, SENTRY_AUTH_TOKEN: token } },
);
```

**Modified:** `package.json` — add:
```json
"postbuild": "bun run scripts/upload-sourcemaps.ts"
```
under `scripts`.

---

## PR title
Upload Sentry source maps at build time

## PR description
Adds a `postbuild` hook that uploads source maps to Sentry so unminified stack
traces show up in the issues view.

Uses `SENTRY_AUTH_TOKEN` — will need to add that to Vercel env before this
merges. Client's Sentry org is `ridgewood-retreats`.

Draft for now — want to make sure this doesn't slow the build meaningfully first.

## Review comments to post (on the diff)

**Comment 1** — on `scripts/upload-sourcemaps.ts` line referencing `SENTRY_AUTH_TOKEN`:

> This token isn't in `.env.example` — where's it supposed to come from? We should
> at least document that it lives in Vercel prod env, or people copying the repo
> will hit a silent skip.

**Comment 2** — on the `postbuild` line in `package.json`:

> Any reason not to run this in a GitHub Action instead? Feels wrong to have the
> build machine talk to Sentry directly, especially since we're moving to Vercel
> Deploy Hooks anyway.

Both comments unresolved. Don't reply.

Leave the PR open. That's the abandoned state.
