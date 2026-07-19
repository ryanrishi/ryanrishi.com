import isEmpty from 'lodash.isempty'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Link from '@/components/link'
import { baseOpenGraph, baseTwitter, ogImage, SITE_URL } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

export async function generateStaticParams() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const allTags = Array.from(new Set([
    ...posts.flatMap(post => post.tags),
    ...projects.flatMap(project => project.tags),
  ]))

  return allTags.map(tag => ({ tag: kebabCase(tag) }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> => {
  const { tag } = await params
  const description = `Content tagged with "${tag}"`

  return {
    title: tag,
    description,
    openGraph: {
      ...baseOpenGraph,
      title: tag,
      description,
      url: `${SITE_URL}/tags/${kebabCase(tag)}`,
      images: [ogImage(tag, description)],
    },
    twitter: {
      ...baseTwitter,
      title: tag,
      description,
      images: [ogImage(tag, description)],
    },
  }
}

export default async function Tag({ params }: { params: Promise<{ tag: string }>}) {
  const { tag } = await params
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const postsWithTag = posts.filter(post => post.tags.map(kebabCase).includes(tag))
  const projectsWithTag = projects.filter(project => project.tags?.map(kebabCase).includes(tag))

  if (isEmpty(postsWithTag) && isEmpty(projectsWithTag)) {
    notFound()
  }

  return (
    <>
      <div className="prose dark:prose-invert">
        <h1>Content tagged with <code>{tag.replace('-', ' ')}</code></h1>
        {!isEmpty(postsWithTag) && <h3>Posts</h3>}
        {postsWithTag.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}

        {!isEmpty(projectsWithTag) && <h3>Projects</h3>}
        {projectsWithTag.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </li>
        ))}
      </div>

      <div className="flex items-center justify-center my-8">
        <Link href="/tags" className="not-prose text-slate-500 hover:text-slate-600 transition">
          &larr; View all tags
        </Link>
      </div>
    </>
  )
}
