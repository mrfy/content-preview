<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-600 mb-6">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      Coming Soon
    </div>

    <div class="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </div>

    <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
      X (Twitter) Post Preview
    </h1>
    <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed mb-8">
      Preview how your tweets will look before posting. See character counts, media previews, and thread layouts - all in your browser.
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
useHead({ title: 'X/Twitter Post Preview - Coming Soon' })
useSeoMeta({
  description: 'X (Twitter) post preview tool coming soon. Preview your tweets before posting.',
  ogTitle: 'X/Twitter Post Preview - Coming Soon',
  ogDescription: 'Preview your tweets before posting. Coming soon to Content Preview Tools.',
})
</script>
