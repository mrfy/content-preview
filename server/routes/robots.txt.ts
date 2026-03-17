export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public as Record<string, string>).siteUrl || 'https://contentpreviewtools.com'

  setResponseHeader(event, 'content-type', 'text/plain')

  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Sitemap: ${siteUrl}/sitemap.xml`
})
