-- WakiliBench V1 Schema
-- Run in Supabase SQL Editor

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Scenarios
CREATE TABLE IF NOT EXISTS scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  fact_pattern TEXT NOT NULL,
  instructions TEXT NOT NULL,
  difficulty TEXT DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  expected_issues TEXT[],
  source_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id),
  scenario_id UUID REFERENCES scenarios(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'evaluated', 'abandoned')),
  final_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'tutor', 'evaluator', 'system')),
  content TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('answer', 'socratic_question', 'revision', 'evaluation', 'note')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Rubric Scores
CREATE TABLE IF NOT EXISTS rubric_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  issue_spotting INTEGER CHECK (issue_spotting >= 0 AND issue_spotting <= 20),
  legal_reasoning INTEGER CHECK (legal_reasoning >= 0 AND legal_reasoning <= 25),
  use_of_authority INTEGER CHECK (use_of_authority >= 0 AND use_of_authority <= 20),
  counterarguments INTEGER CHECK (counterarguments >= 0 AND counterarguments <= 15),
  writing_clarity INTEGER CHECK (writing_clarity >= 0 AND writing_clarity <= 10),
  ethics_ai_safety INTEGER CHECK (ethics_ai_safety >= 0 AND ethics_ai_safety <= 10),
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  strengths TEXT[],
  weaknesses TEXT[],
  next_action TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Usage Events
CREATE TABLE IF NOT EXISTS usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Access Passes
CREATE TABLE IF NOT EXISTS access_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('free', 'pilot', 'practice_pass', 'cohort', 'reviewer', 'admin')),
  credits_remaining INTEGER DEFAULT 10,
  cohort_name TEXT,
  starts_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubric_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_passes ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sessions
CREATE POLICY "Users read own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see messages in their own sessions
CREATE POLICY "Users read own messages" ON messages
  FOR SELECT USING (
    session_id IN (SELECT id FROM sessions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users insert own messages" ON messages
  FOR INSERT WITH CHECK (
    session_id IN (SELECT id FROM sessions WHERE user_id = auth.uid())
  );

-- Users can see their own scores
CREATE POLICY "Users read own scores" ON rubric_scores
  FOR SELECT USING (
    session_id IN (SELECT id FROM sessions WHERE user_id = auth.uid())
  );

-- Topics and scenarios are public read
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read topics" ON topics FOR SELECT USING (true);
CREATE POLICY "Public read scenarios" ON scenarios FOR SELECT USING (true);
