<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Page header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <img src="/Email_icon.svg" alt="Email" class="w-7 h-7" />
          Email Preview
        </h1>
        <p class="text-sm text-slate-400 mt-1">Paste HTML and see how your email renders</p>
      </div>
      <UiExportButton target-id="email-preview-container" filename="email-preview.png" @exported="onExport" />
    </div>

    <!-- Two-column layout -->
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- Editor column -->
      <div class="w-full lg:w-[45%]">
        <UiPreviewContainer title="HTML Editor">
          <div class="p-5">
            <EditorsEmailHtmlEditor />
          </div>
        </UiPreviewContainer>
      </div>

      <!-- Preview column -->
      <div class="w-full lg:w-[55%]">
        <UiPreviewContainer title="Preview">
          <PreviewsEmailPreview />
        </UiPreviewContainer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { htmlContent, templates } = useEmailPreview()
const { track } = useTrackPreview()

const tracked = ref(false)
watch(htmlContent, (val) => {
  if (val.length > 0 && !tracked.value) {
    tracked.value = true
    const matchedTemplate = templates.find(t => t.html === val)
    track('email', 'preview', {
      content_length: val.length,
      template_name: matchedTemplate?.name || null,
    })
  }
})

function onExport() {
  const matchedTemplate = templates.find(t => t.html === htmlContent.value)
  track('email', 'export', {
    content_length: htmlContent.value.length,
    template_name: matchedTemplate?.name || null,
  })
}

useHead({
  title: 'Free Email HTML Preview - Render Your Email Instantly',
})
useSeoMeta({
  description: 'Free HTML email preview tool. Paste your code, see how it renders. 5 templates, responsive toggle, XSS-safe. No signup.',
  ogTitle: 'Free Email HTML Preview Tool',
  ogDescription: 'Paste your HTML email and see how it renders. Free, instant, no signup.',
})
</script>
