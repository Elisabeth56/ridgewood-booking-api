# Issues to open on the demo repo

Open each of these on GitHub. Where "labels" are listed, add them (create the label first
if it doesn't exist). Where "comments" are listed, post each comment on the issue after
opening it — from your own account is fine, we mark the client-quoted one via prefix.

Baton's `github_inventory` tool treats:
- `stale` label OR no comment activity in 30d → stale
- a comment containing `client:` prefix → client question surface

---

## Issue 1 — Booking confirmation email lands in spam sometimes
**Labels:** `bug`, `stale`
**Body:**

Guests occasionally report the booking confirmation ending up in Gmail spam. Seems
tied to the SPF record on `ridgewoodretreats.ng` — we set it up in a rush when we
migrated off Mailgun. Need to add a proper DMARC record and re-check SPF alignment.

Repro is intermittent. Two guests reported it in June, none since (that we know of).

**Comments:** none.

---

## Issue 2 — Deploy step `bun install --frozen-lockfile` fails intermittently on Vercel
**Labels:** `bug`, `deploy`, `stale`
**Body:**

Every 4-5th deploy the Vercel build fails on `bun install --frozen-lockfile` with a
network error pulling `@sentry/bun`. Retrying the deploy usually works. Not sure if
it's a Vercel proxy issue or something we can pin around.

Would like to at least catch this in CI so we know before it hits prod.

**Comments:** none.

---

## Issue 3 — Add second-language toggle (Yoruba) to room descriptions
**Labels:** `feature`, `i18n`, `needs-client-input`
**Body:**

Client wants room titles and descriptions available in Yoruba alongside English.
Simple toggle in the header, persist choice in localStorage.

Open question is where to store the translations — inline in the CMS record vs.
a separate `translations` table keyed on `room_id, locale`.

**Comments:**

> **Comment 1 (from you):**
> Reached out to client for direction on scope.
>
> **Comment 2 (from you, dated ~3 weeks after opening):**
> client: "For the launch just do the room names and one-line descriptions.
> Full page translations we can do next quarter — but please make sure the
> booking form itself stays English-only for now so the confirmations don't
> break." — sent by Tunde on WhatsApp, July 22.
>
> Still need to decide the storage shape before I start.

---

## Issue 4 — Add rate limiting to /bookings before public launch
**Labels:** `security`, `launch-blocker`
**Body:**

Right now `/bookings` POST has no rate limit. Before we announce publicly we need
per-IP throttling — probably 10 req/min is fine for a booking API.

Options:
- Hono middleware with a Redis-backed limiter (Upstash free tier)
- Vercel Edge Config for the counter
- Postgres row with a trigger (heaviest option)

Prefer Upstash. Adds one dependency and one env var.

**Comments:** none.

---

## Issue 5 — Move Supabase project to Pro tier before free-tier egress cap
**Labels:** `infra`
**Body:**

Free tier gives us 5GB egress/month. We're at ~3.2GB and growing as bookings
ramp. Should upgrade to Pro ($25/mo) before we get throttled — client already
approved the cost in the June invoice review.

Involves:
- Upgrade in Supabase dashboard
- Confirm nothing changes for connection strings
- Enable daily backups (Pro feature) and document the restore path

**Comments:** none.

---

## Issue 6 — Loading spinner renders twice on /rooms after Bun 1.1 upgrade
**Labels:** `bug`, `frontend`
**Body:**

Since bumping Bun from 1.0.x to 1.1.36 the loading spinner on `/rooms` appears
twice for ~200ms during hydration. Suspect a React strict-mode + `useEffect`
interaction, or something with how Bun bundles the client entry.

Low priority — cosmetic — but looks unprofessional to guests.

**Comments:** none.

---

## Issue 7 — Update cancellation policy copy on booking page + confirmation email
**Labels:** `content`
**Body:**

Client sent a new cancellation policy draft in early August (48h free cancellation
→ 72h). Need to update:
- `/bookings/new` page footer
- Confirmation email template
- Terms & Conditions page

I have the draft in email but haven't ported it in yet.

**Comments:** none.

