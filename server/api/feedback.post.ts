import { getDb } from '../db/client'

export default defineEventHandler(async (event) => {
  rateLimit(event, { key: 'feedback', max: 10 })

  const body = await readBody(event)

  const validTypes = ['bug', 'suggestion', 'praise', 'other']
  const type = body?.type
  if (!type || !validTypes.includes(type)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid type. Must be one of: bug, suggestion, praise, other' })
  }

  const rating = Number(body?.rating)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw createError({ statusCode: 400, statusMessage: 'Rating must be an integer between 1 and 5' })
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  if (!message) {
    throw createError({ statusCode: 400, statusMessage: 'Message is required' })
  }
  if (message.length > 2000) {
    throw createError({ statusCode: 400, statusMessage: 'Message must be at most 2000 characters' })
  }

  const pagePath = typeof body?.page_path === 'string' ? body.page_path.slice(0, 255) : null

  const db = getDb()
  await db.query(
    `INSERT INTO feedback (type, rating, message, page_path) VALUES ($1, $2, $3, $4)`,
    [type, rating, message, pagePath],
  )

  return { ok: true }
})
