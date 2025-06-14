import { allProjects } from 'contentlayer/generated'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import mdxComponents from 'mdx-components'
import TagPill from '@/components/tag-pill'

dayjs.extend(utc)

export const generateStaticParams = async () => allProjects.map((project) => ({ slug: project.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const project = allProjects.find((project) => project.slug === params.slug)
  if (!project) throw new Error(`Project not found for slug: ${decodeURIComponent(params.slug)}`)

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

export default function Project({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug)
  if (!project) notFound()

  const MDXContent = useMDXComponent(project.body.code)

  return (
    <>
      <h1>{project.name}</h1>
      <MDXContent components={mdxComponents} />
      {project.tags && (
        <div className="flex flex-row flex-wrap my-12 gap-4">
          {project.tags.map(tag => (
            <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
          ))}
        </div>
      )}
    </>
  )
}
