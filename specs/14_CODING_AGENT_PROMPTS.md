# Coding Agent Prompts

## Universal Context Prompt
You are working on WakiliBench V1.

Read the entire /specs folder before making changes.

WakiliBench is an AI-powered legal training and assessment platform for Kenyan legal learners and early practitioners.

It is not a legal advice chatbot.

V1 scope is locked:
- auth
- topics
- scenarios
- tutor session
- Socratic AI response
- rubric evaluation
- session history
- usage limits

Do not add payments, PDF upload, multi-agent orchestration, self-hosted models, or complex cloud infrastructure unless explicitly requested.

Use simple, clean, typed, maintainable code.

Preserve the Moot Room design direction:
- chalkboard
- legal training room
- Socratic transcript
- scoreboard
- prompt card
- no generic SaaS visual language

Before coding, summarize:
1. files you will touch
2. implementation plan
3. acceptance criteria

After coding, summarize:
1. what changed
2. how to test
3. risks or TODOs

## Feature Implementation Prompt
Implement the feature described below using the existing architecture and specs.

Feature:
[PASTE FEATURE]

Constraints:
- TypeScript
- Next.js
- Supabase
- clean error handling
- no exposed secrets
- mobile responsive
- no scope creep

Acceptance criteria:
[PASTE ACCEPTANCE CRITERIA]

Return:
- changed files
- explanation
- test steps

## Bug Fix Prompt
Fix this bug without changing unrelated behavior.

Bug:
[PASTE BUG]

Expected behavior:
[PASTE EXPECTED BEHAVIOR]

Actual behavior:
[PASTE ACTUAL BEHAVIOR]

Constraints:
- inspect relevant files first
- make the smallest safe change
- preserve V1 scope
- add validation or tests where practical

Return:
- root cause
- changed files
- test steps

## Refactor Prompt
Refactor the selected code for clarity, maintainability, and accepted standards.

Constraints:
- do not change behavior
- preserve types
- remove duplication
- improve naming
- keep components small
- explain all changes

## AI Prompt Prompt
Improve the AI prompt below for WakiliBench.

Goal:
- Socratic legal training
- no legal advice
- no hallucinated authorities
- concise but useful feedback
- structured output when needed

Prompt:
[PASTE PROMPT]

Return:
- improved prompt
- why it is better
- failure cases to test
