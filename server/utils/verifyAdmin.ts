import crypto from 'node:crypto'
import type { H3Event } from 'h3'

export function verifyAdmin(event: H3Event): boolean {
  const cookie = getCookie(event, 'admin_session')
  if (!cookie) return false

  const parts = cookie.split('.')
  if (parts.length !== 2) return false

  const [token, hmac] = parts
  const config = useRuntimeConfig()
  const expected = crypto.createHmac('sha256', config.adminSecret).update(token).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expected, 'hex'))
}
