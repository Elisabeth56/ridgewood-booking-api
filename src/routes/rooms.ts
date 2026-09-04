import { Hono } from "hono";
import { db } from "../lib/db";

export const rooms = new Hono();

rooms.get("/", async (c) => {
  const { data, error } = await db.from("rooms").select("*").eq("active", true);
  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});
