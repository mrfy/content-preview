import { getDb } from '../../db/client'

export default defineEventHandler(async (event) => {
  if (!verifyAdmin(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = getDb()
  const result = await db.query(
    `SELECT id, type, rating, message, page_path, created_at
     FROM feedback
     ORDER BY created_at DESC
     LIMIT 50`,
  )

  return result.rows
})
