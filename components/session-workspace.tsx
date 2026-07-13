"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  role: string;
  content: string;
  message_type: string;
  created_at: string;
}

interface Props {
  sessionId: string;
  sessionStatus: string;
  scenario: {
    title: string;
    factPattern: string;
    instructions: string;
    difficulty: string;
  };
  topicTitle: string;
  existingMessages: Message[];
}

export function SessionWorkspace({
  sessionId,
  sessionStatus,
  scenario,
  topicTitle,
  existingMessages,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(existingMessages);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const hasUserAnswer = messages.some((m) => m.message_type === "answer");

  async function handleSubmitAnswer() {
    if (!answer.trim()) return;
    setSubmitting(true);

    const supabase = createClient();

    const { data: newMessage, error } = await supabase
      .from("messages")
      .insert({
        session_id: sessionId,
        role: "user",
        content: answer.trim(),
        message_type: "answer",
      })
      .select("id, role, content, message_type, created_at")
      .single();

    if (error) {
      setSubmitting(false);
      alert("Could not save your answer. Please try again.");
      return;
    }

    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
    }

    setAnswer("");
    setSubmitting(false);
    router.refresh();
  }

  async function handleRequestTutor() {
    setSubmitting(true);

    try {
      const res = await fetch(`/api/session/${sessionId}/tutor`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Could not get tutor response.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
    } catch {
      alert("Network error. Please try again.");
    }

    setSubmitting(false);
    router.refresh();
  }

  async function handleRequestEvaluation() {
    setSubmitting(true);

    try {
      const res = await fetch(`/api/session/${sessionId}/evaluate`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Could not get evaluation.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data.message]);
    } catch {
      alert("Network error. Please try again.");
    }

    setSubmitting(false);
    router.refresh();
  }

  return (
    <div>
      {/* Scenario card */}
      <div className="prompt-card mb-6">
        <p className="mono text-[11px] uppercase text-[var(--wb-yellow)] tracking-widest mb-3">
          {topicTitle} · {scenario.difficulty}
        </p>
        <h2 className="serif text-[28px] leading-[0.95] text-[#fff8df] mb-4">
          {scenario.title}
        </h2>
        <p className="text-[var(--wb-chalk)] leading-relaxed">
          {scenario.factPattern}
        </p>
        <p className="text-[var(--wb-chalk-soft)] mt-4 italic border-t border-[var(--wb-line)] pt-4">
          {scenario.instructions}
        </p>
      </div>

      {/* Message transcript */}
      {messages.length > 0 && (
        <div className="border border-[var(--wb-line)] bg-[#09201a] mb-6">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`grid grid-cols-[140px_1fr] ${
                i < messages.length - 1 ? "border-b border-[var(--wb-line)]" : ""
              }`}
            >
              <span className="mono text-[11px] uppercase text-[var(--wb-yellow)] p-5 border-r border-[var(--wb-line)] tracking-widest">
                {msg.role === "user"
                  ? "Learner"
                  : msg.role === "tutor"
                  ? "Tutor"
                  : msg.role === "evaluator"
                  ? "Evaluator"
                  : "System"}
              </span>
              <p className="p-5 text-[var(--wb-chalk-soft)] whitespace-pre-wrap leading-relaxed text-sm">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Answer area */}
      {sessionStatus === "active" && (
        <div className="prompt-card">
          <p className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest mb-3">
            {hasUserAnswer ? "Follow-up / Revision" : "Your Answer"}
          </p>
          <textarea
            className="w-full h-40 rounded-sm px-3 py-3 bg-[var(--wb-green-3)] border border-[var(--wb-line)] text-[var(--wb-chalk)] focus:outline-none focus:border-[var(--wb-yellow)] transition resize-y text-sm leading-relaxed"
            placeholder="Write your legal analysis here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitting}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleSubmitAnswer}
              disabled={submitting || !answer.trim()}
              className="wb-btn text-[11px] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Submit"}
            </button>

            {hasUserAnswer && (
              <>
                <button
                  onClick={handleRequestTutor}
                  disabled={submitting}
                  className="wb-btn secondary text-[11px] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? "..." : "Ask Tutor"}
                </button>
                <button
                  onClick={handleRequestEvaluation}
                  disabled={submitting}
                  className="wb-btn secondary text-[11px] border-color-[var(--wb-yellow)] text-[var(--wb-yellow)] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? "..." : "Evaluate"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {sessionStatus === "evaluated" && (
        <div className="prompt-card text-center py-8">
          <p className="mono text-[12px] uppercase text-[var(--wb-yellow)] tracking-widest mb-2">
            Session Complete
          </p>
          <p className="text-sm text-[var(--wb-chalk-soft)]">
            This session has been evaluated. Review the transcript above.
          </p>
        </div>
      )}
    </div>
  );
}
