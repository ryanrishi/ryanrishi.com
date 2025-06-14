import fs from 'fs/promises'
import path from 'path'

export async function getAllProjects(): Promise<any[]> {
  const dir = path.join(process.cwd(), 'app/projects')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const projects = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const { metadata } = await import(`@/projects/${slug}.mdx`)
      return { slug, ...metadata }
    })
  )
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
