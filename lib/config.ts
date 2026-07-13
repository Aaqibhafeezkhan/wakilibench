/**
 * Centralized configuration module.
 * All environment variables are accessed here — never use process.env directly elsewhere.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const config = {
  // Supabase (available client-side via NEXT_PUBLIC_ prefix)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },

  // LLM Provider (server-side only — never expose to client)
  ai: {
    get provider() {
      return optionalEnv("LLM_PROVIDER", "openai");
    },
    get apiKey() {
      return requireEnv("LLM_API_KEY");
    },
    get apiUrl() {
      return optionalEnv("LLM_API_URL", "https://api.openai.com/v1");
    },
    get model() {
      return optionalEnv("LLM_MODEL", "gpt-4o-mini");
    },
  },

  // App settings
  app: {
    name: "WakiliBench",
    url: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3001"),
    // Usage limits
    freeSessionsPerWeek: 3,
  },
} as const;
