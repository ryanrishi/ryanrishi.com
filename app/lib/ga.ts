// log the pageview with their URL
export const pageview = (url?: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
    page_path: url,
  })
}

// log specific events happening.

export const event = ({ action, params }: { action: string; params?: unknown }) => {
  // gtag's event params are loosely typed; accept unknown and validate at runtime.
  if (params != null && typeof params === 'object') {
    window.gtag('event', action, params as any)
  }
  else {
    window.gtag('event', action)
  }
}
