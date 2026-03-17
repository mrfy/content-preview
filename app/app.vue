<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

useHead({
  titleTemplate: (title) => title ? title : 'Content Preview Tools - Free LinkedIn & Email Preview',
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'canonical', href: computed(() => `${siteUrl}${route.path}`) },
  ],
  meta: [
    { property: 'og:image', content: `${siteUrl}/favicon.svg` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: computed(() => `${siteUrl}${route.path}`) },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary' },
  ],
})
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
