# V1 Scope Lock

## V1 Goal
Build a working pilot, not a complete legal AI platform.

## V1 User Flow
1. User lands on app.
2. User signs in.
3. User chooses a topic.
4. User opens a scenario.
5. User writes an answer.
6. AI tutor asks Socratic follow-up.
7. User revises or responds.
8. AI evaluates the answer using a rubric.
9. User sees score and feedback.
10. Session is saved to history.

## V1 Features
Must have:
- Landing/app entry screen
- Auth
- Topic list
- Scenario list
- Tutor session page
- Message history
- Submit answer
- AI Socratic response
- AI rubric evaluation
- Session history
- Basic admin seed data
- Basic usage limits

Should have:
- Manual pilot access control
- Export or copy feedback
- User progress summary
- Admin view of user sessions

Could have:
- Practice credits counter
- Certificate-ready completion record
- Reviewer notes

Will not have in V1:
- Payments
- Full RAG over large legal corpus
- PDF upload
- Multi-agent system
- Voice
- Mobile app
- Institutional dashboards
- Advanced analytics
- Automated certificates
- Moot court simulation
- Law firm document review
- Legal advice workflow
- Self-hosted AI models
- Complex AWS/Azure infrastructure

## V1 Demo Definition
A good V1 demo takes under 5 minutes:
- Log in
- Select Contract Law
- Answer a scenario
- Receive Socratic challenge
- Submit improved answer
- Receive rubric score
- Open saved history

## Hard Product Rule
WakiliBench must never present itself as giving legal advice. It trains legal reasoning and supports learning.
