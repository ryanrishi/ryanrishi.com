import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'

import TagPill from '@/components/tag-pill'
import { getAllPosts } from '@/lib/posts'

dayjs.extend(utc)

export const dynamicParams = false

export async function generateStaticParams () {
  const posts = await getAllPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata ({ params }: { params: { slug: string } }): Metadata {
  const slug = decodeURIComponent(params.slug)
  const { metadata } = await import(`@/blog/${slug}.mdx`)

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      type: 'article',
      publishedTime: metadata.publishedAt,
      authors: 'Ryan Rishi',
      url: `https://ryanrishi.com/blog/${decodeURIComponent(params.slug)}`,
      images: [
        { url: `https://ryanrishi.com/${metadata.image}` },
      ],
      tags: metadata.tags,
    },
    twitter: {
      title: metadata.title,
      images: `https://ryanrishi.com/${metadata.image}`,
    },
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post, metadata } = await import(`@/blog/${slug}.mdx`)

  return (
    <>
      <h1>{metadata.title}</h1>
      <p className="-mt-4 text-slate-500">{dayjs.utc(metadata.publishedAt).format('MMMM D, YYYY')}</p>

      <Post />

      <div className="flex flex-row flex-wrap my-12 gap-4">
        {metadata.tags.map(tag => (
          <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
        ))}
      </div>
    </>
  )
}
