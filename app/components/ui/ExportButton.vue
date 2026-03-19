<template>
  <ClientOnly>
    <div>
      <button
        :disabled="isExporting"
        class="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          isExporting
            ? 'bg-slate-100 text-slate-400'
            : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]'
        ]"
        @click="handleExport"
      >
        <!-- Spinner -->
        <svg v-if="isExporting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <!-- Download icon -->
        <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <span class="hidden sm:inline">{{ isExporting ? 'Exporting...' : 'Export as PNG' }}</span>
      </button>
      <p v-if="exportError" class="mt-2 text-xs text-red-500 font-medium">
        {{ exportError }}
      </p>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  targetId: string
  filename?: string
}>(), {
  filename: 'preview.png',
})

const emit = defineEmits<{
  exported: []
}>()

const { isExporting, exportError, exportAsImage } = useScreenshotExport()

async function handleExport() {
  await exportAsImage(props.targetId, props.filename)
  if (!exportError.value) {
    emit('exported')
  }
}
</script>
