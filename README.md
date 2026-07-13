# WakiliBench

**AI-powered legal training and assessment for Kenyan legal learners and early practitioners.**

WakiliBench is not a legal advice chatbot. It trains legal reasoning through a Socratic practice loop: answer the problem, face questions, defend your authority, receive a score, and improve.

🌐 [wakilibench.njinway.com](https://wakilibench.njinway.com)

---

## Core Loop

```
Practice → Answer → Socratic Challenge → Rubric Evaluation → Improve
```

A learner selects a topic, reads a scenario, writes their legal analysis, receives Socratic follow-up questions from the AI tutor, and is scored against a rubric covering issue spotting, legal reasoning, use of authority, counterarguments, writing clarity, and ethics/AI safety.

---

## Features (V1)

- **Authentication** — signup, login, protected routes via Supabase Auth
- **Topics** — Contract Law, Constitutional Law, Legal Writing & AI Safety
- **Scenarios** — 15 practice scenarios seeded across 3 topics
- **Tutor Session** — write answers, receive Socratic AI feedback
- **Rubric Evaluation** — structured scoring (out of 100) with strengths, weaknesses, next actions
- **Session History** — review past sessions, track scores over time
- **Usage Limits** — 3 sessions/week on free tier
- **Moot Room UI** — dark green chalkboard aesthetic, not generic SaaS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Supabase Auth |
| Database | Supabase Postgres |
| AI | Qwen (DashScope) / OpenAI / Anthropic via provider abstraction |
| Deployment | Docker / Alibaba Cloud |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project (free tier works)
- An LLM API key (Qwen DashScope, OpenAI, or Anthropic)

### Setup

```bash
git clone https://github.com/Njine/wakilibench.git
cd wakilibench
npm install
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

LLM_PROVIDER=qwen
LLM_API_KEY=sk-your-dashscope-key
LLM_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1
LLM_MODEL=qwen-plus
```

### Database Setup

Run these SQL files in your Supabase SQL Editor (in order):

1. `db/001_schema.sql` — creates tables and RLS policies
2. `db/002_seed.sql` — seeds 3 topics and 15 scenarios

### Run

```bash
npm run dev
```

Visit `http://localhost:3001`

---

## AI Provider Configuration

WakiliBench uses a provider abstraction — switch providers by changing environment variables only.

| Provider | LLM_PROVIDER | LLM_API_URL | Models |
|----------|-------------|-------------|--------|
| Qwen (Alibaba) | `qwen` | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1` | qwen-turbo, qwen-plus, qwen-max |
| OpenAI | `openai` | `https://api.openai.com/v1` | gpt-4o-mini, gpt-4o |
| Anthropic | `anthropic` | `https://api.anthropic.com` | claude-sonnet-4-20250514 |

---

## Deployment (Docker)

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your-url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.wakilibench.njinway.com \
  -t wakilibench .

docker run -p 3000:3000 \
  -e LLM_PROVIDER=qwen \
  -e LLM_API_KEY=sk-your-key \
  -e LLM_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1 \
  -e LLM_MODEL=qwen-plus \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  wakilibench
```

---

## Project Structure

```
wakilibench/
├── src/app/           # Next.js App Router pages and API routes
├── components/        # Shared React components
├── lib/
│   ├── ai/            # AI provider abstraction (openai, anthropic, qwen)
│   ├── supabase/      # Supabase client (browser, server, middleware)
│   ├── config.ts      # Centralized environment config
│   └── usage.ts       # Usage limit tracking
├── db/                # SQL schema and seed migrations
├── prompts/           # System prompts (tutor, evaluator)
├── specs/             # Product spec kit
├── AGENTS.md          # Agent context file
├── CHECKLIST.md       # Build progress tracker
└── Dockerfile         # Container deployment
```

---

## Target Users

1. **Law students** — exam reasoning, case analysis, issue spotting
2. **ATP candidates & pupil advocates** — drafting, research discipline, argument preparation
3. **Junior lawyers** — client-ready analysis, authority verification
4. **LegalTech builders** — prompting, AI evaluation, hallucination checks

---

## Scoring Rubric

| Dimension | Weight |
|-----------|--------|
| Issue spotting | 20% |
| Legal reasoning | 25% |
| Use of authority | 20% |
| Counterarguments | 15% |
| Writing clarity | 10% |
| Ethics & AI safety | 10% |

---

## Hard Rules

- WakiliBench is a **training tool** — it never provides legal advice
- AI responses always include a disclaimer
- No hallucinated cases or statutes — the tutor says "I'm not sure" when uncertain
- Kenyan legal context is prioritized where applicable

---

## Not in V1

Payments, PDF upload, RAG, multi-agent orchestration, voice, mobile app, institutional dashboards, self-hosted models, complex cloud infrastructure.

---

## License

Proprietary — Njinway.

---

*Practice legal reasoning. Face better questions. See your score improve.*
