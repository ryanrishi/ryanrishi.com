import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import Link from 'next/link'

import { H1 } from '@/components/headings'
import Layout from '@/components/layout'

dayjs.extend(utc)

export const metadata: Metadata = {
  title: 'Blog | Ryan Rishi',
}

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <Layout>
      {posts.map((post, i) => (
        <div
          className="mb-16 lg:mb-16 xl:mb-32"
          data-test-blog-post
          key={i}
        >
          <H1 className="hover:text-slate-900 dark:hover:text-slate-300">
            <Link href={post.url} legacyBehavior>
              {post.title}
            </Link>
          </H1>
          <p className="pb-4 text-slate-700 dark:text-slate-400 transition" data-test-blog-post-date>{dayjs.utc(post.date).format('MMMM D, YYYY')}</p>

          <div className="flex flex-col">
            <p className="transition">{post.description}</p>
            <Link className="flex justify-end pt-4 italic uppercase font-bold dark:text-slate-100 transition" href={post.url}>
              Read more &raquo;
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  )
}
