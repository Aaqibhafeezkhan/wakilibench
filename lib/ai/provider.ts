import { config } from "../config";
import type { AIProvider } from "./types";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";
import { QwenProvider } from "./providers/qwen";

/**
 * Returns the configured AI provider.
 * Add new providers here as they become available.
 */
export function getProvider(): AIProvider {
  const providerName = config.ai.provider;

  switch (providerName) {
    case "openai":
      return new OpenAIProvider();
    case "anthropic":
      return new AnthropicProvider();
    case "qwen":
      return new QwenProvider();
    default:
      throw new Error(
        `Unknown LLM_PROVIDER: "${providerName}". Supported: openai, anthropic, qwen`
      );
  }
}
