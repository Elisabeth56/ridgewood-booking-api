// Seasonal price multipliers, keyed on (room_type, month).
//
// Hardcoded for now. Moving this to Supabase so Tunde can edit December
// without a deploy — see issue on the tracker.
//
// Behind ENABLE_SEASONAL_PRICING until the client signs off on the numbers.

export type RoomType = "studio" | "villa" | "suite";

type MonthMultipliers = Partial<Record<number, number>>;

const MULTIPLIERS: Record<RoomType, MonthMultipliers> = {
  studio: { 8: 1.3, 9: 1.3, 12: 1.6 },
  villa: { 8: 1.3, 9: 1.3, 12: 1.6 },
  suite: { 8: 1.3, 9: 1.3, 12: 1.6 },
};

const DEFAULT_MULTIPLIER = 1.0;

export function seasonalMultiplier(roomType: RoomType, date: Date): number {
  if (process.env.ENABLE_SEASONAL_PRICING !== "true") return DEFAULT_MULTIPLIER;
  const month = date.getUTCMonth() + 1;
  return MULTIPLIERS[roomType]?.[month] ?? DEFAULT_MULTIPLIER;
}

export function nightlyRate(baseRateNgn: number, roomType: RoomType, date: Date): number {
  return Math.round(baseRateNgn * seasonalMultiplier(roomType, date));
}
