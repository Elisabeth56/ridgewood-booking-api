import * as Sentry from "@sentry/bun";

// SENTRY_AUTH_TOKEN is set in Vercel prod env and read at build time to
// upload source maps. Locally we skip source map upload.
export function initSentry() {
  const dsn = process.env.SENTRY_DSN;
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    release: process.env.VERCEL_GIT_COMMIT_SHA,
    // authToken is only used by the build-time uploader; kept here for reference
    _internal: { authToken },
  });
}
