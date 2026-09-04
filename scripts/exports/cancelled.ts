// Exports cancelled bookings for the accountant's audit trail.
//
// Depends on bookings being soft-deleted — a cancelled booking keeps its row
// with cancelled_at set. If anyone ever changes /bookings/:id to a hard
// DELETE, this export silently returns nothing and the audit breaks.
//
// Usage: bun run scripts/exports/cancelled.ts 2026-01-01 2026-12-31
import { db } from "../../src/lib/db";

const [from, to] = process.argv.slice(2);
if (!from || !to) {
  console.error("usage: cancelled.ts <from-date> <to-date>");
  process.exit(1);
}

const { data, error } = await db
  .from("bookings")
  .select("id, guest_name, guest_email, check_in, check_out, cancelled_at")
  .not("cancelled_at", "is", null)
  .gte("cancelled_at", from)
  .lte("cancelled_at", to)
  .order("cancelled_at", { ascending: true });

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(["id", "guest_name", "guest_email", "check_in", "check_out", "cancelled_at"].join(","));
for (const r of data ?? []) {
  console.log(
    [r.id, r.guest_name, r.guest_email, r.check_in, r.check_out, r.cancelled_at].join(","),
  );
}
