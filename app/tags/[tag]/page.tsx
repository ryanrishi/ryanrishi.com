import { allPosts, allProjects } from 'contentlayer/generated'
import isEmpty from 'lodash.isempty'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { H1, H3 } from '@/components/headings'
import Link from '@/components/link'

export const generateStaticParams = async () => Array.from(new Set([
  ...allPosts.flatMap(post => post.tags),
  ...allProjects.flatMap(project => project.tags),
]))

export const generateMetadata = ({ params }: { params: { tag: string } }): Metadata => {
  const { tag } = params

  return {
    title: tag,
    description: `Content tagged with "${tag}"`,
    openGraph: {
      title: tag,
      url: `https://ryanrishi.com/tags/${kebabCase(tag)}`,
    },
    twitter: {
      title: tag,
    },
  }
}

export default function Tag({ params }: { params: { tag: string }}) {
  const { tag } = params
  const postsWithTag = allPosts.filter(post => post.tags.map(kebabCase).includes(tag))
  const projectsWithTag = allProjects.filter(project => project.tags?.map(kebabCase).includes(tag))

  if (isEmpty(postsWithTag) && isEmpty(projectsWithTag)) {
    notFound()
  }

  return (
    <>
      <div className="prose">
        <H1>Content tagged with <code>{tag.replace('-', ' ')}</code></H1>
        {!isEmpty(postsWithTag) && <H3>Posts</H3>}
        {postsWithTag.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}

        {!isEmpty(projectsWithTag) && <H3>Projects</H3>}
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
