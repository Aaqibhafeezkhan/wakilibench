# WakiliBench Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER (Browser)                               │
│                                                                      │
│   Landing Page → Sign Up/Login → Dashboard → Topics → Session        │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
                                   │ HTTPS
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL (Next.js App Router)                        │
│                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│   │  Pages/UI    │  │  Middleware   │  │  API Routes              │  │
│   │  (React SSR) │  │  (Auth Guard) │  │  /api/session/[id]/tutor │  │
│   │              │  │              │  │  /api/session/[id]/eval  │  │
│   └──────────────┘  └──────────────┘  └────────────┬─────────────┘  │
│                                                     │                │
│   ┌─────────────────────────────────────────────────┼──────────────┐│
│   │              lib/ai/ Provider Abstraction        │              ││
│   │   ┌─────────┐  ┌───────────┐  ┌─────────┐     │              ││
│   │   │ OpenAI  │  │ Anthropic │  │  Qwen   │◄────┘              ││
│   │   └─────────┘  └───────────┘  └────┬────┘                    ││
│   └─────────────────────────────────────┼─────────────────────────┘│
└─────────────────────────────────────────┼──────────────────────────┘
                                          │
                    ┌─────────────────────┼────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
┌──────────────────────────┐  ┌────────────────────────────────────┐
│    SUPABASE              │  │    ALIBABA CLOUD (DashScope)       │
│                          │  │                                    │
│  ┌────────────────────┐  │  │  ┌──────────────────────────────┐  │
│  │  Supabase Auth     │  │  │  │  Qwen 3.7-Plus LLM           │  │
│  │  (JWT Sessions)    │  │  │  │                              │  │
│  └────────────────────┘  │  │  │  • Socratic Tutor Endpoint   │  │
│                          │  │  │  • Rubric Evaluator Endpoint  │  │
│  ┌────────────────────┐  │  │  │                              │  │
│  │  Postgres DB       │  │  │  │  OpenAI-Compatible API       │  │
│  │                    │  │  │  └──────────────────────────────┘  │
│  │  • users           │  │  │                                    │
│  │  • topics          │  │  │  Region: ap-southeast-1            │
│  │  • scenarios       │  │  │  Free Tier: 70M+ tokens            │
│  │  • sessions        │  │  │                                    │
│  │  • messages        │  │  └────────────────────────────────────┘
│  │  • rubric_scores   │  │
│  │  • usage_events    │  │
│  │  • access_passes   │  │
│  │                    │  │
│  │  Row Level Security│  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘

```

## Data Flow

```
1. User signs up/logs in → Supabase Auth issues JWT
2. User selects topic → Postgres returns scenarios
3. User starts session → Session row created in DB
4. User submits answer → Message saved to DB
5. User clicks "Ask Tutor":
   → API route loads scenario + conversation history
   → Sends to Qwen 3.7-Plus via DashScope API
   → Tutor responds with Socratic questions
   → Response saved as message in DB
6. User clicks "Evaluate":
   → API route loads all user answers
   → Sends to Qwen with evaluator system prompt
   → Returns JSON rubric score
   → Score saved to rubric_scores table
   → Session marked as evaluated
7. User views history → Scores and sessions loaded from DB
```

## Key Design Decisions

- **Provider Abstraction**: AI calls go through `lib/ai/` — swap between Qwen, OpenAI, or Anthropic via env var
- **No Direct LLM Calls**: Business logic never touches a specific API — always through `generateTutorResponse()` or `evaluateAnswer()`
- **Qwen on Alibaba Cloud**: All AI inference runs on Alibaba Cloud infrastructure via DashScope
- **Row Level Security**: Users can only access their own sessions and scores
- **Structured Evaluation**: Evaluator returns validated JSON with clamped score ranges
