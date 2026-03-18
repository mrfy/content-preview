<template>
  <footer class="bg-slate-50 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span class="text-sm font-bold text-slate-700">Content Preview Tools</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Preview your marketing content before publishing. Free, fast, and private.
          </p>
        </div>

        <!-- Tools -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">Tools</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/linkedin-preview" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                <img src="/LinkedIn_icon.svg" alt="LinkedIn" class="w-4 h-4" />
                LinkedIn Preview
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/email-preview" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                <img src="/Email_icon.svg" alt="Email" class="w-4 h-4" />
                Email Preview
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">Resources</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/linkedin-post-preview" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                LinkedIn Post Preview Guide
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/email-html-preview" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Email HTML Preview Guide
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-3">Legal</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/privacy-policy" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                Terms of Service
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-slate-200/60">
        <p class="text-xs text-slate-400 text-center">
          &copy; {{ new Date().getFullYear() }} Content Preview Tools. All content stays in your browser.
        </p>
      </div>
    </div>
  </footer>
</template>
