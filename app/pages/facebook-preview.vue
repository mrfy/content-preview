<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-600 mb-6">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      Coming Soon
    </div>

    <div class="w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center mx-auto mb-6">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
      Facebook Post Preview
    </h1>
    <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
      Preview your Facebook posts before sharing. See how text, images, and link previews will appear in the News Feed.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
      <NuxtLink
        to="/"
        class="px-6 py-3 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Facebook Post Preview - Coming Soon' })
useSeoMeta({
  description: 'Facebook post preview tool coming soon. Preview your posts before sharing on Facebook.',
  ogTitle: 'Facebook Post Preview - Coming Soon',
  ogDescription: 'Preview your Facebook posts before sharing. Coming soon.',
})
</script>
