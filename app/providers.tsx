'use client'

import { pageview } from '@/lib/ga'
import { ThemeProvider } from 'next-themes'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function PageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = `${window.origin}${pathname}`
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      pageview(url)

    }
  }, [pathname, searchParams])

  return <></>
}

export default function Providers({ children }) {
  return (
    <>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
      <PageView />
    </>
  )
}
