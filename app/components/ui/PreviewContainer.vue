<template>
  <div class="preview-container group">
    <div class="flex items-center justify-between mb-4 px-1">
      <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {{ title }}
      </h3>
      <div class="h-px flex-1 ml-4 bg-gradient-to-r from-slate-200 to-transparent" />
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-shadow duration-500 group-hover:shadow-md group-hover:shadow-indigo-100/50">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
