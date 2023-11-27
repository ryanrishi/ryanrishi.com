import type { ReactNode } from 'react'

import Link from './link'

export interface TagPillProps {
  children: ReactNode
  href: string
}

export default function TagPill({ children, href }: TagPillProps) {
  return (
    <Link href={href} className="not-prose">
      <div className="bg-slate-300 text-slate-900 border rounded m-2 px-2">
        #{children}
      </div>
    </Link>
  )
}
