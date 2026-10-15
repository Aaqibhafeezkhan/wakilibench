import { createClient } from "../../../../lib/supabase/server";
import { notFound } from "next/navigation";
import { Nav } from "../../../../components/nav";
import { Disclaimer } from "../../../../components/disclaimer";
import Link from "next/link";
import { StartPracticeButton } from "../../../../components/start-practice-button";
import { LegalLinkedText } from "../../../../components/legal-link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: topic } = await supabase
    .from("topics")
    .select("id, slug, title, description")
    .eq("slug", slug)
    .single();

  if (!topic) {
    notFound();
  }

  const { data: scenarios } = await supabase
    .from("scenarios")
    .select("id, title, difficulty, fact_pattern")
    .eq("topic_id", topic.id)
    .eq("is_active", true)
    .order("created_at");

  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <Link
          href="/topics"
          className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest hover:text-[var(--wb-yellow)] transition"
        >
          ← Topics
        </Link>

        <h1 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df] mt-4 mb-2">
          {topic.title}
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">{topic.description}</p>

        <div className="space-y-4">
          {scenarios?.map((scenario) => (
            <div key={scenario.id} className="prompt-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="serif text-[22px] text-[#fff8df] leading-tight">
                    {scenario.title}
                  </h2>
                  <p className="text-sm text-[var(--wb-chalk-soft)] mt-2 line-clamp-2">
                    <LegalLinkedText text={scenario.fact_pattern} />
                  </p>
                  <span className="inline-block mt-3 mono text-[10px] px-2 py-1 border border-[var(--wb-line)] text-[var(--wb-yellow)] uppercase tracking-widest">
                    {scenario.difficulty}
                  </span>
                </div>
                <StartPracticeButton
                  topicId={topic.id}
                  scenarioId={scenario.id}
                />
              </div>
            </div>
          ))}
        </div>

        {(!scenarios || scenarios.length === 0) && (
          <div className="prompt-card text-center py-12">
            <p className="text-[var(--wb-chalk-soft)]">
              No scenarios available for this topic yet.
            </p>
          </div>
        )}

        <Disclaimer />
      </main>
    </div>
  );
}
