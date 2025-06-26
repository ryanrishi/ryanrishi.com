import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'

export const metadata: Metadata = {
  title: 'Music',
  description: 'My music projects and performances',
  openGraph: {
    title: 'Music',
    description: 'My music projects and performances',
  },
  twitter: {
    card: 'summary',
    title: 'Music',
    description: 'My music projects and performances',
  },
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
