<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Page header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <img src="/LinkedIn_icon.svg" alt="LinkedIn" class="w-7 h-7" />
          LinkedIn Preview
        </h1>
        <p class="text-sm text-slate-400 mt-1">Write your post and see how it looks in the feed</p>
      </div>
      <UiExportButton target-id="linkedin-preview-container" filename="linkedin-preview.png" @exported="onExport" />
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
