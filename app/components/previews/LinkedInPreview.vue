<template>
  <div
    id="linkedin-preview-container"
    class="rounded-lg max-w-[552px] mx-auto transition-colors duration-300"
    :class="isDarkMode ? 'bg-[#1b1f23]' : 'bg-white'"
    style="font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;"
  >
    <!-- Post header -->
    <div class="p-4 pb-0">
      <div class="flex items-start gap-2.5">
        <div
          class="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
          :class="profileAvatarUrl ? '' : (isDarkMode ? 'bg-gradient-to-br from-slate-600 to-slate-700' : 'bg-gradient-to-br from-slate-200 to-slate-300')"
        >
          <img v-if="profileAvatarUrl" :src="profileAvatarUrl" alt="Avatar" class="w-full h-full object-cover" />
          <svg v-else class="w-6 h-6" :class="isDarkMode ? 'text-slate-400' : 'text-slate-400'" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold leading-tight" :class="isDarkMode ? 'text-[rgba(255,255,255,0.9)]' : 'text-[rgba(0,0,0,0.9)]'">
            {{ profileName || 'Your Name' }}
          </p>
          <p class="text-xs leading-tight mt-0.5 truncate" :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'">
            {{ profileHeadline || 'Your Headline' }}
          </p>
          <p class="text-xs leading-tight mt-0.5 flex items-center gap-1" :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'">
            1h &middot;
            <!-- Globe (public) -->
            <svg v-if="visibility === 'public'" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011.1-3.14l.73.73A.5.5 0 005 6.08V7.5a.5.5 0 00.5.5h1a.5.5 0 01.5.5v.5a1.5 1.5 0 001.5 1.5H9a.5.5 0 01.5.5v1.38A5 5 0 013 8zm8.89 3.14A5 5 0 0013 8a5 5 0 00-4.5-4.97V4.5A1.5 1.5 0 0010 6h.5a.5.5 0 01.5.5V8a.5.5 0 00.5.5h.89l.5.86z"/>
            </svg>
            <!-- People (connections) -->
            <svg v-else-if="visibility === 'connections'" class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 8a2 2 0 100-4 2 2 0 000 4zm4-2a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 9c-2.67 0-5 1.34-5 3v1h10v-1c0-1.66-2.33-3-5-3zm4.5.5c-0.5 0-1 .1-1.42.28C10.28 10.6 11 11.5 11 12.5V13h4v-1c0-1.38-2-2.5-4.5-2.5z"/>
            </svg>
            <!-- Group -->
            <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 7a2 2 0 100-4 2 2 0 000 4zM1 12c0-1.38 1.56-2.5 3.5-2.5.36 0 .7.04 1.02.11C4.56 10.24 4 11.06 4 12v1H1v-1zm14 0c0-1.38-1.56-2.5-3.5-2.5-.36 0-.7.04-1.02.11.96.63 1.52 1.45 1.52 2.39v1H15v-1zM8 8c-2.67 0-5 1.34-5 3v1h10v-1c0-1.66-2.33-3-5-3z"/>
            </svg>
          </p>
        </div>
      </div>
    </div>

    <!-- Post body -->
    <div class="px-4 pt-3 pb-1">
      <div
        v-if="formattedSegments.length"
        class="text-sm leading-[1.42] whitespace-pre-wrap break-words"
        :class="isDarkMode ? 'text-[rgba(255,255,255,0.9)]' : 'text-[rgba(0,0,0,0.9)]'"
      >
        <template v-for="(segment, i) in formattedSegments" :key="i">
          <span
            v-if="segment.type === 'hashtag'"
            class="font-semibold cursor-pointer hover:underline"
            :style="{ color: isDarkMode ? '#70b5f9' : '#0a66c2' }"
          >{{ segment.value }}</span>
          <a
            v-else-if="segment.type === 'url'"
            :href="segment.value"
            target="_blank"
            rel="noopener"
            class="underline cursor-pointer"
            :style="{ color: isDarkMode ? '#70b5f9' : '#0a66c2' }"
          >{{ segment.value }}</a>
          <span v-else>{{ segment.value }}</span>
        </template>
        <span v-if="shouldTruncate" class="text-sm" :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'">...</span>
        <button
          v-if="shouldTruncate"
          class="text-sm font-medium ml-1 hover:underline"
          :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'"
          @click="toggleExpand"
        >see more</button>
        <button
          v-if="isExpanded && postText.length > 250"
          class="text-sm font-medium ml-1 hover:underline block mt-1"
          :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'"
          @click="toggleExpand"
        >...see less</button>
      </div>
      <div v-else class="text-sm italic py-4 text-center" :class="isDarkMode ? 'text-slate-500' : 'text-slate-300'">
        Start typing to see your post preview...
      </div>
    </div>

    <!-- Image -->
    <div v-if="imageUrl" class="mt-1">
      <img :src="imageUrl" alt="Post image" class="w-full object-cover" />
    </div>

    <!-- Engagement stats -->
    <div v-if="formattedSegments.length" class="px-4 py-2">
      <div class="flex items-center gap-1.5 text-xs" :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)]' : 'text-[rgba(0,0,0,0.6)]'">
        <div class="flex -space-x-0.5">
          <span class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/></svg>
          </span>
          <span class="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center">
            <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </span>
        </div>
        <span>42</span>
      </div>
    </div>

    <!-- Separator -->
    <div class="mx-4">
      <div class="h-px" :class="isDarkMode ? 'bg-[rgba(255,255,255,0.08)]' : 'bg-[rgba(0,0,0,0.08)]'" />
    </div>

    <!-- Action bar -->
    <div class="flex items-center justify-between px-2 py-1">
      <button
        v-for="action in actions"
        :key="action.label"
        class="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-md text-xs font-semibold transition-colors"
        :class="isDarkMode ? 'text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)]' : 'text-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.04)]'"
      >
        <span v-html="action.icon" class="w-5 h-5 flex items-center justify-center" />
        <span class="hidden sm:inline">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { imageUrl, profileName, profileHeadline, profileAvatarUrl, isDarkMode, visibility, isExpanded, shouldTruncate, formattedSegments, postText, toggleExpand } = useLinkedInPreview()

const actions = [
  {
    label: 'Like',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.75a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 5.25c0 .372-.052.734-.144 1.08l-.571 2.42h4.042a2.25 2.25 0 011.985 3.3l-2.004 3.607a5.25 5.25 0 01-4.588 2.718H6.632z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 10.5H5.25a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25z" /></svg>',
  },
  {
    label: 'Comment',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg>',
  },
  {
    label: 'Repost',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>',
  },
  {
    label: 'Send',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>',
  },
]
</script>
