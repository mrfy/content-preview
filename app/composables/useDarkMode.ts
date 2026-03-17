const isDark = ref(false)

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  function init() {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('dark-mode')
    if (saved === 'true') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  }

  watch(isDark, (val) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dark-mode', String(val))
    }
  })

  return { isDark, toggle, init }
}
