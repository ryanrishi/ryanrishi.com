import type { ReactNode } from 'react'

import Link from './link'

export interface TagPillProps {
  children: ReactNode
  href: string
}

export default function TagPill({ children, href }: TagPillProps) {
  return (
    <Link href={href}>
      <div className="font-mono text-neutral-500 hover:text-neutral-700">
        #{children}
      </div>
    </Link>
  )
}
