/**
 * Public AI interface for WakiliBench.
 * All application code calls these functions — never a provider directly.
 */

import { getProvider } from "./provider";
import type { ChatMessage, RubricScore } from "./types";
import { TUTOR_SYSTEM_PROMPT } from "../../prompts/tutor";
import { EVALUATOR_SYSTEM_PROMPT } from "../../prompts/evaluator";

export type { RubricScore } from "./types";

interface TutorContext {
  scenario: {
    title: string;
    factPattern: string;
    instructions: string;
  };
  conversationHistory: { role: string; content: string }[];
}

interface EvaluatorContext {
  scenario: {
    title: string;
    factPattern: string;
    instructions: string;
    expectedIssues?: string[];
  };
  userAnswers: string[];
}

/**
 * Generate a Socratic tutor response based on the scenario and conversation.
 */
export async function generateTutorResponse(
  context: TutorContext
): Promise<string> {
  const provider = getProvider();

  const messages: ChatMessage[] = [
    { role: "system", content: TUTOR_SYSTEM_PROMPT },
    {
      role: "user",
      content: `SCENARIO: ${context.scenario.title}\n\nFACTS:\n${context.scenario.factPattern}\n\nINSTRUCTIONS:\n${context.scenario.instructions}`,
    },
  ];

  // Add conversation history
  for (const msg of context.conversationHistory) {
    if (msg.role === "user") {
      messages.push({ role: "user", content: msg.content });
    } else if (msg.role === "tutor") {
      messages.push({ role: "assistant", content: msg.content });
    }
  }

  const response = await provider.chat({
    messages,
    temperature: 0.7,
    maxTokens: 1024,
  });

  return response.content;
}

/**
 * Evaluate a learner's answer and return a structured rubric score.
 */
export async function evaluateAnswer(
  context: EvaluatorContext
): Promise<RubricScore> {
  const provider = getProvider();

  const userWork = context.userAnswers.join("\n\n---\n\n");

  const messages: ChatMessage[] = [
    { role: "system", content: EVALUATOR_SYSTEM_PROMPT },
    {
      role: "user",
      content: `SCENARIO: ${context.scenario.title}\n\nFACTS:\n${context.scenario.factPattern}\n\nINSTRUCTIONS:\n${context.scenario.instructions}\n\n${
        context.scenario.expectedIssues
          ? `EXPECTED ISSUES: ${context.scenario.expectedIssues.join(", ")}\n\n`
          : ""
      }LEARNER'S ANSWER:\n${userWork}`,
    },
  ];

  const response = await provider.chat({
    messages,
    temperature: 0.3,
    maxTokens: 1500,
    jsonMode: true,
  });

  // Parse and validate JSON
  let score: RubricScore;
  try {
    score = JSON.parse(response.content);
  } catch {
    throw new Error("AI evaluator did not return valid JSON");
  }

  // Validate score ranges
  score.issue_spotting = clamp(score.issue_spotting, 0, 20);
  score.legal_reasoning = clamp(score.legal_reasoning, 0, 25);
  score.use_of_authority = clamp(score.use_of_authority, 0, 20);
  score.counterarguments = clamp(score.counterarguments, 0, 15);
  score.writing_clarity = clamp(score.writing_clarity, 0, 10);
  score.ethics_ai_safety = clamp(score.ethics_ai_safety, 0, 10);
  score.overall_score = clamp(score.overall_score, 0, 100);

  // Ensure arrays
  score.strengths = Array.isArray(score.strengths) ? score.strengths : [];
  score.weaknesses = Array.isArray(score.weaknesses) ? score.weaknesses : [];
  score.next_action = score.next_action || "";
  score.disclaimer =
    "WakiliBench is a legal training tool. It does not provide legal advice and does not replace qualified professional judgment.";

  return score;
}

function clamp(value: number, min: number, max: number): number {
  if (typeof value !== "number" || isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}
