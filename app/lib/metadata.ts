import type { Metadata } from 'next'

export const SITE_URL = 'https://ryanrishi.com'
export const SITE_NAME = 'Ryan Rishi'
export const SITE_DESCRIPTION = 'Software engineer crafting exceptional user experiences. Musician, marathon runner, and backgammon player who loves cooking and camping.'

export function ogImage(title?: string, subtitle?: string): string {
  const params = new URLSearchParams()
  if (title) params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)

  const query = params.toString()
  return query ? `/og?${query}` : '/og'
}

export const baseOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: SITE_NAME,
  locale: 'en_US',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  images: [ogImage()],
}

export const baseTwitter: Metadata['twitter'] = {
  card: 'summary_large_image',
  creator: '@ryanrishi',
  images: [ogImage()],
}
