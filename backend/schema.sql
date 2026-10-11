CREATE TABLE IF NOT EXISTS signatures (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  drawing TEXT NOT NULL,
  ink TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  delete_hash TEXT NOT NULL,
  rate_key TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS signatures_created ON signatures(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS signatures_rate ON signatures(rate_key, created_at);
