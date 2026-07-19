import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'
import TagPill from '@/components/tag-pill'
import { baseOpenGraph, baseTwitter, ogImage, SITE_URL } from '@/lib/metadata'
import { getAllPosts } from '@/lib/posts'
import { getAllProjects } from '@/lib/projects'

const title = 'Tags'
const description = 'Browse posts and projects by topic.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...baseOpenGraph,
    title,
    description,
    url: `${SITE_URL}/tags`,
    images: [ogImage(title, description)],
  },
  twitter: {
    ...baseTwitter,
    title,
    description,
    images: [ogImage(title, description)],
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
      <FancyH1>Tags</FancyH1>
      <div data-test-id="tags" className="flex flex-row flex-wrap prose leading-10 gap-4">
        {Array.from(tags).sort().map((tag) => (
          tag && <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
        ))}
      </div>
    </>
  )
}
