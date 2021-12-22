import fs from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import ProjectLayout from '../../layouts/projects'

const projectsDir = path.join(process.cwd(), 'pages', 'projects')

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
  const projectPaths = fs.readdirSync(projectsDir)
    .filter(f => f.endsWith('.md'))

  return {
    paths: projectPaths.map(p => ({
      params: {
        slug: p.replace(/.md$/, '')
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectPath = path.join(projectsDir, `${params.slug}.md`)
  const contents = fs.readFileSync(projectPath, 'utf8')
  const { data, content } = matter(contents)

  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}
