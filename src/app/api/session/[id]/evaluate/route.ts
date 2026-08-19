import { NextResponse } from "next/server";
import { createClient } from "../../../../../../lib/supabase/server";
import { evaluateAnswer, type RubricScore } from "../../../../../../lib/ai";
import { checkRateLimit, RATE_LIMITS } from "../../../../../../lib/rate-limit";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: sessionId } = await params;
  const supabase = await createClient();

  // Verify user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit
  const rateCheck = checkRateLimit(`evaluate:${user.id}`, RATE_LIMITS.evaluate);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rateCheck.resetIn}s.` },
      { status: 429 }
    );
  }

  // Verify session belongs to user
  const { data: session } = await supabase
    .from("sessions")
    .select("id, scenario_id, status")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  if (session.status !== "active") {
    return NextResponse.json(
      { error: "Session has already been evaluated" },
      { status: 400 }
    );
  }

  // Load scenario with expected issues
  const { data: scenario } = await supabase
    .from("scenarios")
    .select("title, fact_pattern, instructions, expected_issues")
    .eq("id", session.scenario_id)
    .single();

  if (!scenario) {
    return NextResponse.json(
      { error: "Scenario not found" },
      { status: 404 }
    );
  }

  // Load user messages
  const { data: messages } = await supabase
    .from("messages")
    .select("role, content, message_type")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  const userAnswers =
    messages
      ?.filter((m) => m.role === "user")
      .map((m) => m.content) || [];

  if (userAnswers.length === 0) {
    return NextResponse.json(
      { error: "Submit an answer before requesting evaluation" },
      { status: 400 }
    );
  }

  // Call AI evaluator
  let score: RubricScore;
  try {
    score = await evaluateAnswer({
      scenario: {
        title: scenario.title,
        factPattern: scenario.fact_pattern,
        instructions: scenario.instructions,
        expectedIssues: scenario.expected_issues,
      },
      userAnswers,
    });
  } catch (err) {
    console.error("Evaluator AI error:", err);
    return NextResponse.json(
      { error: "AI evaluator is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }

  // Save rubric score
  const { error: scoreError } = await supabase.from("rubric_scores").insert({
    session_id: sessionId,
    issue_spotting: score.issue_spotting,
    legal_reasoning: score.legal_reasoning,
    use_of_authority: score.use_of_authority,
    counterarguments: score.counterarguments,
    writing_clarity: score.writing_clarity,
    ethics_ai_safety: score.ethics_ai_safety,
    overall_score: score.overall_score,
    strengths: score.strengths,
    weaknesses: score.weaknesses,
    next_action: score.next_action,
  });

  if (scoreError) {
    console.error("Score save error:", scoreError);
  }

  // Format evaluation message
  const evaluationContent = `**Score: ${score.overall_score}/100**

**Issue Spotting:** ${score.issue_spotting}/20
**Legal Reasoning:** ${score.legal_reasoning}/25
**Use of Authority:** ${score.use_of_authority}/20
**Counterarguments:** ${score.counterarguments}/15
**Writing Clarity:** ${score.writing_clarity}/10
**Ethics & AI Safety:** ${score.ethics_ai_safety}/10

**Strengths:**
${score.strengths.map((s) => `• ${s}`).join("\n")}

**Weaknesses:**
${score.weaknesses.map((w) => `• ${w}`).join("\n")}

**Next Action:** ${score.next_action}

---
*${score.disclaimer}*`;

  // Save evaluation message
  const { data: newMessage, error: msgError } = await supabase
    .from("messages")
    .insert({
      session_id: sessionId,
      role: "evaluator",
      content: evaluationContent,
      message_type: "evaluation",
    })
    .select("id, role, content, message_type, created_at")
    .single();

  if (msgError) {
    return NextResponse.json(
      { error: "Could not save evaluation" },
      { status: 500 }
    );
  }

  // Mark session as evaluated
  await supabase
    .from("sessions")
    .update({ status: "evaluated", final_score: score.overall_score })
    .eq("id", sessionId);

  return NextResponse.json({ message: newMessage, score });
}
