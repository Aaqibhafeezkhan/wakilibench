import { signup } from "./actions";
import { loginWithGoogle } from "../login/actions";
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

        {/* Google OAuth */}
        <form className="mb-6">
          <button
            formAction={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[var(--wb-line)] bg-[var(--wb-green)] hover:border-[var(--wb-chalk-soft)] transition rounded-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="mono text-[12px] uppercase tracking-widest text-[var(--wb-chalk)]">
              Continue with Google
            </span>
          </button>
        </form>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--wb-line)]" />
          <span className="mono text-[10px] uppercase text-[var(--wb-chalk-soft)] tracking-widest">
            or
          </span>
          <div className="flex-1 h-px bg-[var(--wb-line)]" />
        </div>

        {/* Email/password */}
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
