"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/topics", label: "Topics" },
  { href: "/session", label: "Session" },
  { href: "/history", label: "History" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
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
            className="mono text-[11px] uppercase tracking-widest text-[var(--wb-chalk-soft)] hover:text-[var(--wb-red)] transition ml-2"
          >
            Exit
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[var(--wb-chalk)] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--wb-chalk)] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[var(--wb-chalk)] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-[var(--wb-line)] pt-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`mono text-[12px] uppercase tracking-widest ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-[#fff8df]"
                    : "text-[var(--wb-chalk-soft)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="mono text-[12px] uppercase tracking-widest text-[var(--wb-chalk-soft)] hover:text-[var(--wb-red)] transition text-left mt-2"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
