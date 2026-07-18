import NextLink from 'next/link'

interface ContentRowProps {
  href: string
  title: string
  date?: string
  description?: string
  headingLevel?: 'h2' | 'h3'
  rowProps?: Record<string, unknown>
  dateProps?: Record<string, unknown>
}

export default function ContentRow({
  href,
  title,
  date,
  description,
  headingLevel: Heading = 'h3',
  rowProps,
  dateProps,
}: ContentRowProps) {
  return (
    <div className="group border-b border-slate-200 dark:border-slate-800 py-5" {...rowProps}>
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="m-0 text-base font-medium">
          <NextLink
            href={href}
            className="text-slate-900 no-underline transition-colors group-hover:text-valencia-600 dark:text-slate-100 dark:group-hover:text-valencia-500"
          >
            {title}
          </NextLink>
        </Heading>
        {date && (
          <span className="shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500" {...dateProps}>
            {date}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  )
}
