import Image from 'next/image'
import Link from 'next/link'

export default function ProjectItem({ project, index = 0 }) {
  return (
    <li className="border border-slate-200 dark:border-slate-700 rounded shadow hover:scale-105 transition-transform">
      <Link href={`/projects/${project.slug}`}>
        {project.image && (
          <div className="h-64">
            <Image
              className="object-cover w-full h-full transition transform rounded-t"
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
        <div className="p-4">
          <h3 className="font-semibold">{project.name}</h3>
          <p>{project.description}</p>
        </div>
      </Link>
    </li>
  )
}
