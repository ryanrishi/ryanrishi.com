// log the pageview with their URL
export const pageview = (url?: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
    page_path: url,
  })
}

// log specific events happening.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const event = ({ action, params }: { action: string, params: any }) => {
  window.gtag('event', action, params)
}
