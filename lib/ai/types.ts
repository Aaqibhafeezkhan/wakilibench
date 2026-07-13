/**
 * Shared types for the AI provider abstraction.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  /** If true, instructs the provider to return valid JSON */
  jsonMode?: boolean;
}

export interface ChatCompletionResponse {
  content: string;
  finishReason: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProvider {
  name: string;
  chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse>;
}

export interface RubricScore {
  issue_spotting: number;
  legal_reasoning: number;
  use_of_authority: number;
  counterarguments: number;
  writing_clarity: number;
  ethics_ai_safety: number;
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  next_action: string;
  disclaimer: string;
}
