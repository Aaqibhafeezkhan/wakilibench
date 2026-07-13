"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/topics", label: "Topics" },
  { href: "/session", label: "Session" },
  { href: "/history", label: "History" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="bg-[var(--wb-green)] border-b border-[var(--wb-line)] px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="serif text-[24px] text-[#fff8df]">
          WakiliBench
        </Link>

        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mono text-[11px] uppercase tracking-widest transition border-b ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-[#fff8df] border-b-[var(--wb-yellow)]"
                  : "text-[var(--wb-chalk-soft)] border-b-transparent hover:text-[#fff8df] hover:border-b-[var(--wb-yellow)]"
              } pb-1`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleSignOut}
            className="mono text-[11px] uppercase tracking-widest text-[var(--wb-chalk-soft)] hover:text-[var(--wb-red)] transition"
          >
            Exit
          </button>
        </div>
      </div>
    </nav>
  );
}
