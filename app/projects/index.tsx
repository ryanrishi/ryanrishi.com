'use client'

import { animated, useSpringRef, useTransition } from '@react-spring/web'
import { allProjects, Project } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

import { FancyH1, H3 } from '@/components/headings'

const ProjectItem = ({ project, style }: { project: Project, style: any }) => {
  return (
    <animated.li
      className="border rounded shadow"
      style={{ ...style }}
    >
      <div
        className="flex items-center justify-center"
      >
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
      <div
        className="p-4"
      >
        <H3>
          <Link
            href={project.url}
          >
            {project.name}
          </Link>
        </H3>
        <p className="transition">{project.description}</p>
      </div>
    </animated.li>
  )
}

export default function ProjectsIndex() {
  const transApi = useSpringRef()
  const transition = useTransition(allProjects, {
    ref: transApi,
    trail: 400 / allProjects.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  return (
    // <Layout>
    <>
      <FancyH1>Projects</FancyH1>
      <ul
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {transition((style, project) => (
          <ProjectItem
            project={project}
            style={style}
          />
        ))}
      </ul>
    </>
    // </Layout>
  )
}
