import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Room bar (wood strip) */}
      <div className="wood-bar px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="mono text-[11px] uppercase text-[#ffe5bd]">
            Moot Room / Practical Legal Reasoning
          </span>
          <span className="mono text-[11px] uppercase text-[#ffe5bd]">
            WakiliBench by Njinway
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[var(--wb-green)] border-b border-[var(--wb-line)] px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)]">
              AI Legal Training Room
            </p>
            <p className="serif text-[32px] leading-none text-[#fff8df]">
              WakiliBench
            </p>
          </div>
          <Link href="/login" className="wb-btn text-[12px]">
            Enter the Room
          </Link>
        </div>
      </header>

      {/* Blackboard hero */}
      <section
        className="px-6 py-16 md:py-24 border-b-[18px] border-b-[var(--wb-wood)] relative"
        style={{
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0/40px 40px,
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px) 0 0/40px 40px,
            radial-gradient(circle at 80% 22%, color-mix(in srgb, var(--wb-yellow) 14%, transparent), transparent 22rem),
            var(--wb-green)
          `,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="mono text-[13px] uppercase text-[var(--wb-yellow)] tracking-widest mb-6">
            Lesson 001 · AI-Native Legal Practice
          </p>
          <h1 className="serif text-[clamp(48px,8vw,96px)] leading-[0.88] text-[#fff8df] mb-6 max-w-[850px]">
            Argue it before you automate it.
          </h1>
          <p className="serif text-[clamp(20px,2.3vw,28px)] leading-[1.3] text-[var(--wb-chalk-soft)] max-w-[740px] mb-8">
            WakiliBench turns legal learning into a moot-room practice loop:
            answer the problem, face questions, defend your authority, receive a
            score, and improve.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="wb-btn">
              Enter the Room
            </Link>
            {/* Request Access button — re-enable for institutional pilots
            <a
              href="mailto:hello@njinway.com?subject=WakiliBench%20Pilot%20Access"
              className="wb-btn secondary"
            >
              Request Access
            </a>
            */}
          </div>
          <p className="mono text-[13px] text-[var(--wb-yellow)] mt-8 max-w-[710px]">
            Board note: AI can draft quickly. WakiliBench trains the judgment
            that decides whether that draft is worth trusting.
          </p>
        </div>
      </section>

      {/* Today's Hypothetical */}
      <section className="px-6 py-16 bg-[var(--wb-green-3)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6">
          <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] border-t-2 border-t-[var(--wb-yellow)] pt-3">
            Today&apos;s Hypothetical
          </p>
          <div>
            <h2 className="serif text-[clamp(32px,5vw,52px)] leading-[0.9] text-[#fff8df] mb-6">
              A client wants to rely on an AI-generated contract clause. What
              must counsel verify before advising?
            </h2>
            <ul className="space-y-3 text-[var(--wb-chalk-soft)]">
              <li className="border-t border-[var(--wb-line)] pt-3">
                What is the legal issue?
              </li>
              <li className="border-t border-[var(--wb-line)] pt-3">
                Which authority applies?
              </li>
              <li className="border-t border-[var(--wb-line)] pt-3">
                What risk has AI missed?
              </li>
              <li className="border-t border-[var(--wb-line)] pt-3">
                How would opposing counsel challenge it?
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The Method */}
      <section className="px-6 py-16 bg-[#0e2a24]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 mb-10">
            <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] border-t-2 border-t-[var(--wb-yellow)] pt-3">
              The Method
            </p>
            <div>
              <h2 className="serif text-[clamp(32px,5vw,52px)] leading-[0.9] text-[#fff8df] mb-4">
                The product behaves less like an assistant and more like a
                lecturer who refuses lazy answers.
              </h2>
              <p className="text-[18px] text-[var(--wb-chalk-soft)] leading-[1.58]">
                It asks, challenges, scores, and sends the learner back to
                improve. The goal is not to make legal work look easy. The goal
                is to make legal practitioners sharper.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="prompt-card min-h-[260px] relative">
              <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-4 right-4">
                Cue 01
              </p>
              <h3 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-16 mb-3">
                Answer first
              </h3>
              <p className="text-[var(--wb-chalk-soft)] leading-[1.55]">
                The learner begins with their own reasoning so the platform can
                assess thinking, not just prompt quality.
              </p>
            </div>
            <div className="prompt-card min-h-[260px] relative">
              <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-4 right-4">
                Cue 02
              </p>
              <h3 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-16 mb-3">
                Defend authority
              </h3>
              <p className="text-[var(--wb-chalk-soft)] leading-[1.55]">
                The AI tutor asks whether the authority is binding, persuasive,
                current, distinguishable, or unsafe.
              </p>
            </div>
            <div className="prompt-card min-h-[260px] relative">
              <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] absolute top-4 right-4">
                Cue 03
              </p>
              <h3 className="serif text-[28px] leading-[0.95] text-[#fff8df] mt-16 mb-3">
                Improve visibly
              </h3>
              <p className="text-[var(--wb-chalk-soft)] leading-[1.55]">
                Every practice session leaves a record of strengths, weaknesses,
                and next actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Exchange */}
      <section className="px-6 py-16 bg-[var(--wb-green-3)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 mb-10">
            <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] border-t-2 border-t-[var(--wb-yellow)] pt-3">
              Sample Exchange
            </p>
            <h2 className="serif text-[clamp(32px,5vw,52px)] leading-[0.9] text-[#fff8df]">
              The Socratic layer is where the training becomes memorable.
            </h2>
          </div>

          <div className="border border-[var(--wb-line)] bg-[#09201a]">
            <div className="grid grid-cols-[170px_1fr] border-b border-[var(--wb-line)]">
              <span className="mono text-[12px] uppercase text-[var(--wb-yellow)] p-5 border-r border-[var(--wb-line)]">
                Learner
              </span>
              <p className="p-5 text-[var(--wb-chalk-soft)]">
                I think the clause is enforceable.
              </p>
            </div>
            <div className="grid grid-cols-[170px_1fr] border-b border-[var(--wb-line)]">
              <span className="mono text-[12px] uppercase text-[var(--wb-yellow)] p-5 border-r border-[var(--wb-line)]">
                Tutor
              </span>
              <p className="p-5 text-[var(--wb-chalk-soft)]">
                Why? Identify the legal test you are applying and the authority
                supporting it.
              </p>
            </div>
            <div className="grid grid-cols-[170px_1fr] border-b border-[var(--wb-line)]">
              <span className="mono text-[12px] uppercase text-[var(--wb-yellow)] p-5 border-r border-[var(--wb-line)]">
                Learner
              </span>
              <p className="p-5 text-[var(--wb-chalk-soft)]">
                The issue is consent and whether the clause was properly
                incorporated.
              </p>
            </div>
            <div className="grid grid-cols-[170px_1fr]">
              <span className="mono text-[12px] uppercase text-[var(--wb-yellow)] p-5 border-r border-[var(--wb-line)]">
                Tutor
              </span>
              <p className="p-5 text-[var(--wb-chalk-soft)]">
                Good. Now consider the client&apos;s weaker point. What would
                opposing counsel argue, and how would you distinguish it?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoreboard */}
      <section className="px-6 py-16 bg-[#0e2a24]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 mb-10">
            <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] border-t-2 border-t-[var(--wb-yellow)] pt-3">
              Scoreboard
            </p>
            <h2 className="serif text-[clamp(32px,5vw,52px)] leading-[0.9] text-[#fff8df]">
              The scoreboard is the discipline.
            </h2>
          </div>

          <div className="border border-[var(--wb-line)] bg-[var(--wb-green)]">
            {[
              { label: "Issue spotting", value: "20%" },
              { label: "Legal reasoning", value: "25%" },
              { label: "Use of authority", value: "20%" },
              { label: "Counterarguments", value: "15%" },
              { label: "Writing clarity", value: "10%" },
              { label: "Ethics and AI safety", value: "10%" },
            ].map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[1fr_84px] border-b border-[var(--wb-line)] last:border-b-0"
              >
                <span className="p-5 text-[#fff8df] font-bold">
                  {item.label}
                </span>
                <b className="p-5 text-[var(--wb-yellow)] mono border-l border-[var(--wb-line)] text-center">
                  {item.value}
                </b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Groups */}
      <section className="px-6 py-16 bg-[var(--wb-green-3)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 mb-10">
            <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] border-t-2 border-t-[var(--wb-yellow)] pt-3">
              Training Groups
            </p>
            <h2 className="serif text-[clamp(32px,5vw,52px)] leading-[0.9] text-[#fff8df]">
              Four groups enter the room first.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                group: "01",
                title: "Law students",
                desc: "Exam reasoning, case analysis, issue spotting, and legal writing.",
              },
              {
                group: "02",
                title: "Pupil advocates",
                desc: "Drafting, research discipline, client-ready analysis, and argument preparation.",
              },
              {
                group: "03",
                title: "LegalTech builders",
                desc: "Prompting, legal AI evaluation, automation logic, and hallucination checks.",
              },
              {
                group: "04",
                title: "Legal teams",
                desc: "AI-readiness training for firms and departments adopting new tools.",
              },
            ].map((item) => (
              <div key={item.group} className="paper-card">
                <p className="mono text-[11px] uppercase text-[var(--wb-red)] font-black">
                  Group {item.group}
                </p>
                <h3 className="serif text-[26px] leading-[0.95] mt-8 mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5f4a35] leading-[1.5] text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section className="px-6 py-16 bg-[#0e2a24]">
        <div className="max-w-5xl mx-auto">
          <div className="border-2 border-dashed border-[rgba(242,237,216,0.6)] p-8 md:p-10 bg-[var(--wb-green)]"
            style={{
              background: `
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/30px 30px,
                var(--wb-green)
              `,
            }}
          >
            <h2 className="serif text-[clamp(32px,5vw,48px)] leading-[0.95] text-[#fff8df] mb-3">
              Designed for legal training. Tested in real practice.
            </h2>
            <p className="text-[var(--wb-chalk-soft)] leading-[1.55] mb-6 max-w-[800px]">
              The first pilot brings together lawyers, developers, students, and
              educators to test the platform, refine the training experience, and
              help define a new standard for AI-ready legal practice.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup" className="wb-btn">
                Enter the Room
              </Link>
              {/* Join Pilot button — re-enable for institutional access
              <a
                href="mailto:hello@njinway.com?subject=WakiliBench%20Pilot%20Access"
                className="wb-btn secondary"
              >
                Join Pilot
              </a>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a100b] border-t-[5px] border-t-[var(--wb-wood)] px-6 py-7">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="mono text-[12px] text-[#ffe5bd]">
            WakiliBench by Njinway · Training platform only. Not legal advice.
          </p>
          <div className="flex gap-6">
            <a
              href="https://wakilibench.njinway.com"
              className="mono text-[12px] text-[#ffe5bd] hover:text-[var(--wb-yellow)] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              wakilibench.njinway.com
            </a>
            <Link
              href="/login"
              className="mono text-[12px] text-[var(--wb-yellow)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
