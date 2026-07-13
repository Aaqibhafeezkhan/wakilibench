import { Nav } from "../../../components/nav";
import { Disclaimer } from "../../../components/disclaimer";
import Link from "next/link";

export default function SessionPage() {
  return (
    <div className="min-h-screen bg-[var(--wb-green-3)]">
      <Nav />
      <main className="max-w-5xl mx-auto p-8">
        <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
          Training
        </p>
        <h1 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df] mb-2">
          Tutor Session
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">
          Choose a topic and scenario to begin.
        </p>

        <div className="prompt-card text-center py-12">
          <p className="text-[var(--wb-chalk-soft)] mb-6">
            Select a topic to start a new practice session.
          </p>
          <Link href="/topics" className="wb-btn text-[11px]">
            Browse Topics
          </Link>
        </div>

        <Disclaimer />
      </main>
    </div>
  );
}
