import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fs from 'fs'
import matter from 'gray-matter'
import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'
import path from 'path'

import TagPill from '@/components/tag-pill'
import { getAllPosts } from '@/lib/posts'

dayjs.extend(utc)

export const dynamicParams = false

export async function generateStaticParams () {
  const posts = await getAllPosts()

  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const filePath = path.join(process.cwd(), 'app', 'blog', `${decodedSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContent)

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      authors: 'Ryan Rishi',
      url: `https://ryanrishi.com/blog/${decodedSlug}`,
      images: [
        { url: `https://ryanrishi.com/${frontmatter.image}` },
      ],
    tags: frontmatter.tags,
    },
    twitter: {
      title: frontmatter.title,
      images: `https://ryanrishi.com/${frontmatter.image}`,
    },
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/blog/${slug}.mdx`)
  const filePath = path.join(process.cwd(), 'app', 'blog', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContent)

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p className="-mt-4 text-slate-500">{dayjs.utc(frontmatter.publishedAt).format('MMMM D, YYYY')}</p>

      <Post />

      <div className="flex flex-row flex-wrap my-12 gap-4">
        {frontmatter.tags.map(tag => (
          <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
        ))}
      </div>
    </>
  )
}
