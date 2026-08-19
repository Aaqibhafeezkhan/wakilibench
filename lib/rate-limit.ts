/**
 * Simple in-memory rate limiter for API endpoints.
 * Tracks requests per user per window. Resets each window.
 *
 * For production at scale, replace with Upstash Redis.
 * This is sufficient for pilot/early users (<100 concurrent).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Max requests per window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

/**
 * Check rate limit for a given identifier (usually userId + endpoint).
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const entry = store.get(key);

  // No entry or expired — allow and create
  if (!entry || now > entry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + config.windowSeconds * 1000,
    });
    return { allowed: true, remaining: config.limit - 1, resetIn: config.windowSeconds };
  }

  // Within window
  if (entry.count >= config.limit) {
    const resetIn = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  // Increment
  entry.count++;
  const resetIn = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: true, remaining: config.limit - entry.count, resetIn };
}

/** Rate limit configs per endpoint */
export const RATE_LIMITS = {
  tutor: { limit: 10, windowSeconds: 60 },
  evaluate: { limit: 5, windowSeconds: 60 },
  generate: { limit: 5, windowSeconds: 60 },
  login: { limit: 10, windowSeconds: 300 },
} as const;
