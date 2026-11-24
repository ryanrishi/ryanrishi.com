import { ReactNode } from 'react'

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-10 border-l border-slate-300 dark:border-slate-600">{children}</ol>
}

export function TimelineItem({ date, title, children }: { date: string, title: string, children: ReactNode }) {
  return (
    <li className="relative mb-10 pl-6 last:mb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-valencia-500" />
      <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{date}</p>
      <h3 className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="prose prose-sm dark:prose-invert mt-2 max-w-none">{children}</div>
    </li>
  )
}
