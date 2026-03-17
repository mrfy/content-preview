import { verifyAdmin } from '../../utils/verifyAdmin'

export default defineEventHandler((event) => {
  return { authenticated: verifyAdmin(event) }
})
