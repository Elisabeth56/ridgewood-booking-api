# Ridgewood Retreats — Booking API

Small booking API for Ridgewood Retreats, a short-let operator. Bun + Hono, deployed as
a Vercel serverless function. Supabase Postgres for storage. Sentry for errors.

## Setup

```bash
bun install
cp .env.example .env    # fill in the Supabase values
bun run dev             # http://localhost:3000
```

## Env

See `.env.example`. In production the same values live in Vercel env.

## Endpoints

- `GET /` — Responsive brand landing page with features, amenities, and API usage docs
- `GET /rooms` — List active rooms
- `GET /rooms/:id/rate` — Calculate room rate for a specific date
- `POST /bookings` — Create a new booking
- `DELETE /bookings/:id` — Soft-delete/cancel a booking
- `GET /health` — Service health check

## Deploy

Push to `main` triggers a Vercel deploy. Preview deploys on every PR.
