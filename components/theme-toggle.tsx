"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wb-theme");
    if (saved === "light") {
      setLight(true);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("wb-theme", "light");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("wb-theme", "dark");
    }
  }

  return (
    <button
      onClick={toggle}
      className="mono text-[10px] uppercase tracking-widest text-[var(--wb-chalk-soft)] hover:text-[var(--wb-yellow)] transition"
      aria-label="Toggle light/dark mode"
      title={light ? "Switch to dark mode" : "Switch to light mode"}
    >
      {light ? "☀" : "☽"}
    </button>
  );
}
