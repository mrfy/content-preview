export function useScreenshotExport() {
  const isExporting = ref(false)
  const exportError = ref<string | null>(null)

  async function exportAsImage(elementId: string, filename: string) {
    isExporting.value = true
    exportError.value = null

    try {
      const { toPng } = await import('html-to-image')
      const element = document.getElementById(elementId)

      if (!element) {
        throw new Error(`Element #${elementId} not found`)
      }

      const dataUrl = await toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      exportError.value = err instanceof Error ? err.message : 'Export failed'
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting,
    exportError,
    exportAsImage,
  }
}
