export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public as Record<string, string>).siteUrl || 'https://contentpreviewtools.com'

  const pages = [
    '/',
    '/linkedin-preview',
    '/email-preview',
    '/linkedin-post-preview',
    '/email-html-preview',
    '/twitter-preview',
    '/instagram-preview',
    '/facebook-preview',
    '/privacy-policy',
    '/terms',
  ]

  const today = new Date().toISOString().split('T')[0]

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n')

  setResponseHeader(event, 'content-type', 'application/xml')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
})
