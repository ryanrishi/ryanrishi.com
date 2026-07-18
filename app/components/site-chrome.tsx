import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
      <Header />
      <div className="container mx-auto max-w-3xl p-4">
        {children}
      </div>
      <Footer />
    </div>
  )
}
