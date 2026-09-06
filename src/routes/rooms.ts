import { Hono } from "hono";
import { db } from "../lib/db";
import { cacheGet, cacheSet } from "../lib/cache";
import { nightlyRate, type RoomType } from "../pricing/seasons";

export const rooms = new Hono();

rooms.get("/", async (c) => {
  const cached = cacheGet<unknown[]>("rooms:active");
  if (cached) return c.json(cached);

  const { data, error } = await db.from("rooms").select("*").eq("active", true);
  if (error) return c.json({ error: error.message }, 500);

  cacheSet("rooms:active", data);
  return c.json(data);
});

rooms.get("/:id/rate", async (c) => {
  const when = new Date(c.req.query("date") ?? Date.now());
  const { data, error } = await db
    .from("rooms")
    .select("base_rate_ngn, room_type")
    .eq("id", c.req.param("id"))
    .single();
  if (error) return c.json({ error: error.message }, 404);
  return c.json({
    rate_ngn: nightlyRate(data.base_rate_ngn, data.room_type as RoomType, when),
  });
});
