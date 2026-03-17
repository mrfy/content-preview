import { Pool } from 'pg'

let pool: Pool | null = null

export function getDb(): Pool {
  if (!pool) {
    const config = useRuntimeConfig()
    pool = new Pool({
      connectionString: config.databaseUrl,
    })
  }
  return pool
}
