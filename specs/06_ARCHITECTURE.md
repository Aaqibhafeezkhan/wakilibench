# Architecture

## Principle
Do not let infrastructure slow down the product. Use managed services and hosted AI APIs for V1.

## Recommended V1 Stack
Frontend/backend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui only if it does not make the UI generic

Database/auth:
- Supabase Auth
- Supabase Postgres

AI:
- Hosted LLM API
- One tutor endpoint
- One evaluator endpoint
- No multi-agent orchestration in V1

Hosting:
- WordPress landing page at wakilibench.njinway.com
- MVP app at app.wakilibench.njinway.com
- Vercel, Render, Railway, or Cloudflare for app deployment
- Do not wait for AWS/Azure startup credits

## Logical Architecture
Client UI → Next.js server route → Supabase Auth check → Supabase Postgres → LLM API → Save messages and scores → Return feedback to UI

## V1 API Routes
- POST /api/session/start
- POST /api/session/message
- POST /api/session/evaluate
- GET /api/sessions
- GET /api/sessions/:id
- GET /api/topics
- GET /api/scenarios/:id

## Security Baseline
- Auth required for tutor sessions
- Rate limit AI endpoints
- Store prompts and outputs
- Display legal advice disclaimer
- Do not expose API keys client-side
- Sanitize user input
- Add basic audit logs for AI calls
- Manual approval for pilot users if needed

## Future Architecture
Move to separate backend only after V1 proves usage:
- NestJS API
- Queue for AI jobs
- pgvector-based retrieval
- Admin/reviewer dashboard
- Payment service
- Institution dashboards
- Legal source library
