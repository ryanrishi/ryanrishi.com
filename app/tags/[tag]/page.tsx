import { allPosts } from 'contentlayer/generated'
import isEmpty from 'lodash.isempty'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { H1 } from '@/components/headings'
import Link from '@/components/link'

export const generateStaticParams = async () => Array.from(new Set([...allPosts.flatMap((post) => post.tags)]))

export const generateMetadata = ({ params }: { params: { tag: string } }): Metadata => {
  const { tag } = params

  return {
    title: tag,
    description: `Content tagged with "${tag}"`,
    openGraph: {
      title: tag,
      url: `https://ryanrishi.com/tags/${tag}`,
    },
    twitter: {
      title: tag,
    },
  }
}

export default function Tag({ params }: { params: { tag: string }}) {
  const { tag } = params
  const postsWithTag = allPosts.filter(post => post.tags.map(kebabCase).includes(tag))

  if (isEmpty(postsWithTag)) {
    notFound()
  }

  return (
    <div className="prose">
      <H1>{tag}</H1>
      {postsWithTag.map((post) => (
        <li key={post.slug}>
          <Link href={post.slug}>{post.title}</Link>
        </li>
      ))}
    </div>
  )
}
