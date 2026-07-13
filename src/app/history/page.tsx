import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { Nav } from "../../../components/nav";
import { Disclaimer } from "../../../components/disclaimer";
import Link from "next/link";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Load sessions with scenario titles via join
  const { data: sessions } = await supabase
    .from("sessions")
    .select(`
      id, status, final_score, created_at, topic_id, scenario_id,
      scenarios(title)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: topics } = await supabase.from("topics").select("id, title");
  const topicMap = new Map(topics?.map((t) => [t.id, t.title]) || []);

  // Calculate basic stats
  const completedSessions = sessions?.filter((s) => s.final_score !== null) || [];
  const avgScore = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((sum, s) => sum + (s.final_score || 0), 0) / completedSessions.length)
    : null;
  const bestScore = completedSessions.length > 0
    ? Math.max(...completedSessions.map((s) => s.final_score || 0))
    : null;

  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
          Progress
        </p>
        <h1 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df] mb-2">
          Session History
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">
          Your past training sessions and scores.
        </p>

        {/* Stats summary */}
        {completedSessions.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="prompt-card text-center">
              <p className="text-[var(--wb-yellow)] mono text-2xl font-bold">
                {completedSessions.length}
              </p>
              <p className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest mt-1">
                Completed
              </p>
            </div>
            <div className="prompt-card text-center">
              <p className="text-[var(--wb-yellow)] mono text-2xl font-bold">
                {avgScore}%
              </p>
              <p className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest mt-1">
                Average
              </p>
            </div>
            <div className="prompt-card text-center">
              <p className="text-[var(--wb-yellow)] mono text-2xl font-bold">
                {bestScore}%
              </p>
              <p className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest mt-1">
                Best
              </p>
            </div>
          </div>
        )}

        {/* Session list */}
        {sessions && sessions.length > 0 ? (
          <div className="border border-[var(--wb-line)] bg-[var(--wb-green)]">
            {sessions.map((session, i) => {
              const scenarios = session.scenarios as unknown as { title: string }[] | { title: string } | null;
              const scenarioTitle = Array.isArray(scenarios)
                ? scenarios[0]?.title || "Untitled"
                : scenarios?.title || "Untitled";

              return (
                <Link
                  key={session.id}
                  href={`/session/${session.id}`}
                  className={`grid grid-cols-[1fr_100px] items-center hover:bg-[rgba(255,255,255,0.03)] transition ${
                    i < sessions.length - 1 ? "border-b border-[var(--wb-line)]" : ""
                  }`}
                >
                  <div className="p-5">
                    <p className="text-[#fff8df] font-bold text-sm">
                      {topicMap.get(session.topic_id) || "Unknown Topic"}
                    </p>
                    <p className="text-[var(--wb-chalk-soft)] text-xs mt-0.5">
                      {scenarioTitle}
                    </p>
                    <p className="mono text-[10px] text-[var(--wb-chalk-soft)] mt-1">
                      {new Date(session.created_at).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-5 text-right border-l border-[var(--wb-line)]">
                    {session.final_score !== null ? (
                      <p className="text-[var(--wb-yellow)] font-bold mono text-lg">
                        {session.final_score}%
                      </p>
                    ) : (
                      <span className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
                        {session.status}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="prompt-card text-center py-12">
            <p className="text-[var(--wb-chalk-soft)] mb-2">
              No sessions yet
            </p>
            <p className="text-sm text-[var(--wb-chalk-soft)] mb-6">
              Complete a tutor session to see your history here.
            </p>
            <Link href="/topics" className="wb-btn text-[11px]">
              Start Practicing
            </Link>
          </div>
        )}

        <Disclaimer />
      </main>
    </div>
  );
}
