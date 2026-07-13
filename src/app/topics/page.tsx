import { createClient } from "../../../lib/supabase/server";
import { Nav } from "../../../components/nav";
import { Disclaimer } from "../../../components/disclaimer";
import Link from "next/link";

export default async function TopicsPage() {
  const supabase = await createClient();

  const { data: topics, error } = await supabase
    .from("topics")
    .select("id, slug, title, description")
    .eq("is_active", true)
    .order("created_at");

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--wb-green-3)]">
        <Nav />
        <main className="max-w-5xl mx-auto p-8">
          <div className="prompt-card text-center py-12">
            <p className="text-[var(--wb-red)]">
              Could not load topics. Please try again.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
          Legal Areas
        </p>
        <h1 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df] mb-2">
          Topics
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">
          Select a legal area to begin your training session.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics?.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.slug}`}
              className="prompt-card hover:border-[var(--wb-yellow)] transition group min-h-[200px]"
            >
              <h2 className="serif text-[26px] leading-[0.95] text-[#fff8df] group-hover:text-[var(--wb-yellow)] transition mb-3">
                {topic.title}
              </h2>
              <p className="text-sm text-[var(--wb-chalk-soft)]">
                {topic.description}
              </p>
              <p className="mono text-[11px] text-[var(--wb-yellow)] mt-4 uppercase tracking-widest">
                View scenarios →
              </p>
            </Link>
          ))}
        </div>

        {(!topics || topics.length === 0) && (
          <div className="prompt-card text-center py-12">
            <p className="text-[var(--wb-chalk-soft)]">
              No topics available yet. Check back soon.
            </p>
          </div>
        )}

        <Disclaimer />
      </main>
    </div>
  );
}
