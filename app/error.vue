<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 px-4">
    <div class="text-center max-w-md">
      <p class="text-6xl font-bold text-indigo-600 mb-4">{{ error?.statusCode || 500 }}</p>
      <h1 class="text-2xl font-bold text-slate-900 mb-2">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-sm text-slate-500 mb-8">
        {{ error?.statusCode === 404
          ? 'The page you are looking for does not exist or has been moved.'
          : 'An unexpected error occurred. Please try again later.'
        }}
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        @click="clearError({ redirect: '/' })"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
  }
}>()

useHead({
  title: props.error?.statusCode === 404
    ? 'Page Not Found - Content Preview Tools'
    : 'Error - Content Preview Tools',
})
</script>
