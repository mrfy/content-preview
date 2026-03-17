import { getDb } from '../../db/client'

export default defineEventHandler(async (event) => {
  rateLimit(event, { key: 'stats-track', max: 30 })

  const body = await readBody(event)

  const toolType = body?.tool_type
  const action = body?.action

  if (!['linkedin', 'email'].includes(toolType)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid tool_type' })
  }
  if (!['preview', 'export'].includes(action)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid action' })
  }

  // sanitize optional diagnostics
  const sessionId = typeof body.session_id === 'string' ? body.session_id.slice(0, 36) : null
  const pagePath = typeof body.page_path === 'string' ? body.page_path.slice(0, 255) : null
  const referrer = typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : null
  const viewportWidth = Number.isFinite(body.viewport_width) ? Math.min(Math.max(body.viewport_width, 0), 9999) : null
  const viewportHeight = Number.isFinite(body.viewport_height) ? Math.min(Math.max(body.viewport_height, 0), 9999) : null
  const uaHash = typeof body.ua_hash === 'string' ? body.ua_hash.slice(0, 16) : null
  const durationMs = Number.isFinite(body.duration_ms) ? Math.max(body.duration_ms, 0) : null
  const contentLength = Number.isFinite(body.content_length) ? Math.max(body.content_length, 0) : null
  const hasImage = typeof body.has_image === 'boolean' ? body.has_image : null
  const templateName = typeof body.template_name === 'string' ? body.template_name.slice(0, 50) : null
  const darkMode = typeof body.dark_mode === 'boolean' ? body.dark_mode : null
  const viewportMode = typeof body.viewport_mode === 'string' ? body.viewport_mode.slice(0, 10) : null

  const db = getDb()
  await db.query(
    `INSERT INTO preview_events
      (tool_type, action, session_id, page_path, referrer, viewport_width, viewport_height, ua_hash, duration_ms, content_length, has_image, template_name, dark_mode, viewport_mode)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
    [toolType, action, sessionId, pagePath, referrer, viewportWidth, viewportHeight, uaHash, durationMs, contentLength, hasImage, templateName, darkMode, viewportMode],
  )

  return { ok: true }
})
