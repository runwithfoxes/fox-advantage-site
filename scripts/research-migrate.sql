-- Research Interview Tool — database migration
-- Run this in the Vercel Postgres dashboard SQL console

CREATE TABLE IF NOT EXISTS research_respondents (
  id          SERIAL PRIMARY KEY,
  ref_id      TEXT NOT NULL UNIQUE,
  email       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_respondents_ref ON research_respondents (ref_id);

CREATE TABLE IF NOT EXISTS research_interviews (
  id             SERIAL PRIMARY KEY,
  respondent_id  INTEGER NOT NULL REFERENCES research_respondents(id),
  wave           INTEGER NOT NULL DEFAULT 1,
  transcript     JSONB,
  quant_data     JSONB,
  ai_summary     TEXT,
  started_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at   TIMESTAMPTZ,
  CONSTRAINT uq_respondent_wave UNIQUE (respondent_id, wave)
);

CREATE INDEX IF NOT EXISTS idx_interviews_respondent
  ON research_interviews (respondent_id);
