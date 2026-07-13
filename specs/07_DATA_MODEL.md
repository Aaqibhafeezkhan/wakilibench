# Data Model

## Tables

### users
- id
- email
- full_name
- role
- access_tier
- created_at

### topics
- id
- slug
- title
- description
- is_active
- created_at

### scenarios
- id
- topic_id
- title
- fact_pattern
- instructions
- difficulty
- expected_issues
- source_notes
- is_active
- created_at

### sessions
- id
- user_id
- topic_id
- scenario_id
- status
- final_score
- created_at
- updated_at

### messages
- id
- session_id
- role
- content
- message_type
- created_at

Roles:
- user
- tutor
- evaluator
- system

Message types:
- answer
- socratic_question
- revision
- evaluation
- note

### rubric_scores
- id
- session_id
- issue_spotting
- legal_reasoning
- use_of_authority
- counterarguments
- writing_clarity
- ethics_ai_safety
- overall_score
- strengths
- weaknesses
- next_action
- created_at

### usage_events
- id
- user_id
- event_type
- metadata_json
- created_at

### access_passes
- id
- user_id
- plan_type
- credits_remaining
- cohort_name
- starts_at
- expires_at
- created_at

## Access Tiers
- free
- pilot
- practice_pass
- cohort
- reviewer
- admin

## V1 Seed Topics
Start with three topics only:
1. Contract Law
2. Constitutional Law
3. Legal Writing and AI Safety

## V1 Seed Scenarios
Create five scenarios per topic. Total V1 scenarios: 15.
