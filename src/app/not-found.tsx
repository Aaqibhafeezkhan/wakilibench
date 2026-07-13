import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-[var(--wb-green-3)]">
      <div className="text-center">
        <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] tracking-widest mb-4">
          404
        </p>
        <h1 className="serif text-[48px] text-[#fff8df] mb-4">
          Page not found
        </h1>
        <p className="text-[var(--wb-chalk-soft)] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/dashboard" className="wb-btn text-[11px]">
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
