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
