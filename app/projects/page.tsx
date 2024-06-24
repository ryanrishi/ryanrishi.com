import { allProjects } from 'contentlayer/generated'
import { Project } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FancyH1 } from '@/components/headings'

export const metadata: Metadata = {
  title: 'Projects',
  openGraph: {
    title: 'Projects',
  },
  twitter: {
    title: 'Projects',
  },
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <li>
      <Link
        href={`projects/${project.slug}`}
        className="space-y-3"
      >
        <div className="overflow-hidden rounded-md">
          <Image
            className="object-cover w-auto h-auto transition-all hover:scale-105 aspect-[3/4]"
            src={project.image.src}
            alt={project.image.alt}
            width="250"
            height="330"
          />
        </div>
        <div className="space-y-1">
          <h2 className="font-medium leading-none">{project.name}</h2>
          <p className="text-gray-600 dark:text-gray-500">{project.description}</p>
        </div>
      </Link>
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
