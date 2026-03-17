<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          LinkedIn Post Preview
        </h1>
        <p class="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
          See exactly how your LinkedIn post will look before you publish it. Preview text, hashtags, images, and formatting in a realistic feed layout.
        </p>
        <NuxtLink
          to="/linkedin-preview"
          class="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20"
        >
          Try LinkedIn Preview
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
          LinkedIn Post Preview is a free tool that lets you see how your LinkedIn post will appear in the feed before you publish it. Write your text, add hashtags, and upload images to get a pixel-perfect preview of your content.
        </p>
        <p class="text-slate-600 leading-relaxed mt-4">
          Whether you're a marketer crafting campaigns, a founder sharing updates, or a freelancer building your personal brand - seeing your post before it goes live helps you catch formatting issues, optimize your message, and publish with confidence.
        </p>
        <p class="text-slate-600 leading-relaxed mt-4">
          Everything happens in your browser. We never store your content or upload your images to any server. Your data is yours.
        </p>
      </div>
    </section>

    <!-- How it works -->
    <section class="bg-white border-y border-slate-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-10">How it works</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <span class="text-sm font-bold text-indigo-600">{{ i + 1 }}</span>
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
          <summary class="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors [&::-webkit-details-marker]:hidden list-none">
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
    <section class="bg-gradient-to-br from-indigo-50 to-violet-50 border-t border-indigo-100/50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Ready to preview your post?</h2>
        <p class="text-slate-500 mb-8">Free, instant, no account required.</p>
        <NuxtLink
          to="/linkedin-preview"
          class="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/20"
        >
          Try LinkedIn Post Preview
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
  { q: 'Is this tool free?', a: 'Yes, completely free. No signup, no account, no limits. Just open the tool and start previewing your LinkedIn posts.' },
  { q: 'Do you store my content?', a: 'No. Everything stays in your browser. We never upload your text or images to any server. When you close the page, your content is gone.' },
  { q: 'Can I preview with images?', a: 'Yes! Upload any JPG, PNG, GIF, or WebP image up to 5MB. The image is processed entirely in your browser and displayed in the preview.' },
  { q: 'What formats can I export?', a: 'You can export your preview as a high-resolution PNG screenshot. The export captures exactly what you see in the preview.' },
]

useHead({
  title: 'Free LinkedIn Post Preview - See How Your Post Will Look',
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
  description: 'Free tool to preview your LinkedIn post before publishing. See how text, hashtags, and images appear in the feed. Export to PNG.',
  ogTitle: 'Free LinkedIn Post Preview - See How Your Post Will Look',
  ogDescription: 'Preview your LinkedIn post before publishing. See exactly how your text, hashtags, and images will appear in the LinkedIn feed.',
})

const steps = [
  { title: 'Write your post', desc: 'Type or paste your LinkedIn post text. Hashtags and URLs are automatically detected and highlighted.' },
  { title: 'Add an image', desc: 'Optionally upload an image to see how it appears in your post. Drag and drop or click to browse.' },
  { title: 'Export preview', desc: 'Download a pixel-perfect PNG screenshot of your post preview to share with your team or save for reference.' },
]

</script>
