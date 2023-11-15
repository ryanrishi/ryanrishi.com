import { allProjects } from 'contentlayer/generated'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import mdxComponents from '@/components/mdx-components'

dayjs.extend(utc)

export const generateStaticParams = async () => allProjects.map((project) => ({ slug: project.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const project = allProjects.find((project) => project.slug === params.slug)
  if (!project) throw new Error(`Project not found for slug: ${decodeURIComponent(params.slug)}`)

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      type: 'article',
      publishedTime: project.date,
      url: `https://ryanrishi.com/projects/${decodeURIComponent(params.slug)}`,
      images: [
        { url: `https://ryanrishi.com/${project.image}`}
      ],
    },
  }
}

export default function Project({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug)
  if (!project) notFound()

  const MDXContent = useMDXComponent(project.body.code)

  return (
    <>
      <h1>
        {project.name}
      </h1>
      <MDXContent components={mdxComponents} />
    </>
  )
}
