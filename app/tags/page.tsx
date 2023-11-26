import { allPosts } from 'contentlayer/generated'
import kebabCase from 'lodash.kebabcase'
import type { Metadata } from 'next'

import { H1 } from '@/components/headings'
import Link from '@/components/link'
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
  const tags = new Set([...allPosts.flatMap((post => post.tags))])

  return (
    <>
      <H1>Tags</H1>
      <div data-test-id="tags" className="flex flex-row flex-wrap">
        {Array.from(tags).sort().map((tag) => (
          <TagPill key={tag} tag={tag} href={`/tags/${kebabCase(tag)}`} />
        ))}
      </div>
    </>
  )
}
