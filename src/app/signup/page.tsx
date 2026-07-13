import { signup } from "./actions";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 bg-[var(--wb-green-3)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
            Moot Room
          </p>
          <h1 className="serif text-[36px] text-[#fff8df]">
            Join the Bench
          </h1>
        </div>

        <form className="prompt-card flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
              Full Name
            </span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="rounded-sm px-3 py-3 bg-[var(--wb-green-3)] border border-[var(--wb-line)] text-[var(--wb-chalk)] focus:outline-none focus:border-[var(--wb-yellow)] transition"
            />
          </label>

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
              minLength={6}
              className="rounded-sm px-3 py-3 bg-[var(--wb-green-3)] border border-[var(--wb-line)] text-[var(--wb-chalk)] focus:outline-none focus:border-[var(--wb-yellow)] transition"
            />
          </label>

          <button formAction={signup} className="wb-btn mt-2 w-full">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-[13px] text-[var(--wb-chalk-soft)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--wb-yellow)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
