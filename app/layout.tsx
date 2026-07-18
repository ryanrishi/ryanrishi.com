import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import type { Metadata } from 'next/types'

import Providers from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://ryanrishi.com'),
  title: {
    default: 'Ryan Rishi',
    template: '%s | Ryan Rishi',
  },
  authors: {
    name: 'Ryan Rishi',
    url: new URL('https://ryanrishi.com'),
  },
  openGraph: {
    type: 'website',
    title: {
      default: 'Ryan Rishi',
      template: '%s | Ryan Rishi',
    },
    description: 'Full-stack software engineer and musician who loves cooking, camping, and flying.',
    url: 'https://ryanrishi.com',
    siteName: 'Ryan Rishi',
    locale: 'en_US',
  },
  twitter: {
    title: {
      default: 'Ryan Rishi',
      template: '%s | Ryan Rishi',
    },
    creator: '@ryanrishi',
    card: 'summary_large_image',
  },
  verification: {
    google: 'kausNF9hQubv5pYpPGZt6JjoZ45qF__IlkNNrlr',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
