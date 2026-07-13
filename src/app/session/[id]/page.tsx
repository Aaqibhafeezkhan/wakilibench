import { createClient } from "../../../../lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { Nav } from "../../../../components/nav";
import { Disclaimer } from "../../../../components/disclaimer";
import { SessionWorkspace } from "../../../../components/session-workspace";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: session } = await supabase
    .from("sessions")
    .select("id, status, topic_id, scenario_id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!session) {
    notFound();
  }

  const { data: scenario } = await supabase
    .from("scenarios")
    .select("id, title, fact_pattern, instructions, difficulty")
    .eq("id", session.scenario_id)
    .single();

  if (!scenario) {
    notFound();
  }

  const { data: topic } = await supabase
    .from("topics")
    .select("title, slug")
    .eq("id", session.topic_id)
    .single();

  const { data: messages } = await supabase
    .from("messages")
    .select("id, role, content, message_type, created_at")
    .eq("session_id", session.id)
    .order("created_at", { ascending: true });

  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <SessionWorkspace
          sessionId={session.id}
          sessionStatus={session.status}
          scenario={{
            title: scenario.title,
            factPattern: scenario.fact_pattern,
            instructions: scenario.instructions,
            difficulty: scenario.difficulty,
          }}
          topicTitle={topic?.title || "Unknown Topic"}
          existingMessages={messages || []}
        />
        <Disclaimer />
      </main>
    </div>
  );
}
