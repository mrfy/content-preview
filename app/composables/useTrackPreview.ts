const SESSION_KEY = 'cpt_session_id'

function getSessionId(): string {
  if (typeof sessionStorage === 'undefined') return ''
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

async function hashUA(): Promise<string> {
  if (typeof navigator === 'undefined' || typeof crypto?.subtle === 'undefined') return ''
  try {
    const data = new TextEncoder().encode(navigator.userAgent)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash)).slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return ''
  }
}

function getReferrerCategory(): string {
  if (typeof document === 'undefined' || !document.referrer) return 'direct'
  try {
    const host = new URL(document.referrer).hostname
    if (host.includes('google') || host.includes('bing') || host.includes('duckduckgo') || host.includes('yahoo')) return 'search'
    if (host.includes('linkedin') || host.includes('twitter') || host.includes('facebook') || host.includes('instagram') || host.includes('reddit')) return 'social'
    if (host === location.hostname) return 'internal'
    return 'referral'
  } catch {
    return 'unknown'
  }
}

export interface TrackMeta {
  content_length?: number
  has_image?: boolean
  template_name?: string
  dark_mode?: boolean
  viewport_mode?: string
}

let pageEnteredAt = 0

export function useTrackPreview() {
  if (typeof window !== 'undefined' && !pageEnteredAt) {
    pageEnteredAt = Date.now()
  }

  async function track(toolType: 'linkedin' | 'email', action: 'preview' | 'export', meta?: TrackMeta) {
    const uaH = await hashUA()

    $fetch('/api/stats/track', {
      method: 'POST',
      body: {
        tool_type: toolType,
        action,
        session_id: getSessionId(),
        page_path: typeof location !== 'undefined' ? location.pathname : null,
        referrer: getReferrerCategory(),
        viewport_width: typeof window !== 'undefined' ? window.innerWidth : null,
        viewport_height: typeof window !== 'undefined' ? window.innerHeight : null,
        ua_hash: uaH || null,
        duration_ms: pageEnteredAt ? Date.now() - pageEnteredAt : null,
        ...meta,
      },
    }).catch(() => {
      // fire-and-forget
    })
  }

  return { track }
}
