<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Page header -->
    <div class="mb-8">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <img :src="'/LinkedIn_icon.svg'" alt="LinkedIn" class="w-7 h-7" />
          LinkedIn Preview
        </h1>
        <div class="flex items-center gap-2 flex-shrink-0">
        <button
          v-if="postText"
          class="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"
          :class="copyFeedback ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''"
          @click="copyText"
        >
          <svg v-if="!copyFeedback" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span class="hidden sm:inline">{{ copyFeedback ? 'Copied!' : 'Copy text' }}</span>
        </button>
        <UiExportButton target-id="linkedin-preview-container" filename="linkedin-preview.png" @exported="onExport" />
        </div>
      </div>
      <p class="text-sm text-slate-500 mt-1 hidden sm:block">Write your post and see how it looks in the feed</p>
    </div>

    <!-- Two-column layout -->
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- Editor column -->
      <div class="w-full lg:w-[45%] space-y-5">
        <UiPreviewContainer title="Editor">
          <div class="p-5 space-y-5">
            <EditorsLinkedInEditor />
            <UiImageUploader
              @upload="onImageUpload"
              @remove="clearImage"
            />
          </div>
        </UiPreviewContainer>
      </div>

      <!-- Preview column -->
      <div class="w-full lg:w-[55%]">
        <UiPreviewContainer title="Preview">
          <div class="p-5">
            <PreviewsLinkedInPreview />
          </div>
        </UiPreviewContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { postText, imageUrl, isDarkMode, setImage, clearImage } = useLinkedInPreview()
const { track } = useTrackPreview()

const copyFeedback = ref(false)

async function copyText() {
  try {
    await navigator.clipboard.writeText(postText.value)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = postText.value
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copyFeedback.value = true
  setTimeout(() => { copyFeedback.value = false }, 2000)
}

const tracked = ref(false)
watch(postText, (val) => {
  if (val.length > 0 && !tracked.value) {
    tracked.value = true
    track('linkedin', 'preview', {
      content_length: val.length,
      has_image: !!imageUrl.value,
      dark_mode: isDarkMode.value,
    })
  }
})

function onImageUpload(file: File) {
  setImage(file)
}

function onExport() {
  track('linkedin', 'export', {
    content_length: postText.value.length,
    has_image: !!imageUrl.value,
    dark_mode: isDarkMode.value,
  })
}

useHead({
  title: 'Free LinkedIn Post Preview - See How Your Post Looks',
})
useSeoMeta({
  description: 'Free LinkedIn post preview tool. Write your post, add hashtags and images, see a real-time preview. Export to PNG. No signup.',
  ogTitle: 'Free LinkedIn Post Preview Tool',
  ogDescription: 'Preview your LinkedIn post before publishing. Free, real-time, no signup.',
})
</script>
