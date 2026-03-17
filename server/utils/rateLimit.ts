import type { H3Event } from 'h3'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

export function rateLimit(event: H3Event, opts: { key: string; max: number; windowMs?: number }) {
  const windowMs = opts.windowMs ?? 60_000
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const storeKey = `${opts.key}:${ip}`
  const now = Date.now()

  let entry = store.get(storeKey)
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs }
    store.set(storeKey, entry)
  }

  entry.count++

  if (entry.count > opts.max) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.',
    })
  }
}
