# WakiliBench V1 Spec Kit

Use this folder as the source of truth when working with any LLM, coding agent, or human collaborator.

## Product
WakiliBench is an AI-powered legal training and assessment platform for Kenyan legal learners and early practitioners.

## V1 Objective
Ship a working pilot in one week where a learner can:
1. Create an account or access a controlled pilot.
2. Choose a legal training topic.
3. Read a scenario.
4. Submit an answer.
5. Receive Socratic follow-up.
6. Receive rubric-based scoring.
7. View saved session history.

## V1 Positioning
WakiliBench is not a legal advice chatbot. It is a training bench for legal reasoning, issue spotting, authority use, writing clarity, counterarguments, ethics, and AI safety.

## One-line Product Promise
Practice legal reasoning. Face better questions. See your score improve.

## Current Access Model
Freemium + paid cohorts + practice credits + institutional pilots. Avoid launching with a pure monthly subscription.

## Current Build Strategy
Use simple managed infrastructure first. Do not block on cloud startup credits.

Recommended V1 stack:
- Next.js full-stack app
- Supabase Auth
- Supabase Postgres
- Hosted LLM API
- WordPress landing page remains public
- MVP app at app.wakilibench.njinway.com or similar

## Public Name
WakiliBench.

Internal ownership: Njinway-owned product.

Public pilot copy should avoid unnecessary ownership politics and focus on the product and early testers.
