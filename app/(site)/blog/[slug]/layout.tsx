import Link from 'next/link'

export default function PostLayout({ children }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {children}
      <div className="flex items-center justify-center my-8">
        <Link href="/blog" className="not-prose text-slate-500 hover:text-slate-600 transition">
          &larr; Back to Blog
        </Link>
      </div>
    </div>
  )
}
