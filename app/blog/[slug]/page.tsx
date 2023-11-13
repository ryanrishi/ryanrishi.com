import mdxComponents from 'components/mdx-components'
import { allPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from  'next-contentlayer/hooks'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const post = allPosts.find((post) => post._raw.flattenedPath === `blog/${params.slug}`)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  return {
    title: `${post.title} | Ryan Rishi`,
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
      <MDXContent components={mdxComponents} />
    </>
  )
}
