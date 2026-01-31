import { compareDesc } from 'date-fns'
import { Metadata } from 'next'

import { FancyH1 } from '@/components/headings'
import { getAllProjects } from '@/lib/projects'

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
              index={i}
              key={i}
            />,
          )
        }
      </ul>
    </>
  )
}
