import mdxComponents from 'components/mdx-components'
import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from  'next-contentlayer/hooks'

dayjs.extend(utc)

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${params.slug}`)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return {
    title: `${post.title}`,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      url: `https://ryanrishi.com/blog/${params.slug}`,
      images: [
        { url: `https://ryanrishi.com/${post.image}` },
      ],
      tags: post.tags,
    },
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${params.slug}`)
  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <h1>{post.title}</h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400 transition">{dayjs.utc(post.publishedAt).format('MMMM D, YYYY')}</p>
      <MDXContent components={mdxComponents} />
    </>
  )
}
