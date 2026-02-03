import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

export interface Project {
  slug: string
  name: string
  description: string
  date: string
  tags: string[]
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const dir = path.join(process.cwd(), 'app', 'projects')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const projects = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const filePath = path.join(dir, fileName)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)
      return { slug, ...data } as Project
    })
  )
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
