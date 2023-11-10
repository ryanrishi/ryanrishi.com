'use client'

import { allProjects, Project } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

import { FancyH1, H3 } from '@/components/headings'
import Projects from './page'

const ProjectItem = ({ project, style }: { project: Project, style?: any }) => {
  return (
    <li
      className="border rounded shadow"
      style={{ ...style }}
    >
      <div className="flex items-center justify-center">
        <Link
          href={project.url}
          passHref
        >
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
    // <Layout>
    <>
      <FancyH1>Projects</FancyH1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allProjects.map((project, i) =>
          <ProjectItem
            project={project}
            // style={style}
            key={i}
          />
        )}
      </ul>
    </>
    // </Layout>
  )
}
