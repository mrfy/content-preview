<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-if="showBanner" class="fixed bottom-0 inset-x-0 z-50 p-4">
      <div class="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <p class="text-sm text-slate-600 flex-1">
          We use minimal cookies for functionality only. No tracking cookies are used.
          <NuxtLink to="/privacy-policy" class="text-indigo-600 hover:text-indigo-700 underline ml-1">Learn more</NuxtLink>
        </p>
        <button
          class="px-5 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex-shrink-0"
          @click="accept"
        >
          Accept
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showBanner = ref(false)

onMounted(() => {
  if (!localStorage.getItem('cookie-consent')) {
    showBanner.value = true
  }
})

function accept() {
  localStorage.setItem('cookie-consent', 'accepted')
  showBanner.value = false
}
</script>
