import { allPosts, allProjects } from 'contentlayer/generated'
import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'

import TagPill from '@/components/tag-pill'

export const metadata: Metadata = {
  title: 'Tags',
  openGraph: {
    title: 'Tags',
  },
  twitter: {
    title: 'Tags',
  },
}

export default function TagsIndex() {
  const tags = new Set([
    ...allPosts.flatMap(post => post.tags),
    ...allProjects.flatMap(project => project.tags),
  ])

  return (
    <div className="prose">
      <h1>Tags</h1>
      <div data-test-id="tags" className="flex flex-row flex-wrap prose leading-10 gap-4">
        {Array.from(tags).sort().map((tag) => (
          tag && <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
        ))}
      </div>
    </div>
  )
}
