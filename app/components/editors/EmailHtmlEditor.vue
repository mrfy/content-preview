<template>
  <div class="space-y-3">
    <!-- Template gallery -->
    <div>
      <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-2">Templates</h4>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="(tpl, i) in templates"
          :key="tpl.name"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          :class="activeTemplate === i
            ? 'bg-indigo-100 text-indigo-700'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          :title="tpl.description"
          @click="selectTemplate(i)"
        >
          {{ tpl.name }}
        </button>
        <button
          v-if="htmlContent"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-400 transition-colors"
          @click="clearAll"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- HTML editor -->
    <textarea
      v-model="htmlContent"
      placeholder="Paste your HTML email code here..."
      spellcheck="false"
      class="w-full min-h-[350px] p-4 rounded-xl border border-slate-200 bg-slate-50/50 font-mono text-[13px] text-slate-700 leading-relaxed placeholder:text-slate-300 resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 focus:bg-white"
    />
  </div>
</template>

<script setup lang="ts">
const { htmlContent, templates, loadTemplate, clear } = useEmailPreview()

const activeTemplate = ref<number | null>(null)

function selectTemplate(i: number) {
  activeTemplate.value = i
  loadTemplate(i)
}

function clearAll() {
  activeTemplate.value = null
  clear()
}

watch(htmlContent, (val) => {
  if (!val) activeTemplate.value = null
})
</script>
