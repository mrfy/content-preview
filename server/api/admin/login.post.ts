import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  rateLimit(event, { key: 'admin-login', max: 5 })

  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!config.adminPassword) {
    throw createError({ statusCode: 500, statusMessage: 'Admin password not configured' })
  }

  if (body?.user !== config.adminUser || body?.password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const hmac = crypto.createHmac('sha256', config.adminSecret).update(token).digest('hex')

  setCookie(event, 'admin_session', `${token}.${hmac}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })

  return { ok: true }
})
