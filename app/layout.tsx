// import '@reach/dialog/styles.css'
// import 'tailwindcss/tailwind.css'
// import './globals.css'

import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter()

  // useEffect(() => {
  //   // When the component is mounted, subscribe to router changes and log those page views
  //   router.events.on('routeChangeComplete', url => pageview(url))

  //   // If the component is unmounted, unsubscribe from the event with the `off` method
  //   return () => {
  //     router.events.off('routeChangeComplete', () => pageview())
  //   }
  // }, [router.events])

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
