<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">Terms of Service</h1>
    <p class="text-sm text-slate-400 mb-10">Last updated: March 2026</p>

    <div class="prose prose-slate prose-sm max-w-none space-y-8">
      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">1. Acceptance of Terms</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          By accessing and using Content Preview Tools, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">2. Service Description</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          Content Preview Tools provides free, browser-based tools for previewing marketing content including LinkedIn posts and HTML emails. The service is provided "as is" and "as available" without any warranty of any kind, whether express or implied.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">3. No Warranty or SLA</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          This is a free tool provided without any service level agreement (SLA). We do not guarantee uptime, availability, or the accuracy of preview rendering. The previews are approximations and may differ from the actual appearance on target platforms.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">4. Your Content</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          All content you enter into the preview tools stays entirely in your browser. We never upload, store, or process your content on our servers. You retain full ownership of any content you create or preview using our tools. You are solely responsible for the content you create and preview.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">5. Acceptable Use</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          You agree not to misuse the service, including but not limited to: attempting to access the admin area without authorization, using automated tools to generate excessive load, or using the service for any illegal purpose.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">6. Modifications and Discontinuation</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          We reserve the right to modify, suspend, or discontinue the service (or any part of it) at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the service.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">7. Limitation of Liability</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          In no event shall Content Preview Tools be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service. Our total liability shall not exceed zero dollars, as this is a free service.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">8. Changes to Terms</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          We may update these Terms of Service from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">9. Contact</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          If you have any questions about these terms, please contact us at
          <a href="mailto:legal@contentpreviewtools.com" class="text-indigo-600 hover:text-indigo-700 underline">legal@contentpreviewtools.com</a>.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'Terms of Service - Content Preview Tools',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
