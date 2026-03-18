<template>
  <div class="overflow-hidden">
    <!-- Hero -->
    <section class="relative min-h-[85vh] flex items-center">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-[#f5f7ff]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)]" />
      <!-- Grid dots pattern -->
      <div class="absolute inset-0 opacity-[0.06]" style="background-image: radial-gradient(circle, #6366f1 1px, transparent 1px); background-size: 32px 32px;" />

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
        <div class="max-w-3xl">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-[fadeInUp_0.5s_ease-out]">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span class="text-xs font-semibold text-slate-600 tracking-wide">Free to use, no account needed</span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[0.95] text-slate-900 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
            See it before
            <br />
            <span class="relative">
              <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">they see it.</span>
              <svg class="absolute -bottom-2 left-0 w-full h-3 text-violet-300/60" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8.5C50 2 100 4 150 6.5C200 9 250 4 298 7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="mt-7 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
            Preview your LinkedIn posts and marketing emails exactly as they'll appear. Catch mistakes, perfect your message, export pixel-perfect screenshots.
          </p>

          <!-- CTA row -->
          <div class="mt-10 flex flex-wrap items-center gap-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            <NuxtLink
              to="/linkedin-preview"
              class="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/10 active:scale-[0.98]"
            >
              Start Previewing
              <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
            <span class="text-sm text-slate-500 flex items-center gap-2">
              <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Takes 30 seconds
            </span>
          </div>
        </div>

        <!-- Floating preview illustration (desktop) -->
        <div class="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[340px] animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
          <div class="relative">
            <!-- LinkedIn mock card -->
            <div class="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-200 p-5 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
                <div>
                  <div class="h-2.5 w-24 bg-slate-200 rounded-full" />
                  <div class="h-2 w-16 bg-slate-100 rounded-full mt-1.5" />
                </div>
              </div>
              <div class="space-y-2 mb-3">
                <div class="h-2 w-full bg-slate-100 rounded-full" />
                <div class="h-2 w-4/5 bg-slate-100 rounded-full" />
                <div class="h-2 w-3/5 bg-indigo-100 rounded-full" />
              </div>
              <div class="h-32 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl flex items-center justify-center">
                <svg class="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                </svg>
              </div>
              <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <div class="flex gap-4">
                  <div class="h-2 w-8 bg-slate-100 rounded-full" />
                  <div class="h-2 w-8 bg-slate-100 rounded-full" />
                  <div class="h-2 w-8 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>

            <!-- Email mock card (behind) -->
            <div class="absolute -bottom-6 -left-8 w-48 bg-white rounded-xl shadow-xl shadow-slate-300/40 border border-slate-200 p-3 rotate-[3deg]">
              <div class="h-6 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-md mb-2" />
              <div class="space-y-1.5">
                <div class="h-1.5 w-full bg-slate-100 rounded-full" />
                <div class="h-1.5 w-4/5 bg-slate-100 rounded-full" />
                <div class="h-1.5 w-3/5 bg-slate-100 rounded-full" />
              </div>
              <div class="h-5 w-16 bg-violet-100 rounded-md mt-2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section class="border-y border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div v-for="trust in trustSignals" :key="trust.text" class="flex items-center gap-2.5 text-sm text-slate-600">
            <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <span v-html="trust.icon" />
            </div>
            <span class="font-medium">{{ trust.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools section -->
    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div class="text-center mb-14">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-3">Available Now</p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Choose your preview tool</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <!-- LinkedIn card -->
          <NuxtLink
            to="/linkedin-preview"
            class="group relative bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/40 hover:border-indigo-300 hover:-translate-y-1"
          >
            <!-- Mini preview illustration -->
            <div class="px-8 pt-8 pb-4">
              <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 transition-transform duration-300 group-hover:scale-[1.02]">
                <div class="flex items-center gap-2.5 mb-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex-shrink-0" />
                  <div>
                    <div class="h-2 w-20 bg-slate-800 rounded-full" />
                    <div class="h-1.5 w-28 bg-slate-200 rounded-full mt-1" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div class="h-1.5 w-full bg-slate-200 rounded-full" />
                  <div class="h-1.5 w-3/4 bg-slate-200 rounded-full" />
                  <div class="flex gap-1">
                    <div class="h-1.5 w-16 bg-sky-200 rounded-full" />
                    <div class="h-1.5 w-12 bg-sky-200 rounded-full" />
                  </div>
                </div>
                <div class="flex gap-6 mt-3 pt-2.5 border-t border-slate-100">
                  <div class="h-1.5 w-6 bg-slate-100 rounded-full" />
                  <div class="h-1.5 w-8 bg-slate-100 rounded-full" />
                  <div class="h-1.5 w-6 bg-slate-100 rounded-full" />
                  <div class="h-1.5 w-5 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>

            <div class="px-8 pb-8">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <img :src="'/LinkedIn_icon.svg'" alt="LinkedIn" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-slate-900">LinkedIn Post Preview</h3>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed mb-5">
                Write your post with hashtags, add images, and see exactly how it'll appear in the feed. Dark mode included.
              </p>
              <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all duration-300">
                Open tool
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>

          <!-- Email card -->
          <NuxtLink
            to="/email-preview"
            class="group relative bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/40 hover:border-violet-300 hover:-translate-y-1"
          >
            <!-- Mini preview illustration -->
            <div class="px-8 pt-8 pb-4">
              <div class="bg-slate-100 rounded-xl p-3 mb-6 transition-transform duration-300 group-hover:scale-[1.02]">
                <div class="flex items-center gap-1 mb-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-red-300" />
                  <div class="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  <div class="w-1.5 h-1.5 rounded-full bg-green-300" />
                </div>
                <div class="bg-white rounded-lg p-3">
                  <div class="h-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-md mb-2 flex items-center justify-center">
                    <div class="h-1.5 w-20 bg-white/40 rounded-full" />
                  </div>
                  <div class="space-y-1.5 px-1">
                    <div class="h-1.5 w-full bg-slate-200 rounded-full" />
                    <div class="h-1.5 w-5/6 bg-slate-200 rounded-full" />
                    <div class="h-1.5 w-2/3 bg-slate-200 rounded-full" />
                  </div>
                  <div class="h-6 w-24 bg-violet-100 rounded-md mt-3 mx-auto" />
                </div>
              </div>
            </div>

            <div class="px-8 pb-8">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <img :src="'/Email_icon.svg'" alt="Email" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-slate-900">Email HTML Preview</h3>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed mb-5">
                Paste HTML and see how your email renders. 5 built-in templates, responsive toggle, safe sanitization.
              </p>
              <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all duration-300">
                Open tool
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-[#f0f2ff] border-y border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div class="text-center mb-16">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-3">How It Works</p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Three steps. Zero friction.</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div v-for="(step, i) in steps" :key="step.title" class="relative text-center">
            <!-- Step number -->
            <div class="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center mx-auto mb-5 relative">
              <span class="text-lg font-extrabold text-indigo-600">{{ i + 1 }}</span>
            </div>
            <!-- Connector line (between steps) -->
            <div v-if="i < 2" class="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-slate-200" />
            <h3 class="text-base font-bold text-slate-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features grid -->
    <section class="bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div class="text-center mb-14">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-3">Why Content Preview Tools</p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Built for people who care<br class="hidden sm:block" /> about how things look</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group p-6 rounded-2xl border border-slate-200 bg-white/60 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              :class="feature.bgClass"
            >
              <span v-html="feature.icon" />
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-1.5">{{ feature.title }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming soon -->
    <section class="bg-[#f0f2ff] border-t border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div class="text-center mb-14">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-3">Coming Soon</p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">More platforms on the way</h2>
          <p class="mt-3 text-sm text-slate-600">We're building previews for every major platform.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <NuxtLink
            v-for="tool in comingSoon"
            :key="tool.name"
            :to="tool.to"
            class="group relative bg-white rounded-2xl border border-dashed border-slate-300 p-6 transition-all duration-300 hover:border-solid hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="tool.bgClass">
                <span v-html="tool.icon" />
              </div>
              <span class="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-bold text-amber-600 uppercase tracking-wider">Soon</span>
            </div>
            <h4 class="text-sm font-bold text-slate-800 mb-1">{{ tool.name }}</h4>
            <p class="text-xs text-slate-500 leading-relaxed">{{ tool.desc }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bg-slate-900 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 24px 24px;" />

      <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Stop guessing.<br />Start previewing.
        </h2>
        <p class="text-slate-400 mb-10 text-lg">Free, instant, and completely private. Your content never leaves your browser.</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink
            to="/linkedin-preview"
            class="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all duration-200 hover:shadow-xl hover:shadow-white/10"
          >
            Try LinkedIn Preview
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
          <NuxtLink
            to="/email-preview"
            class="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent text-white text-sm font-bold rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-200"
          >
            Try Email Preview
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Content Preview Tools - Free LinkedIn Post & Email Preview',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Content Preview Tools',
        url: 'https://contentpreviewtools.com',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: 'Free online tools to preview LinkedIn posts and HTML emails before publishing.',
        featureList: ['LinkedIn Post Preview', 'Email HTML Preview', 'PNG Export', 'Dark Mode', 'Responsive Preview'],
      }),
    },
  ],
})
useSeoMeta({
  description: 'Free online tools to preview LinkedIn posts and HTML emails before publishing. Real-time preview, dark mode, export to PNG. No signup needed.',
  ogTitle: 'Content Preview Tools - Free LinkedIn Post & Email Preview',
  ogDescription: 'Preview your LinkedIn posts and marketing emails before publishing. Free, no signup.',
})

const trustSignals = [
  {
    text: '100% private, never leaves your browser',
    icon: '<svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
  },
  {
    text: 'No account required',
    icon: '<svg class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>',
  },
  {
    text: 'Export as high-res PNG',
    icon: '<svg class="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>',
  },
  {
    text: 'Works instantly, no setup',
    icon: '<svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
  },
]

const steps = [
  {
    title: 'Write or paste',
    desc: 'Type your LinkedIn post or paste your email HTML into the editor. Hashtags and URLs are auto-detected.',
  },
  {
    title: 'Preview in real-time',
    desc: 'See a pixel-perfect preview update as you type. Toggle dark mode, switch between desktop and mobile.',
  },
  {
    title: 'Export & share',
    desc: 'Download a high-resolution PNG screenshot to share with your team or keep for your records.',
  },
]

const features = [
  {
    title: 'Real-time preview',
    desc: 'Every keystroke updates the preview instantly. No waiting, no refreshing.',
    bgClass: 'bg-indigo-50',
    icon: '<svg class="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
  },
  {
    title: 'Dark mode support',
    desc: 'Preview LinkedIn posts in both light and dark modes to ensure your content looks great everywhere.',
    bgClass: 'bg-slate-100',
    icon: '<svg class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>',
  },
  {
    title: '5 email templates',
    desc: 'Start from a newsletter, welcome email, promo, receipt, or minimal template. Or paste your own HTML.',
    bgClass: 'bg-violet-50',
    icon: '<svg class="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>',
  },
  {
    title: 'Responsive preview',
    desc: 'Switch between desktop and mobile views for email previews to test your responsive layouts.',
    bgClass: 'bg-sky-50',
    icon: '<svg class="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" /></svg>',
  },
  {
    title: 'Hashtag highlighting',
    desc: 'LinkedIn hashtags and URLs are automatically detected and styled exactly as they appear in the feed.',
    bgClass: 'bg-blue-50',
    icon: '<svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" /></svg>',
  },
  {
    title: 'XSS protection',
    desc: 'All HTML email content is sanitized with DOMPurify. Scripts, iframes, and event handlers are stripped.',
    bgClass: 'bg-emerald-50',
    icon: '<svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
  },
]

const comingSoon = [
  {
    name: 'X (Twitter) Preview',
    desc: 'Preview tweets, threads, and media before posting.',
    to: '/twitter-preview',
    bgClass: 'bg-slate-100',
    icon: '<svg class="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
  {
    name: 'Instagram Preview',
    desc: 'Preview posts, carousels, and captions.',
    to: '/instagram-preview',
    bgClass: 'bg-gradient-to-br from-purple-100 to-pink-100',
    icon: '<svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  },
  {
    name: 'Facebook Preview',
    desc: 'Preview posts and link previews for Facebook.',
    to: '/facebook-preview',
    bgClass: 'bg-blue-50',
    icon: '<svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  },
]
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
