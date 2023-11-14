import { allProjects } from 'contentlayer/generated'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import mdxComponents from '@/components/mdx-components'

dayjs.extend(utc)

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const project = allProjects.find((project) => project._raw.flattenedPath === `projects/${params.slug}`)
  if (!project) throw new Error(`Project not found for slug: ${params.slug}`)
  return { title: project.name }
}

export default function Project({ params }: { params: { slug: string } }) {
  const project = allProjects.find((pprojectost) => pprojectost._raw.flattenedPath === `projects/${params.slug}`)
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
