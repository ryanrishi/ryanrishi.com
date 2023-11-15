import { Project } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

import { H3 } from '@/components/headings'

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="border border-slate-200 dark:border-slate-700 rounded shadow">
      <div className="flex items-center justify-center">
        <Link href={`projects/${project.slug}`}>
          <Image
            className="object-cover transition duration-500 ease-in-out transform hover:scale-105 max-w-full h-auto rounded-t"
            src={project.image.src || 'https://via.placeholder.com/400'}
            alt={project.image.alt}
            width="1600"
            height="1600"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <H3>
          <Link href={`projects/${project.slug}`}>
            {project.name}
          </Link>
        </H3>
        <p className="transition">{project.description}</p>
      </div>
    </li>
  )
}
