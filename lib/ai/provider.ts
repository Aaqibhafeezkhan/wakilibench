import { config } from "../config";
import type { AIProvider } from "./types";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";

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
    default:
      throw new Error(
        `Unknown LLM_PROVIDER: "${providerName}". Supported: openai, anthropic`
      );
  }
}
