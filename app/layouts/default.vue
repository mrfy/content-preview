<template>
  <div class="min-h-screen flex flex-col bg-slate-50/50">
    <UiAppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <UiAppFooter />
    <ClientOnly>
      <UiFeedbackWidget />
      <UiCookieBanner />
    </ClientOnly>
  </div>
</template>
