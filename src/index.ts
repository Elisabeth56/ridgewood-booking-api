import { Hono } from "hono";
import { bookings } from "./routes/bookings";
import { rooms } from "./routes/rooms";
import { landing } from "./routes/landing";
import { initSentry } from "./lib/sentry";

initSentry();

const app = new Hono();
app.route("/", landing);
app.route("/bookings", bookings);
app.route("/rooms", rooms);

app.get("/health", (c) => c.json({ ok: true }));

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: app.fetch,
};
