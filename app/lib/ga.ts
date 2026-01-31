// log the pageview with their URL
export const pageview = (url?: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
    page_path: url,
  })
}

// log specific events happening.

export const event = ({ action, params }: { action: string; params: Record<string, unknown> }) => {
  // gtag's event params are loosely typed; we accept a record and cast at the boundary.
  window.gtag('event', action, params as any)
}
