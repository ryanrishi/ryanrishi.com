import Link from './link'

export interface TagPillProps {
  tag: string
  href: string
}

export default function TagPill({ tag, href }: TagPillProps) {
  return (
    <Link href={href}>
      <div className="bg-slate-300 text-slate-900 border rounded m-2 px-2">
        {tag}
      </div>
    </Link>
  )
}
