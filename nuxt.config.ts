export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    adminUser: process.env.ADMIN_USER || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    adminSecret: process.env.ADMIN_SECRET || 'change-me-in-production',
    public: {
      siteUrl: process.env.SITE_URL || 'https://contentpreviewtools.com',
    },
  },
})
