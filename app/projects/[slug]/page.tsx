import fs from 'fs'
import matter from 'gray-matter'
import kebabCase from 'lodash.kebabcase'
import { Metadata } from 'next'
import path from 'path'

import TagPill from '@/components/tag-pill'
import { getAllProjects } from '@/lib/projects'


export const dynamicParams = false

export async function generateStaticParams () {
  const projects = await getAllProjects()

  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const filePath = path.join(process.cwd(), 'app', 'projects', `${decodedSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContent)

  return {
    title: frontmatter.name,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.name,
      type: 'article',
      publishedTime: frontmatter.date,
      url: `https://ryanrishi.com/projects/${decodedSlug}`,
      ...(frontmatter.image && {
        images: [{ url: `https://ryanrishi.com${frontmatter.image.src}` }],
      }),
    },
    twitter: {
      title: frontmatter.name,
      ...(frontmatter.image && {
        images: `https://ryanrishi.com${frontmatter.image.src}`,
      }),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Project } = await import(`@/projects/${slug}.mdx`)
  const filePath = path.join(process.cwd(), 'app', 'projects', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter } = matter(fileContent)

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>{frontmatter.name}</h1>
      <Project />
      {frontmatter.tags && (
        <div className="flex flex-row flex-wrap my-12 gap-4">
          {frontmatter.tags.map(tag => (
            <TagPill key={tag} href={`/tags/${kebabCase(tag)}`}>{tag}</TagPill>
          ))}
        </div>
      )}
    </div>
  )
}
