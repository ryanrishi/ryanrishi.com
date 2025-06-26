import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'

interface TestFrontmatter {
  title: string
  description: string
  image?: string
  tags?: string[]
}

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = (await import('@/%5Ftest/test.mdx')) as unknown as { frontmatter: TestFrontmatter }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
      ...(frontmatter.tags && { tags: frontmatter.tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  }
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
