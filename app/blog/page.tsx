import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import Link from 'next/link'

import { FancyH1 } from '@/components/headings'
import { getAllPosts } from '@/lib/posts'

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

export default async function BlogIndex() {
  const posts = await getAllPosts()

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
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <p className="-mt-4 text-slate-500" data-test-blog-post-date>{dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}</p>
            <p className="transition">{post.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
