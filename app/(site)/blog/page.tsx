import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'

import ContentRow from '@/components/content-row'
import { FancyH1 } from '@/components/headings'
import { baseOpenGraph, baseTwitter, ogImage, SITE_URL } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'

dayjs.extend(utc)

const title = 'Blog'
const description = 'Writing about technology, music, and life.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...baseOpenGraph,
    title,
    description,
    url: `${SITE_URL}/blog`,
    images: [ogImage(title, description)],
  },
  twitter: {
    ...baseTwitter,
    title,
    description,
    images: [ogImage(title, description)],
  },
}

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <>
      <FancyH1>Blog</FancyH1>
      <div>
        {posts.map((post) => (
          <ContentRow
            key={post.slug}
            href={`/blog/${post.slug}`}
            title={post.title}
            date={dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}
            description={post.description}
            headingLevel="h2"
            rowProps={{ 'data-test-blog-post': true }}
            dateProps={{ 'data-test-blog-post-date': true }}
          />
        ))}
      </div>
    </>
  )
}
