import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

export interface Project {
  name: string;
  slug: string;
  description: string;
  image: ProjectImage;
  permalink: string;
  date: string;
  content: string;
}

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}


const projectsDir = join(process.cwd(), 'pages/projects')

export function getProjectSlugs() {
  return fs.readdirSync(projectsDir)
    .filter(p => p.endsWith('.md'))
}

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(projectsDir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents) as unknown as { content: string, data: Omit<Project, "content"> }

  return {
    ...data,
    image: {
      ...data.image,
      alt: data.image.alt || data.name,
    },
    content,
  }
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()
  return slugs
    .map(slug => getProjectBySlug(slug))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1))
}
