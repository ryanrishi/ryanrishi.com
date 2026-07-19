import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import type { Metadata } from 'next/types'

import { baseOpenGraph, baseTwitter, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/metadata'

import Providers from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: {
    name: SITE_NAME,
    url: new URL(SITE_URL),
  },
  openGraph: {
    ...baseOpenGraph,
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
  },
  twitter: {
    ...baseTwitter,
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
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
