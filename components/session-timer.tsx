"use client";

import { useState, useEffect } from "react";

interface Props {
  /** Whether the timer is running */
  active: boolean;
}

/**
 * Optional session timer showing elapsed time.
 * Starts when the session page loads, pauses when evaluated.
 */
export function SessionTimer({ active }: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="mono text-[11px] text-[var(--wb-chalk-soft)] tracking-widest">
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
