import { allProjects, Project } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FancyH1, H3 } from '@/components/headings'

export const metadata: Metadata = {
  title: 'Projects | Ryan Rishi',
}

const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <li className="border border-slate-200 dark:border-slate-700 rounded shadow">
      <div className="flex items-center justify-center">
        <Link href={project.url}>
          <Image
            className="object-cover transition duration-500 ease-in-out transform hover:scale-105 w-full h-full rounded-t"
            src={project.image.src || 'https://via.placeholder.com/400'}
            alt={project.image.alt}
            width="1600"
            height="1600"
          />
        </Link>
      </div>
      <div className="p-4">
        <H3>
          <Link href={project.url}>
            {project.name}
          </Link>
        </H3>
        <p className="transition">{project.description}</p>
      </div>
    </li>
  )
}

export default function ProjectsIndex() {
  return (
    <>
      <FancyH1>Projects</FancyH1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allProjects
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
