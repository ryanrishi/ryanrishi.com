import { allTests } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { FancyH1 } from '@/components/headings'
import mdxComponents from '@/components/mdx-components'

export const metadata: Metadata = {
  title: 'Test',
}

export default function Test() {
  const testPage = allTests[0]
  if (!testPage) notFound()

  const MDXContent = useMDXComponent(testPage.body.code)

  return (
    <>
      <FancyH1>{testPage.title}</FancyH1>
      <MDXContent components={mdxComponents} />
    </>
  )
}
