import { config } from "../../config";
import type {
  AIProvider,
  ChatCompletionRequest,
  ChatCompletionResponse,
} from "../types";

/**
 * Qwen (Alibaba Cloud) provider.
 * Uses the OpenAI-compatible DashScope API.
 */
export class QwenProvider implements AIProvider {
  name = "qwen";

  async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const apiUrl = config.ai.apiUrl || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";

    const body: Record<string, unknown> = {
      model: config.ai.model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      enable_thinking: false,
    };

    if (request.maxTokens) {
      body.max_tokens = request.maxTokens;
    }

    if (request.jsonMode) {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.ai.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Qwen API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    const choice = data.choices?.[0];

    if (!choice) {
      throw new Error("No response from Qwen");
    }

    const content = choice.message?.content || choice.message?.reasoning_content || "";

    return {
      content,
      finishReason: choice.finish_reason || "unknown",
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
          }
        : undefined,
    };
  }
}
