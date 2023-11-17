import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import Link from 'next/link'

import { H1 } from '@/components/headings'

dayjs.extend(utc)

export const metadata: Metadata = {
  title: 'Blog',
  openGraph: {
    title: 'Blog',
  },
}

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))

  return (
    <>
      {posts.map((post, i) => (
        <div
          className="mb-16 lg:mb-16 xl:mb-32"
          data-test-blog-post
          key={i}
        >
          <H1 className="hover:text-slate-900 dark:hover:text-slate-300">
            <Link href={`blog/${post.slug}`} legacyBehavior>
              {post.title}
            </Link>
          </H1>
          <p className="pb-4 text-slate-700 dark:text-slate-400 transition" data-test-blog-post-date>{dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p className="transition">{post.description}</p>
            <Link className="flex justify-end pt-4 italic uppercase font-bold dark:text-slate-100 transition" href={`blog/${post.slug}`}>
              Read more &raquo;
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
