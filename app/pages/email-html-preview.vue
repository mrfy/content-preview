<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-3">
          <img :src="'/Email_icon.svg'" alt="Email" class="w-10 h-10 sm:w-12 sm:h-12" />
          Email HTML Preview
        </h1>
        <p class="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
          Paste your HTML email code and instantly see how it renders. Catch layout issues, test styling, and export screenshots - all in your browser.
        </p>
        <NuxtLink
          to="/email-preview"
          class="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20"
        >
          Try Email Preview
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- What is this tool -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">What is this tool?</h2>
      <div class="prose prose-slate max-w-none">
        <p class="text-slate-600 leading-relaxed">
          Email HTML Preview is a free tool for marketers, developers, and designers who need to quickly check how their HTML emails render. Instead of sending test emails, simply paste your code and see the result instantly.
        </p>
        <p class="text-slate-600 leading-relaxed mt-4">
          The preview renders your email in an isolated environment at 600px width - the standard for email clients. All HTML is sanitized to protect against XSS attacks, while preserving the styles and structure that make your email look great.
        </p>
        <p class="text-slate-600 leading-relaxed mt-4">
          Your HTML code never leaves your browser. We don't store, log, or transmit your content in any way.
        </p>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-white border-y border-slate-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-10">How it works</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i">
            <div class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <span class="text-sm font-bold text-violet-600">{{ i + 1 }}</span>
            </div>
            <h3 class="text-base font-semibold text-slate-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-2xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
      <div class="space-y-3">
        <details
          v-for="(faq, i) in faqs"
          :key="i"
          class="group bg-white rounded-xl border border-slate-100 overflow-hidden"
        >
          <summary class="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-semibold text-slate-800 hover:text-violet-600 transition-colors [&::-webkit-details-marker]:hidden list-none">
            {{ faq.q }}
            <svg class="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <div class="px-6 pb-4 text-sm text-slate-500 leading-relaxed">
            {{ faq.a }}
          </div>
        </details>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-br from-violet-50 to-indigo-50 border-t border-violet-100/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Ready to preview your email?</h2>
        <p class="text-slate-500 mb-8">Free, instant, no account required.</p>
        <NuxtLink
          to="/email-preview"
          class="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-all duration-200 hover:shadow-lg hover:shadow-violet-600/20"
        >
          Try Email HTML Preview
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const faqs = [
  { q: 'Is this tool free?', a: 'Yes, completely free with no limits. No signup or account needed - just paste your HTML and see the preview.' },
  { q: 'Is my HTML code safe?', a: 'Yes. All HTML is sanitized using DOMPurify before rendering. Scripts, iframes, and event handlers are stripped. Your code is never sent to any server.' },
  { q: 'Does it support inline styles?', a: 'Yes, inline CSS is fully supported. The preview renders all standard email-compatible CSS including colors, fonts, spacing, and layout.' },
  { q: 'Can I test responsive emails?', a: 'The preview renders at 600px width, which is the standard for most email clients. This gives you an accurate representation of how your email will look.' },
]

useHead({
  title: 'Free Email HTML Preview - Render Your Email Before Sending',
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    },
  ],
})
useSeoMeta({
  description: 'Free tool to preview HTML emails before sending. Paste your code, see how it renders. Supports inline CSS, tables, responsive layouts.',
  ogTitle: 'Free Email HTML Preview - Render Your Email Before Sending',
  ogDescription: 'Preview your HTML email before sending. Paste your HTML code and see how it renders in an email client.',
})

const steps = [
  { title: 'Paste your HTML', desc: 'Paste your email HTML code into the editor. Or click "Load Sample" to see a demo template.' },
  { title: 'See the preview', desc: 'Your email is instantly rendered in a safe, isolated preview at standard 600px email width.' },
  { title: 'Export screenshot', desc: 'Download a high-resolution PNG screenshot to share with your team or include in documentation.' },
]
</script>
