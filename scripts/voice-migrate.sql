-- Voice interviewer tables
-- Run against Vercel Postgres (Neon)

CREATE TABLE IF NOT EXISTS voice_respondents (
  id SERIAL PRIMARY KEY,
  ref_id TEXT UNIQUE NOT NULL,
  phone TEXT,
  email TEXT,
  name TEXT,
  brief_id TEXT NOT NULL DEFAULT 'ai-research',
  knowledge JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS voice_transcripts (
  id SERIAL PRIMARY KEY,
  respondent_id INTEGER NOT NULL REFERENCES voice_respondents(id),
  wave INTEGER NOT NULL DEFAULT 1,
  brief_id TEXT NOT NULL DEFAULT 'ai-research',
  full_transcript JSONB,
  structured_data JSONB,
  duration_seconds INTEGER,
  elevenlabs_conversation_id TEXT,
  ai_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS voice_extracted_responses (
  id SERIAL PRIMARY KEY,
  transcript_id INTEGER NOT NULL REFERENCES voice_transcripts(id),
  field_name TEXT NOT NULL,
  field_value TEXT,
  raw_response TEXT
);

-- Call attempt tracking (dial funnel: attempted -> connected -> completed / failed)
CREATE TABLE IF NOT EXISTS voice_call_attempts (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  status TEXT NOT NULL, -- 'connected', 'failed', 'error', 'voicemail'
  conversation_id TEXT,
  failure_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_voice_respondents_ref_id ON voice_respondents(ref_id);
CREATE INDEX IF NOT EXISTS idx_voice_respondents_phone ON voice_respondents(phone);
CREATE INDEX IF NOT EXISTS idx_voice_transcripts_respondent ON voice_transcripts(respondent_id);
CREATE INDEX IF NOT EXISTS idx_voice_transcripts_conversation ON voice_transcripts(elevenlabs_conversation_id);
CREATE INDEX IF NOT EXISTS idx_voice_extracted_transcript ON voice_extracted_responses(transcript_id);
CREATE INDEX IF NOT EXISTS idx_voice_call_attempts_phone ON voice_call_attempts(phone);
CREATE INDEX IF NOT EXISTS idx_voice_call_attempts_status ON voice_call_attempts(status);
