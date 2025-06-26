import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'

export const metadata: Metadata = {
  title: 'test',
  description: 'this is only a test',
  keywords: ['test', 'second tag'],
  openGraph: {
    type: 'article',
    title: 'test',
    description: 'this is only a test',
    images: ['/img/nope.png'],
    tags: ['test', 'second tag'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'test',
    description: 'this is only a test',
    images: ['/img/nope.png'],
  },
}

export default async function Test() {
  const { default: Test } = await import('@/%5Ftest/test.mdx')

  return (
    <>
      <FancyH1>test</FancyH1>
      <div className="prose prose-slate dark:prose-invert">
        <Test />
      </div>
    </>
  )
}
