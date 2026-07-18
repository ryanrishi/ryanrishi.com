import Image from 'next/image'
import Link from 'next/link'

export default function ProjectItem({ project, index = 0 }) {
  return (
    <li className="group">
      <Link href={`/projects/${project.slug}`}>
        {project.image && (
          <div className="h-64 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <Image
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={80}
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        )}
        <div className="pt-4">
          <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-valencia-600 dark:text-slate-100 dark:group-hover:text-valencia-500">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
        </div>
      </Link>
    </li>
  )
}
