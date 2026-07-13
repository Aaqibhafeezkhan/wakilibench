import { SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

interface UsageStatus {
  sessionsThisWeek: number;
  limit: number;
  remaining: number;
  canStart: boolean;
}

/**
 * Check how many sessions a user has started this week
 * and whether they can start another one.
 */
export async function checkUsage(
  supabase: SupabaseClient,
  userId: string
): Promise<UsageStatus> {
  const limit = config.app.freeSessionsPerWeek;

  // Get start of current week (Monday)
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 0
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - diff);
  weekStart.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("sessions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", weekStart.toISOString());

  const sessionsThisWeek = count || 0;
  const remaining = Math.max(0, limit - sessionsThisWeek);

  return {
    sessionsThisWeek,
    limit,
    remaining,
    canStart: remaining > 0,
  };
}

/**
 * Log a usage event for tracking.
 */
export async function logUsageEvent(
  supabase: SupabaseClient,
  userId: string,
  eventType: string,
  metadata?: Record<string, unknown>
) {
  await supabase.from("usage_events").insert({
    user_id: userId,
    event_type: eventType,
    metadata_json: metadata || {},
  });
}
