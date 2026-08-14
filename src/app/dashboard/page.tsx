import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { Nav } from "../../../components/nav";
import { Disclaimer } from "../../../components/disclaimer";
import { checkUsage } from "../../../lib/usage";
import Link from "next/link";

function getNextMonday(): string {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  return nextMonday.toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Counsel";

  const usage = await checkUsage(supabase, user.id);
  const resetDate = getNextMonday();

  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <div className="mb-10">
          <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
            Moot Room
          </p>
          <h1 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df]">
            Welcome, {displayName}
          </h1>
          <p className="text-[var(--wb-chalk-soft)] mt-3">
            Choose a path to sharpen your legal reasoning.
          </p>
        </div>

        {/* Usage bar */}
        <div className="prompt-card mb-8 flex items-center justify-between">
          <div>
            <p className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
              Weekly Sessions
            </p>
            <p className="text-[#fff8df] font-bold mt-1">
              {usage.sessionsThisWeek} / {usage.limit} used
            </p>
            <p className="mono text-[10px] text-[var(--wb-chalk-soft)] mt-1">
              Resets {resetDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[var(--wb-yellow)] mono text-2xl font-bold">
              {usage.remaining}
            </p>
            <p className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
              remaining
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/topics" className="prompt-card hover:border-[var(--wb-yellow)] transition group min-h-[200px] relative">
            <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-5 right-5">
              Practice
            </p>
            <h2 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-14 mb-3 group-hover:text-[var(--wb-yellow)] transition">
              Topics
            </h2>
            <p className="text-sm text-[var(--wb-chalk-soft)]">
              Choose a legal area. Contract law, constitutional law, or legal
              writing and AI safety.
            </p>
          </Link>

          <Link href="/session" className="prompt-card hover:border-[var(--wb-yellow)] transition group min-h-[200px] relative">
            <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-5 right-5">
              Train
            </p>
            <h2 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-14 mb-3 group-hover:text-[var(--wb-yellow)] transition">
              Tutor Session
            </h2>
            <p className="text-sm text-[var(--wb-chalk-soft)]">
              Face a scenario. Write your answer. Receive Socratic challenge and
              rubric scoring.
            </p>
          </Link>

          <Link href="/history" className="prompt-card hover:border-[var(--wb-yellow)] transition group min-h-[200px] relative">
            <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-5 right-5">
              Review
            </p>
            <h2 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-14 mb-3 group-hover:text-[var(--wb-yellow)] transition">
              History
            </h2>
            <p className="text-sm text-[var(--wb-chalk-soft)]">
              Review past sessions. Track your scores. See how your reasoning
              evolves.
            </p>
          </Link>
        </div>

        <Disclaimer />
      </main>
    </div>
  );
}
