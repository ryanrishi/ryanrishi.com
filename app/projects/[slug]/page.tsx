import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'

import TagPill from '@/components/tag-pill'
import { getAllProjects } from '@/lib/projects'


export const dynamicParams = false

export async function generateStaticParams () {
  const projects = await getAllProjects()

  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const { metadata } = await import(`@/projects/${slug}.mdx`)
  return {
    title: metadata.name,
    description: metadata.description,
    openGraph: {
      title: metadata.name,
      type: 'article',
      publishedTime: metadata.date,
      url: `https://ryanrishi.com/projects/${slug}`,
      images: [
        { url: `https://ryanrishi.com${metadata.image.src}` },
      ],
    },
    twitter: {
      title: metadata.name,
      images: `https://ryanrishi.com${metadata.image.src}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Project, metadata } = await import(`@/projects/${slug}.mdx`)

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{metadata.name}</h1>
      <Project />
      {metadata.tags && (
        <div className="flex flex-row flex-wrap my-12 gap-4">
          {metadata.tags.map(tag => (
            <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
          ))}
        </div>
      )}
    </div>
  )
}
