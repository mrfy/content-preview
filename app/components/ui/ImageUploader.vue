<template>
  <div>
    <!-- Upload zone -->
    <div
      v-if="!previewUrl"
      class="relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer overflow-hidden"
      :class="[
        isDragging
          ? 'border-indigo-400 bg-indigo-50 scale-[0.99]'
          : 'border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100'
      ]"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="fileInput?.click()"
    >
      <div class="flex flex-col items-center justify-center py-8 px-4">
        <div
          class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3 transition-transform duration-300"
          :class="{ 'scale-110 bg-indigo-100': isDragging }"
        >
          <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-slate-600">
          Drop image here or <span class="text-indigo-500">browse</span>
        </p>
        <p class="text-xs text-slate-500 mt-1">JPG, PNG, GIF, WebP - max 5 MB</p>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      >
    </div>

    <!-- Error -->
    <p v-if="error" class="mt-2 text-xs text-red-500 font-medium flex items-center gap-1">
      <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </p>

    <!-- Thumbnail preview -->
    <div v-if="previewUrl" class="relative group/thumb mt-0">
      <div class="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
        <img :src="previewUrl" alt="Uploaded image" class="w-full h-40 object-cover" />
      </div>
      <button
        class="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-all duration-200 hover:bg-red-500 hover:scale-105"
        @click="onRemove"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  upload: [file: File]
  remove: []
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref('')
const previewUrl = ref<string | null>(null)

function validate(file: File): boolean {
  error.value = ''
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'File too large. Maximum size is 5 MB.'
    return false
  }
  if (!file.type.startsWith('image/')) {
    error.value = 'Invalid file type. Please upload an image.'
    return false
  }
  return true
}

function handleFile(file: File) {
  if (!validate(file)) return
  previewUrl.value = URL.createObjectURL(file)
  emit('upload', file)
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) handleFile(file)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) handleFile(file)
  input.value = ''
}

function onRemove() {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = null
  error.value = ''
  emit('remove')
}
</script>
