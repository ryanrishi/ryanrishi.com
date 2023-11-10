// import '@reach/dialog/styles.css'
// import 'tailwindcss/tailwind.css'
import './styles.css'

import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
