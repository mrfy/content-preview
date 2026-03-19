export interface TextSegment {
  type: 'text' | 'hashtag' | 'url'
  value: string
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const SEE_MORE_CHAR_LIMIT = 250

const postText = ref('')
const imageFile = ref<File | null>(null)
const imageUrl = ref<string | null>(null)
const profileName = ref('Your Name')
const profileHeadline = ref('Your Headline')
const profileAvatarUrl = ref<string | null>(null)
const profileAvatarFile = ref<File | null>(null)
const isDarkMode = ref(false)
const visibility = ref<'public' | 'connections' | 'group'>('public')
const isExpanded = ref(false)
let lsWatchersActive = false

function hydrateFromLocalStorage() {
  if (lsWatchersActive) return
  postText.value = localStorage.getItem('cpt_li_postText') ?? ''
  profileName.value = localStorage.getItem('cpt_li_profileName') ?? 'Your Name'
  profileHeadline.value = localStorage.getItem('cpt_li_profileHeadline') ?? 'Your Headline'
  isDarkMode.value = localStorage.getItem('cpt_li_isDarkMode') === 'true'
  visibility.value = (localStorage.getItem('cpt_li_visibility') as 'public' | 'connections' | 'group') || 'public'

  watch(postText, v => localStorage.setItem('cpt_li_postText', v))
  watch(profileName, v => localStorage.setItem('cpt_li_profileName', v))
  watch(profileHeadline, v => localStorage.setItem('cpt_li_profileHeadline', v))
  watch(isDarkMode, v => localStorage.setItem('cpt_li_isDarkMode', String(v)))
  watch(visibility, v => localStorage.setItem('cpt_li_visibility', v))
  lsWatchersActive = true
}

export function useLinkedInPreview() {
  if (import.meta.client) {
    onMounted(hydrateFromLocalStorage)
  }

  const shouldTruncate = computed(() => {
    return postText.value.length > SEE_MORE_CHAR_LIMIT && !isExpanded.value
  })

  const displayText = computed(() => {
    if (shouldTruncate.value) {
      return postText.value.slice(0, SEE_MORE_CHAR_LIMIT)
    }
    return postText.value
  })

  const formattedSegments = computed<TextSegment[]>(() => {
    const text = displayText.value
    if (!text) return []

    const segments: TextSegment[] = []
    const regex = /(#[\w\u0080-\uFFFF]+|https?:\/\/[^\s]+)/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', value: text.slice(lastIndex, match.index) })
      }
      if (match[0].startsWith('#')) {
        segments.push({ type: 'hashtag', value: match[0] })
      } else {
        segments.push({ type: 'url', value: match[0] })
      }
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      segments.push({ type: 'text', value: text.slice(lastIndex) })
    }

    return segments
  })

  function setImage(file: File): boolean {
    if (file.size > MAX_IMAGE_SIZE) return false
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return false

    clearImage()
    imageFile.value = file
    imageUrl.value = URL.createObjectURL(file)
    return true
  }

  function setAvatar(file: File): boolean {
    if (file.size > MAX_IMAGE_SIZE) return false
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return false

    clearAvatar()
    profileAvatarFile.value = file
    profileAvatarUrl.value = URL.createObjectURL(file)
    return true
  }

  function clearAvatar() {
    if (profileAvatarUrl.value) {
      URL.revokeObjectURL(profileAvatarUrl.value)
    }
    profileAvatarUrl.value = null
    profileAvatarFile.value = null
  }

  function clearImage() {
    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = null
    imageFile.value = null
  }

  function clear() {
    postText.value = ''
    isExpanded.value = false
    clearImage()
    if (import.meta.client) {
      localStorage.removeItem('cpt_li_postText')
    }
  }

  function toggleExpand() {
    isExpanded.value = !isExpanded.value
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  return {
    postText,
    imageFile,
    imageUrl,
    profileName,
    profileHeadline,
    profileAvatarUrl,
    isDarkMode,
    visibility,
    isExpanded,
    shouldTruncate,
    formattedSegments,
    setImage,
    setAvatar,
    clearAvatar,
    clearImage,
    clear,
    toggleExpand,
    toggleDarkMode,
  }
}
