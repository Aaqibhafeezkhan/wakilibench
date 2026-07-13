import { login } from "./actions";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-[var(--wb-green-3)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
            Moot Room
          </p>
          <h1 className="serif text-[36px] text-[#fff8df]">
            Enter the Room
          </h1>
        </div>

        {params.error && (
          <div className="mb-4 p-3 border border-[var(--wb-red)] bg-[rgba(201,90,69,0.1)] text-[var(--wb-red)] text-sm">
            {params.error}
          </div>
        )}

        {params.message && (
          <div className="mb-4 p-3 border border-[var(--wb-yellow)] bg-[rgba(240,195,90,0.1)] text-[var(--wb-yellow)] text-sm">
            {params.message}
          </div>
        )}

        <form className="prompt-card flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
              Email
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-sm px-3 py-3 bg-[var(--wb-green-3)] border border-[var(--wb-line)] text-[var(--wb-chalk)] focus:outline-none focus:border-[var(--wb-yellow)] transition"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
              Password
            </span>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-sm px-3 py-3 bg-[var(--wb-green-3)] border border-[var(--wb-line)] text-[var(--wb-chalk)] focus:outline-none focus:border-[var(--wb-yellow)] transition"
            />
          </label>

          <button formAction={login} className="wb-btn mt-2 w-full">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[var(--wb-chalk-soft)]">
          No account?{" "}
          <Link href="/signup" className="text-[var(--wb-yellow)] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
