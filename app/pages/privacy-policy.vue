<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
    <p class="text-sm text-slate-400 mb-10">Last updated: March 2026</p>

    <div class="prose prose-slate prose-sm max-w-none space-y-8">
      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">1. What Data We Collect</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          Content Preview Tools collects only minimal, anonymous analytics to improve the service. This includes:
        </p>
        <ul class="list-disc pl-5 text-sm text-slate-600 space-y-1 mt-2">
          <li>Viewport dimensions (screen size category)</li>
          <li>Referrer category (e.g. "direct", "search", "social" - not the full URL)</li>
          <li>A random session ID (generated per browser session, not linked to any personal data)</li>
          <li>Content length (character count of text entered in preview tools)</li>
          <li>Tool usage actions (which tool was used, whether an export was performed)</li>
        </ul>
        <p class="text-sm text-slate-600 leading-relaxed mt-3">
          We do <strong>not</strong> collect any personal data such as names, email addresses, IP addresses (stored), or any content you enter into the preview tools.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">2. Cookies</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          We do not use cookies for tracking or analytics purposes. The only cookie used on this site is a session cookie for the admin dashboard, which is only set when an administrator logs in. Regular users of the preview tools will never receive any tracking cookies.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">3. Data Storage</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          Anonymous analytics data is stored in a PostgreSQL database hosted on our infrastructure. This data is used solely for understanding usage patterns and improving the service. Data is not shared with, sold to, or made available to any third parties.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">4. Your Content</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          All content you enter into the preview tools (LinkedIn posts, email HTML, images) is processed entirely in your browser. Your content is <strong>never uploaded</strong> to our servers. Image processing, preview rendering, and PNG export all happen client-side using browser APIs.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">5. No Account Required</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          Content Preview Tools does not require you to create an account or provide any personal information to use any of our tools. The service is freely available without registration.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">6. Third-Party Services</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          We do not integrate with or send data to any third-party analytics, advertising, or tracking services.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 mb-3">7. Contact</h2>
        <p class="text-sm text-slate-600 leading-relaxed">
          If you have any questions about this privacy policy, please contact us at
          <a href="mailto:privacy@contentpreviewtools.com" class="text-indigo-600 hover:text-indigo-700 underline">privacy@contentpreviewtools.com</a>.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'Privacy Policy - Content Preview Tools',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>
