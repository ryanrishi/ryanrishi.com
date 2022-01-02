import '@reach/dialog/styles.css'
import 'tailwindcss/tailwind.css'

import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

import { pageview } from '../lib/ga'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // When the component is mounted, subscribe to router changes and log those page views
    router.events.on('routeChangeComplete', url => pageview(url))

    // If the component is unmounted, unsubscribe from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', () => pageview())
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
