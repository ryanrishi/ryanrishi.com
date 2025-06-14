import { allTests } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { FancyH1 } from '@/components/headings'
import mdxComponents from 'mdx-components'

export const generateMetadata = (): Metadata => {
  const testPage = allTests[0]

  return {
    title: testPage.title,
    description: testPage.description,
    openGraph: {
      type: 'article',
      title: testPage.title,
      description: testPage.description,
      images: {
        url: testPage.image,
      },
      tags: testPage.tags,
    },
  }
}

export default function Test() {
  const testPage = allTests[0]
  if (!testPage) notFound()

  const MDXContent = useMDXComponent(testPage.body.code)

  return (
    <>
      <FancyH1>{testPage.title}</FancyH1>
      <div className="prose prose-slate dark:prose-invert">
        <MDXContent components={mdxComponents} />
      </div>
    </>
  )
}
