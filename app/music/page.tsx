import { allMusic } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { FancyH1 } from '@/components/headings'
import mdxComponents from '@/components/mdx-components'

export const metadata: Metadata = {
  title: 'Music',
}

export default function Music() {
  const music = allMusic[0]
  if (!music) notFound()

  const MDXContent = useMDXComponent(music.body.code)

  return (
    <>
      <FancyH1>Music</FancyH1>
      <MDXContent components={mdxComponents} />
    </>
  )
}
