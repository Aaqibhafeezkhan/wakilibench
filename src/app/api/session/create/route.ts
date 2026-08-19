import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { checkRateLimit, RATE_LIMITS } from "../../../../../lib/rate-limit";
import { checkUsage } from "../../../../../lib/usage";

/**
 * POST /api/session/create
 * Server-side session creation with quota enforcement.
 * The client can no longer bypass the weekly limit.
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit
  const rateCheck = checkRateLimit(`create:${user.id}`, RATE_LIMITS.generate);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rateCheck.resetIn}s.` },
      { status: 429 }
    );
  }

  // Server-side quota enforcement
  const usage = await checkUsage(supabase, user.id);
  if (!usage.canStart) {
    return NextResponse.json(
      { error: "Weekly session limit reached. Resets next Monday.", remaining: 0 },
      { status: 403 }
    );
  }

  // Parse body
  const body = await request.json();
  const { topicId, scenarioId } = body;

  if (!topicId || !scenarioId) {
    return NextResponse.json({ error: "topicId and scenarioId required" }, { status: 400 });
  }

  // Create session
  const { data: session, error } = await supabase
    .from("sessions")
    .insert({
      user_id: user.id,
      topic_id: topicId,
      scenario_id: scenarioId,
      status: "active",
    })
    .select("id")
    .single();

  if (error || !session) {
    return NextResponse.json({ error: "Could not create session" }, { status: 500 });
  }

  // Log event
  await supabase.from("usage_events").insert({
    user_id: user.id,
    event_type: "session_started",
    metadata_json: { topic_id: topicId, scenario_id: scenarioId },
  });

  return NextResponse.json({ sessionId: session.id, remaining: usage.remaining - 1 });
}
