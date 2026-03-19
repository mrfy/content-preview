<template>
  <div class="space-y-5">
    <!-- Profile section -->
    <div class="space-y-3">
      <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Profile</h4>
      <div class="flex items-center gap-3">
        <!-- Avatar upload -->
        <div
          class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-slate-200 hover:border-indigo-300 transition-colors"
          :class="profileAvatarUrl ? 'border-solid border-transparent' : ''"
          @click="avatarInput?.click()"
        >
          <img v-if="profileAvatarUrl" :src="profileAvatarUrl" alt="Avatar" class="w-full h-full object-cover" />
          <svg v-else class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
          </svg>
        </div>
        <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
        <div class="flex-1 space-y-1.5">
          <input
            v-model="profileName"
            placeholder="Your Name"
            class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-300"
          />
          <input
            v-model="profileHeadline"
            placeholder="Your Headline"
            class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-300"
          />
        </div>
      </div>
    </div>

    <!-- Visibility & Dark mode -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-slate-500">Visibility</span>
        <select
          v-model="visibility"
          class="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-300"
        >
          <option value="public">Public</option>
          <option value="connections">Connections</option>
          <option value="group">Group</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-slate-500">Dark mode</span>
        <button
          aria-label="Toggle dark mode"
          class="relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none"
          :class="isDarkMode ? 'bg-indigo-500' : 'bg-slate-200'"
          @click="toggleDarkMode()"
        >
          <span
            class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
            :class="isDarkMode ? 'translate-x-4' : 'translate-x-0'"
          />
        </button>
      </div>
    </div>

    <!-- Post text -->
    <div>
      <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-2">Post</h4>
      <textarea
        v-model="postText"
        placeholder="What do you want to talk about?"
        class="w-full min-h-[180px] p-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 leading-relaxed placeholder:text-slate-300 resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
      />
      <div class="flex items-center justify-between px-1 mt-1">
        <div class="flex items-center gap-2">
          <button
            v-if="postText && !showUndo"
            class="text-xs text-slate-400 hover:text-red-400 transition-colors"
            @click="clearWithUndo"
          >
            Clear text
          </button>
          <button
            v-if="showUndo"
            class="text-xs text-indigo-500 font-semibold hover:text-indigo-700 transition-colors"
            @click="undoClear"
          >
            Undo
          </button>
        </div>
        <span v-if="!postText && !showUndo" />
        <span
          class="text-xs font-medium tabular-nums transition-colors duration-200"
          :class="charCountClass"
        >
          {{ postText.length.toLocaleString() }} / 3,000
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { postText, profileName, profileHeadline, profileAvatarUrl, isDarkMode, visibility, setAvatar, toggleDarkMode, clear } = useLinkedInPreview()

const avatarInput = ref<HTMLInputElement | null>(null)
const savedText = ref('')
const showUndo = ref(false)
let undoTimer: ReturnType<typeof setTimeout> | null = null

function clearWithUndo() {
  savedText.value = postText.value
  clear()
  showUndo.value = true
  if (undoTimer) clearTimeout(undoTimer)
  undoTimer = setTimeout(() => { showUndo.value = false }, 3000)
}

function undoClear() {
  postText.value = savedText.value
  showUndo.value = false
  if (undoTimer) clearTimeout(undoTimer)
}

function onAvatarChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) setAvatar(file)
  input.value = ''
}

const charCountClass = computed(() => {
  const len = postText.value.length
  if (len > 3000) return 'text-red-500'
  if (len > 2800) return 'text-amber-500'
  return 'text-slate-400'
})
</script>
