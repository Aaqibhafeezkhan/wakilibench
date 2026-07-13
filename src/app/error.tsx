"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-[var(--wb-green-3)]">
      <div className="text-center">
        <p className="mono text-[11px] uppercase text-[var(--wb-red)] tracking-widest mb-4">
          Error
        </p>
        <h1 className="serif text-[48px] text-[#fff8df] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="wb-btn text-[11px]">
          Try Again
        </button>
      </div>
    </main>
  );
}
