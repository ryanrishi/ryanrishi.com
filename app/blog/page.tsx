import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import Link from 'next/link'

import { FancyH1,H1 } from '@/components/headings'

dayjs.extend(utc)

export const metadata: Metadata = {
  title: 'Blog',
  openGraph: {
    title: 'Blog',
  },
  twitter: {
    title: 'Blog',
  },
}

export default function BlogIndex() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))

  return (
    <>
      <FancyH1>Blog</FancyH1>
      <div className="prose dark:prose-invert">
        {posts.map((post, i) => (
          <div
            key={i}
            data-test-blog-post
          >
            <h2>
              <Link href={`blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="-mt-4 text-slate-500 transition" data-test-blog-post-date>{dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}</p>
            <p className="transition">{post.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
