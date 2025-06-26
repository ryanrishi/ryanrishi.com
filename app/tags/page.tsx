import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'

import TagPill from '@/components/tag-pill'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Tags',
  openGraph: {
    title: 'Tags',
  },
  twitter: {
    title: 'Tags',
  },
}

export default async function TagsIndex() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getAllProjects(),
  ])

  const tags = new Set([
    ...posts.flatMap(post => post.tags),
    ...projects.flatMap(project => project.tags),
  ])

  return (
    <>
      <h1>Tags</h1>
      <div data-test-id="tags" className="flex flex-row flex-wrap prose leading-10 gap-4">
        {Array.from(tags).sort().map((tag) => (
          tag && <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
        ))}
      </div>
    </>
  )
}
