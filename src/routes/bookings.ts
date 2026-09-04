import { Hono } from "hono";
import { z } from "zod";
import { db } from "../lib/db";

export const bookings = new Hono();

const CreateBooking = z.object({
  room_id: z.string().uuid(),
  guest_name: z.string().min(1),
  guest_email: z.string().email(),
  check_in: z.string(),
  check_out: z.string(),
});

bookings.post("/", async (c) => {
  const body = CreateBooking.parse(await c.req.json());
  const { data, error } = await db.from("bookings").insert(body).select().single();
  if (error) return c.json({ error: error.message }, 400);
  return c.json(data, 201);
});

// Soft delete: the accountant needs the row kept around, we just flip a flag.
bookings.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const { error } = await db
    .from("bookings")
    .update({ cancelled_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return c.json({ error: error.message }, 400);
  return c.body(null, 204);
});
