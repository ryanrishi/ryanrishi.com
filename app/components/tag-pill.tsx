import type { ReactNode } from 'react'

import Link from './link'

export interface TagPillProps {
  children: ReactNode
  href: string
}

export default function TagPill({ children, href }: TagPillProps) {
  return (
    <Link href={href}>
      <div className="font-mono text-gray-500">
        #{children}
      </div>
    </Link>
  )
}
