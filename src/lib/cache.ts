// Local dev read cache. Hot reload was doing 8+ Supabase round trips per
// request and it made iteration painful, so reads go through a bun:sqlite
// table first. Prod bypasses this entirely and hits Postgres directly.
//
// This does not scale past one process. Swap for Redis when there's real
// traffic.
import { Database } from "bun:sqlite";

const enabled = process.env.NODE_ENV !== "production";
const db = enabled ? new Database(":memory:") : null;

if (db) {
  db.run("create table if not exists cache (k text primary key, v text, exp integer)");
}

export function cacheGet<T>(key: string): T | null {
  if (!db) return null;
  const row = db.query("select v, exp from cache where k = ?").get(key) as
    | { v: string; exp: number }
    | undefined;
  if (!row || row.exp < Date.now()) return null;
  return JSON.parse(row.v) as T;
}

export function cacheSet(key: string, value: unknown, ttlMs = 30_000): void {
  if (!db) return;
  db.run("insert or replace into cache (k, v, exp) values (?, ?, ?)", [
    key,
    JSON.stringify(value),
    Date.now() + ttlMs,
  ]);
}
