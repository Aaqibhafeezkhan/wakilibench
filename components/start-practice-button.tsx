"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  topicId: string;
  scenarioId: string;
}

export function StartPracticeButton({ topicId, scenarioId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);

    try {
      const res = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, scenarioId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        if (res.status === 403) {
          router.push("/pricing");
        } else {
          alert(data.error || "Could not start session.");
        }
        return;
      }

      router.push(`/session/${data.sessionId}`);
    } catch {
      setLoading(false);
      alert("Network error. Please try again.");
    }
  }

  return (
    <button
      onClick={handleStart}
      disabled={loading}
      className="wb-btn text-[11px] whitespace-nowrap disabled:opacity-50"
    >
      {loading ? "..." : "Start"}
    </button>
  );
}
