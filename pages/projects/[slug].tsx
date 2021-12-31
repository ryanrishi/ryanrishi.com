import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import ProjectLayout from '../../layouts/projects'
import { getProjectBySlug, getProjectSlugs } from '../../lib/projects'

export default function Project({ source, frontMatter }) {
  return (
    <ProjectLayout
      frontMatter={frontMatter}
    >
      {source}
    </ProjectLayout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getProjectSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug.replace(/\.md$/, ''),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = getProjectBySlug(params.slug as string)

  const mdxSource = await serialize(project.content, { scope: { ...project } })

  return {
    props: {
      source: mdxSource,
      frontMatter: project,
    },
  }
}
