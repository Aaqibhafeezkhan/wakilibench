# AGENTS.md

This repository is WakiliBench V1.

## Product
AI-powered legal training and assessment for Kenyan legal learners and early practitioners.

Not a legal advice chatbot.

## Core Loop
Practice → Challenge → Score → Improve

## V1 Stack
- Next.js
- TypeScript
- Supabase Auth
- Supabase Postgres
- Hosted LLM API
- Tailwind CSS

## Do Not Add Without Explicit Instruction
- Payments
- PDF uploads
- Complex RAG
- Multi-agent orchestration
- Self-hosted models
- AWS/Azure-specific infrastructure
- Mobile app
- Institution dashboards

## Design Direction
Moot Room:
- chalkboard
- Socratic transcript
- legal training room
- prompt card
- scoreboard
- serious but energetic

Avoid generic SaaS UI.

## Engineering Standards
- Keep code typed and readable.
- Keep components small.
- Add error handling.
- Never expose secrets client-side.
- Validate AI JSON outputs.
- Save user sessions and scores.
- Always include legal training disclaimer where relevant.
