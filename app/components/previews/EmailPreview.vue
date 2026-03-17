<template>
  <div id="email-preview-container" class="bg-slate-100 rounded-xl p-6 sm:p-8">
    <!-- Viewport toggle -->
    <div class="flex items-center justify-center gap-1 mb-4">
      <button
        v-for="vp in viewports"
        :key="vp.name"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
        :class="activeViewport === vp.name ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
        @click="activeViewport = vp.name"
      >
        <span class="flex items-center gap-1.5">
          <svg v-if="vp.name === 'desktop'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
          </svg>
          {{ vp.label }}
        </span>
      </button>
    </div>

    <!-- Email client chrome -->
    <div class="mx-auto transition-all duration-300" :style="{ maxWidth: currentWidth + 'px' }">
      <!-- Toolbar -->
      <div class="flex items-center gap-1.5 mb-3 px-1">
        <div class="w-2.5 h-2.5 rounded-full bg-red-300" />
        <div class="w-2.5 h-2.5 rounded-full bg-amber-300" />
        <div class="w-2.5 h-2.5 rounded-full bg-green-300" />
        <span class="ml-2 text-[10px] text-slate-400 font-medium">{{ currentWidth }}px</span>
      </div>

      <!-- Email body -->
      <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div v-if="sanitizedHtml" class="email-frame-wrap">
          <iframe
            ref="iframeRef"
            :srcdoc="sanitizedHtml"
            sandbox="allow-same-origin"
            class="w-full border-0 block"
            :style="{ height: iframeHeight + 'px' }"
            @load="adjustHeight"
          />
        </div>
        <div v-else class="py-16 text-center">
          <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <svg class="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p class="text-sm text-slate-300">Paste HTML to preview your email</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { sanitizedHtml } = useEmailPreview()

const viewports = [
  { name: 'desktop', label: 'Desktop', width: 600 },
  { name: 'mobile', label: 'Mobile', width: 375 },
]

const activeViewport = ref('desktop')
const currentWidth = computed(() => viewports.find(v => v.name === activeViewport.value)!.width)

const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeHeight = ref(400)

function adjustHeight() {
  const iframe = iframeRef.value
  if (!iframe?.contentDocument?.body) return
  const height = iframe.contentDocument.body.scrollHeight
  iframeHeight.value = Math.max(200, Math.min(height + 20, 1200))
}

watch(sanitizedHtml, () => {
  nextTick(() => setTimeout(adjustHeight, 100))
})

watch(activeViewport, () => {
  nextTick(() => setTimeout(adjustHeight, 300))
})
</script>
