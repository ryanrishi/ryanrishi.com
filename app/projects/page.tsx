import { compareDesc } from 'date-fns'
import fs from 'fs/promises'
import matter from 'gray-matter'
import { Metadata } from 'next'
import path from 'path'

import { FancyH1 } from '@/components/headings'

import ProjectItem from './project-item'

export const metadata: Metadata = {
  title: 'Projects',
  openGraph: {
    title: 'Projects',
  },
  twitter: {
    title: 'Projects',
  },
}

export default async function ProjectsIndex() {
  const projects = await getAllProjects()

  return (
    <>
      <FancyH1>Projects</FancyH1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects
          .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
          .map((project, i) =>
            <ProjectItem
              project={project}
              key={i}
            />
          )
        }
      </ul>
    </>
  )
}

async function getAllProjects(): Promise<Project[]> {
  const dir = path.join(process.cwd(), 'app/projects')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.md'))
  const projects = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const source = await fs.readFile(path.join(dir, fileName), 'utf8')
      const { data } = matter(source)
      return {
        slug,
        name: data.name as string,
        date: data.date as string,
        summary: data.summary as string | undefined,
        image: {
          src: data.image?.src as string | undefined,
          alt: data.image?.alt as string | undefined,
          width: data.image?.width as number | undefined,
          height: data.image?.height as number | undefined,
        },
        description: data.description as string | undefined,
        tags: data.tags as string[] | undefined,
      }
    })
  )
  return projects.sort((a, b) => new Date(b.date).getTime() - new
Date(a.date).getTime())
}
