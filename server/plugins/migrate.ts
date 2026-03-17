import { runMigrations } from '../db/migrate'

export default defineNitroPlugin(async () => {
  try {
    await runMigrations()
    console.log('[db] Migrations complete')
  } catch (err) {
    console.error('[db] Migration failed:', err)
  }
})
