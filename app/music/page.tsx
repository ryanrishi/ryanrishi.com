import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'

interface MusicFrontmatter {
  title: string
  description: string
}

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = (await import('@/music/music.mdx')) as unknown as { frontmatter: MusicFrontmatter }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
    },
    twitter: {
      card: 'summary',
      title: frontmatter.title,
      description: frontmatter.description,
    },
  }
}

export default async function Music() {
  const { default: Music } = await import('@/music/music.mdx')

  return (
    <div className="prose dark:prose-invert max-w-screen-xl">
      <FancyH1>Music</FancyH1>
      <Music />
    </div>
  )
}
