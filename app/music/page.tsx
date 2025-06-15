import { FancyH1 } from '@/components/headings'

export default async function Music() {
  const { default: Music } = await import('@/music/music.mdx')

  return (
    <div className="prose dark:prose-invert max-w-screen-xl">
      <FancyH1>Music</FancyH1>
      <Music />
    </div>
  )
}
