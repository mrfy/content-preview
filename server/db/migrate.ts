import { getDb } from './client'

export async function runMigrations() {
  const db = getDb()

  await db.query(`
    CREATE TABLE IF NOT EXISTS preview_events (
      id SERIAL PRIMARY KEY,
      tool_type VARCHAR(20) NOT NULL CHECK (tool_type IN ('linkedin', 'email')),
      action VARCHAR(20) NOT NULL CHECK (action IN ('preview', 'export')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_preview_events_created_at ON preview_events (created_at)
  `)
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_preview_events_tool_type ON preview_events (tool_type)
  `)

  // v2: diagnostics columns
  const cols = [
    { name: 'session_id', type: 'VARCHAR(36)' },
    { name: 'page_path', type: 'VARCHAR(255)' },
    { name: 'referrer', type: 'VARCHAR(500)' },
    { name: 'viewport_width', type: 'SMALLINT' },
    { name: 'viewport_height', type: 'SMALLINT' },
    { name: 'ua_hash', type: 'VARCHAR(16)' },
    { name: 'duration_ms', type: 'INTEGER' },
    { name: 'content_length', type: 'INTEGER' },
    { name: 'has_image', type: 'BOOLEAN' },
    { name: 'template_name', type: 'VARCHAR(50)' },
    { name: 'dark_mode', type: 'BOOLEAN' },
    { name: 'viewport_mode', type: 'VARCHAR(10)' },
  ]

  for (const col of cols) {
    await db.query(`
      DO $$ BEGIN
        ALTER TABLE preview_events ADD COLUMN ${col.name} ${col.type};
      EXCEPTION WHEN duplicate_column THEN NULL;
      END $$
    `)
  }

  // v3: feedback table
  await db.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      type VARCHAR(20) NOT NULL CHECK (type IN ('bug', 'suggestion', 'praise', 'other')),
      rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      message TEXT NOT NULL CHECK (char_length(message) <= 2000),
      page_path VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at)
  `)
}
