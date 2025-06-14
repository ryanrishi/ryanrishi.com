import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'

import TagPill from '@/components/tag-pill'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'

dayjs.extend(utc)

export const dynamicParams = false

export async function generateStaticParams () {
  const projects = await getAllProjects()

  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata ({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(decodeURIComponent(params.slug))

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      type: 'article',
      publishedTime: project.date,
      url: `https://ryanrishi.com/projects/${decodeURIComponent(params.slug)}`,
      images: [
        { url: `https://ryanrishi.com/${project.image.src}`},
      ],
    },
    twitter: {
      title: project.name,
      images: `https://ryanrishi.com/${project.image.src}`,
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
