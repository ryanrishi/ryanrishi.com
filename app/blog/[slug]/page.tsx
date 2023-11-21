import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { H1 } from '@/components/headings'
import mdxComponents from '@/components/mdx-components'

dayjs.extend(utc)

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = allPosts.find((post) => post.slug === decodeURIComponent(params.slug))
  if (!post) throw new Error(`Post not found for slug: ${decodeURIComponent(params.slug)}`)

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: 'Ryan Rishi',
      url: `https://ryanrishi.com/blog/${decodeURIComponent(params.slug)}`,
      images: [
        { url: `https://ryanrishi.com/${post.image}` },
      ],
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      images: `https://ryanrishi.com/${post.image}`,
    },
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <H1>{post.title}</H1>
      <p className="mb-8 text-slate-500 dark:text-slate-400 transition">{dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}</p>

      <MDXContent components={mdxComponents} />
    </>
  )
}
