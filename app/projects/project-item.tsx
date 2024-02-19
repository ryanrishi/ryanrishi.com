import { Project } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="border border-slate-200 dark:border-slate-700 rounded shadow hover:scale-105 transition-transform">
      <Link href={`projects/${project.slug}`}>
        <div className="h-64">
          <Image
            className="object-cover w-full h-full transition transform rounded-t"
            src={project.image.src || 'https://via.placeholder.com/400'}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      </Link>
    </li>
  )
}
