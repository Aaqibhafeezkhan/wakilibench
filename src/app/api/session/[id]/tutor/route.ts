import { NextResponse } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { generateTutorResponse } from "../../../../../../lib/ai";
import { checkRateLimit, RATE_LIMITS } from "../../../../../../lib/rate-limit";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit
  const rateCheck = checkRateLimit(`tutor:${user.id}`, RATE_LIMITS.tutor);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rateCheck.resetIn}s.` },
      { status: 429 }
    );
  }

  // Verify session belongs to user
  const { data: session } = await supabase
    .from("sessions")
    .select("id, scenario_id, topic_id, status")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.status !== "active") {
    return NextResponse.json(
      { error: "Session is no longer active" },
      { status: 400 }
    );
  }

  // Load scenario
  const { data: scenario } = await supabase
    .from("scenarios")
    .select("title, fact_pattern, instructions")
    .eq("id", session.scenario_id)
    .single();

  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
  }

  // Load conversation history
  const { data: messages } = await supabase
    .from("messages")
    .select("role, content, message_type")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (!messages || messages.length === 0) {
    return NextResponse.json(
      { error: "Submit an answer before requesting tutor feedback" },
      { status: 400 }
    );
  }

  // Call AI
  let tutorContent: string;
  try {
    tutorContent = await generateTutorResponse({
      scenario: {
        title: scenario.title,
        factPattern: scenario.fact_pattern,
        instructions: scenario.instructions,
      },
      conversationHistory: messages,
    });
  } catch (err) {
    console.error("Tutor AI error:", err);
    return NextResponse.json(
      { error: "AI tutor is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }

  // Save tutor message
  const { data: newMessage, error } = await supabase
    .from("messages")
    .insert({
      session_id: sessionId,
      role: "tutor",
      content: tutorContent,
      message_type: "socratic_question",
    })
    .select("id, role, content, message_type, created_at")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Could not save tutor response" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: newMessage });
}
