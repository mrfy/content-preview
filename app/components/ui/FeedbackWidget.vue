<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Toggle button -->
    <button
      v-if="!isOpen"
      class="w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
      aria-label="Open feedback form"
      @click="isOpen = true"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    </button>

    <!-- Feedback form -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
    >
      <div v-if="isOpen" class="w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-slate-800">Send Feedback</h3>
          <button
            class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close feedback form"
            @click="isOpen = false"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Success state -->
        <div v-if="submitted" class="text-center py-6">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-slate-800">Thank you!</p>
          <p class="text-xs text-slate-400 mt-1">Your feedback has been submitted.</p>
        </div>

        <!-- Form -->
        <form v-else class="space-y-4" @submit.prevent="submit">
          <!-- Type -->
          <div>
            <label class="text-xs font-medium text-slate-500 mb-1.5 block">Type</label>
            <div class="flex gap-1.5">
              <button
                v-for="t in types"
                :key="t.value"
                type="button"
                class="flex-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                :class="feedbackType === t.value
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'"
                @click="feedbackType = t.value"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

          <!-- Rating -->
          <div>
            <label class="text-xs font-medium text-slate-500 mb-1.5 block">Rating</label>
            <div class="flex gap-1">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="w-8 h-8 flex items-center justify-center transition-colors"
                :aria-label="`Rate ${star} star${star > 1 ? 's' : ''}`"
                @click="rating = star"
              >
                <svg
                  class="w-6 h-6"
                  :class="star <= rating ? 'text-amber-400' : 'text-slate-200'"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Message -->
          <div>
            <label class="text-xs font-medium text-slate-500 mb-1.5 block">Message</label>
            <textarea
              v-model="message"
              placeholder="Tell us what you think..."
              maxlength="2000"
              rows="3"
              class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
            />
            <p class="text-[10px] text-slate-400 text-right mt-0.5">{{ message.length }} / 2000</p>
          </div>

          <button
            type="submit"
            :disabled="!canSubmit || submitting"
            class="w-full py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Sending...' : 'Submit Feedback' }}
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const submitted = ref(false)
const submitting = ref(false)

const types = [
  { value: 'bug', label: 'Bug' },
  { value: 'suggestion', label: 'Idea' },
  { value: 'praise', label: 'Praise' },
  { value: 'other', label: 'Other' },
]

const feedbackType = ref('suggestion')
const rating = ref(0)
const message = ref('')

const route = useRoute()

const canSubmit = computed(() => {
  return feedbackType.value && rating.value >= 1 && message.value.trim().length > 0
})

async function submit() {
  if (!canSubmit.value || submitting.value) return
  submitting.value = true
  try {
    await $fetch('/api/feedback', {
      method: 'POST',
      body: {
        type: feedbackType.value,
        rating: rating.value,
        message: message.value.trim(),
        page_path: route.path,
      },
    })
  } catch {
    // fire-and-forget
  }
  submitting.value = false
  submitted.value = true

  // Reset after a few seconds
  setTimeout(() => {
    submitted.value = false
    feedbackType.value = 'suggestion'
    rating.value = 0
    message.value = ''
    isOpen.value = false
  }, 2500)
}
</script>
