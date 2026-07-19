import { compareDesc } from 'date-fns'
import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'
import { baseOpenGraph, baseTwitter, ogImage, SITE_URL } from '@/lib/metadata'
import { getAllProjects } from '@/lib/projects'

import ProjectItem from './project-item'

const title = 'Projects'
const description = 'Data visualization, conference talks, and web scrapers.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...baseOpenGraph,
    title,
    description,
    url: `${SITE_URL}/projects`,
    images: [ogImage(title, description)],
  },
  twitter: {
    ...baseTwitter,
    title,
    description,
    images: [ogImage(title, description)],
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
              index={i}
              key={i}
            />
          )
        }
      </ul>
    </>
  )
}
