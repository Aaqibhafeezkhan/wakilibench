# WakiliBench V1 — Build Checklist

> Core loop: Practice → Challenge → Score → Improve
> Ship a working pilot where a learner can practice legal reasoning and see scores improve.

---

## Phase 1 — Infrastructure ✅

- [x] Repository scaffold
- [x] Next.js + TypeScript + Tailwind setup
- [x] Supabase SSR client (browser + server + middleware)
- [x] Protected routes via middleware
- [x] Auth pages (login, signup, callback)
- [x] Email confirmation handling
- [x] Error/message display on auth pages
- [x] Moot Room design system (globals.css tokens)
- [x] SQL schema (001_schema.sql)
- [x] Seed data (002_seed.sql) — 3 topics, 15 scenarios
- [x] RLS policies
- [x] System prompts (tutor + evaluator)
- [x] AGENTS.md
- [x] Spec kit in /specs
- [x] ESLint flat config
- [x] Centralized config module (lib/config.ts)
- [x] Port locked to 3001
- [x] Supabase project configured (site URL, redirects)

---

## Phase 2 — Data Flow ✅

- [x] Topics page — fetch from Supabase
- [x] Topic detail page (/topics/[slug]) — list scenarios
- [x] Start Practice button — creates session row
- [x] Session page (/session/[id]) — loads scenario from DB
- [x] Answer textarea — saves user message to DB
- [x] Message transcript — displays session messages
- [x] Tutor API stub (POST /api/session/[id]/tutor)
- [x] Evaluator API stub (POST /api/session/[id]/evaluate)
- [x] History page — fetches real sessions with scores
- [x] Session status management (active → evaluated)

---

## Phase 3 — AI Layer ✅

- [x] Create lib/ai/ provider abstraction
  - [x] lib/ai/index.ts (public interface)
  - [x] lib/ai/types.ts (shared types)
  - [x] lib/ai/provider.ts (provider registry)
  - [x] lib/ai/providers/openai.ts
  - [x] lib/ai/providers/anthropic.ts
- [x] Wire tutor endpoint to real LLM
  - [x] Load scenario + answer + conversation history
  - [x] Use tutor system prompt
  - [x] Parse and save AI response
- [x] Wire evaluator endpoint to real LLM
  - [x] Use evaluator system prompt
  - [x] Parse JSON rubric response
  - [x] Validate score ranges
  - [x] Save rubric_scores row
  - [x] Update session final_score
- [x] Error handling for AI failures
- [ ] Add LLM_* env vars to .env.local

---

## Phase 4 — History & Progress ✅

- [x] History cards show topic + scenario title
- [x] Click to resume active sessions
- [x] Score stats (completed count, average, best)
- [x] User progress summary on dashboard (weekly usage bar)

---

## Phase 5 — Usage Limits ✅

- [x] Track session creation in usage_events
- [x] Free tier: 3 sessions/week
- [x] Show remaining attempts on dashboard
- [x] Block session creation when limit reached
- [ ] access_passes table integration (future: paid tiers override limit)

---

## Phase 6 — Polish ✅

- [x] Loading states (spinner component + root loading)
- [x] Error states (error.tsx boundary)
- [x] Empty states (no topics, no history)
- [ ] Responsive mobile navigation (hamburger menu)
- [x] 404 page (not-found.tsx)
- [x] 500 / error page (error.tsx)
- [ ] Auth error page
- [x] Legal disclaimer on every AI response
- [ ] Rate limiting on AI endpoints

---

## Deployment 🔲

- [ ] Push to GitHub (https://github.com/Njine/wakilibench)
- [ ] Deploy to Alibaba Cloud (free tier for Qwen hackathon)
  - [ ] Set up ECS instance or Function Compute / Container Service
  - [ ] Configure Node.js runtime
  - [ ] Set environment variables
  - [ ] Run `npm run build && npm run start`
  - [ ] Point app.wakilibench.njinway.com to Alibaba Cloud
- [ ] Set up Qwen API via DashScope
  - [ ] Get DashScope API key from console.aliyun.com
  - [ ] Set LLM_PROVIDER=qwen in production env
  - [ ] Set LLM_MODEL=qwen-plus (or qwen-max)
  - [ ] Set LLM_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
- [ ] Verify production auth flow
- [ ] Verify production AI flow (tutor + evaluator)

---

## Hard Rules (Never Break)

- WakiliBench is a legal training tool — NOT legal advice
- No payments in V1
- No PDF upload
- No RAG / vector search
- No multi-agent orchestration
- No self-hosted models
- No complex cloud infra
- No institutional dashboards
- No mobile app
- AI calls go through lib/ai abstraction only
- All env vars accessed via lib/config.ts
- Design stays Moot Room — no generic SaaS

---

## V1 Demo Flow (acceptance test)

```
User → Signup → Dashboard → Topics → Contract Law →
Scenario → Start Practice → Session created →
Write answer → Save → Tutor AI responds →
User answers follow-up → Evaluator scores →
History updated with score
```

If that works end-to-end, V1 is ready for pilots.
