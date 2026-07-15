"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
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

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Check usage limit (3 sessions/week for free tier)
    const weekStart = getWeekStart();
    const { count } = await supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", weekStart.toISOString());

    if ((count || 0) >= 5) {
      setLoading(false);
      alert(
        "You have reached your weekly session limit (5 sessions). Your limit resets next Monday."
      );
      return;
    }

    // Create session
    const { data: session, error } = await supabase
      .from("sessions")
      .insert({
        user_id: user.id,
        topic_id: topicId,
        scenario_id: scenarioId,
        status: "active",
      })
      .select("id")
      .single();

    if (error || !session) {
      setLoading(false);
      alert("Could not start session. Please try again.");
      return;
    }

    // Log usage event
    await supabase.from("usage_events").insert({
      user_id: user.id,
      event_type: "session_started",
      metadata_json: { topic_id: topicId, scenario_id: scenarioId },
    });

    router.push(`/session/${session.id}`);
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

function getWeekStart(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}
