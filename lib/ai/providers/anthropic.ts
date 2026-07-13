import { config } from "../../config";
import type {
  AIProvider,
  ChatCompletionRequest,
  ChatCompletionResponse,
} from "../types";

/**
 * Anthropic provider using the Messages API.
 * To use: set LLM_PROVIDER=anthropic, LLM_API_KEY=sk-ant-..., LLM_MODEL=claude-sonnet-4-20250514
 */
export class AnthropicProvider implements AIProvider {
  name = "anthropic";

  async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    // Anthropic separates system prompt from messages
    const systemMessage = request.messages.find((m) => m.role === "system");
    const conversationMessages = request.messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

    const body: Record<string, unknown> = {
      model: config.ai.model,
      max_tokens: request.maxTokens || 2048,
      messages: conversationMessages,
      temperature: request.temperature ?? 0.7,
    };

    if (systemMessage) {
      body.system = systemMessage.content;
    }

    const apiUrl = config.ai.apiUrl || "https://api.anthropic.com";

    const response = await fetch(`${apiUrl}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.ai.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Anthropic API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    const textBlock = data.content?.find(
      (block: { type: string }) => block.type === "text"
    );

    if (!textBlock) {
      throw new Error("No text response from Anthropic");
    }

    return {
      content: textBlock.text || "",
      finishReason: data.stop_reason || "unknown",
      usage: data.usage
        ? {
            promptTokens: data.usage.input_tokens,
            completionTokens: data.usage.output_tokens,
            totalTokens:
              data.usage.input_tokens + data.usage.output_tokens,
          }
        : undefined,
    };
  }
}
