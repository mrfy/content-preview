<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm shadow-indigo-200 transition-transform duration-300 group-hover:scale-105">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span class="text-sm font-bold text-slate-800 tracking-tight hidden sm:block">
            Content Preview Tools
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center gap-2"
            active-class="!text-indigo-700 !bg-indigo-50"
          >
            <img :src="link.icon" :alt="link.label" class="w-4 h-4" />
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Mobile hamburger -->
        <button
          aria-label="Toggle menu"
          class="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg v-if="!isMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="isMenuOpen" class="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
        <nav class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            active-class="!text-indigo-700 !bg-indigo-50"
            @click="isMenuOpen = false"
          >
            <img :src="link.icon" :alt="link.label" class="w-4 h-4" />
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const navLinks = [
  { to: '/linkedin-preview', label: 'LinkedIn Preview', icon: '/LinkedIn_icon.svg' },
  { to: '/email-preview', label: 'Email Preview', icon: '/Email_icon.svg' },
]
</script>
