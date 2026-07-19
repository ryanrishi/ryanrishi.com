import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'
import { baseOpenGraph, baseTwitter, ogImage, SITE_URL } from '@/lib/metadata'

const title = 'Music'
const description = 'My music projects and performances'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...baseOpenGraph,
    title,
    description,
    url: `${SITE_URL}/music`,
    images: [ogImage(title, description)],
  },
  twitter: {
    ...baseTwitter,
    title,
    description,
    images: [ogImage(title, description)],
  },
}

export default async function Music() {
  const { default: Music } = await import('./music.mdx')

  return (
    <div className="prose dark:prose-invert max-w-none">
      <FancyH1>Music</FancyH1>
      <Music />
    </div>
  )
}
