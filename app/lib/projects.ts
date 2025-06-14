import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

export async function getAllProjects(): Promise<any[]> {
  const dir = path.join(process.cwd(), 'app/projects')
  const files = await fs.readdir(dir)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'))
  const projects = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const source = await fs.readFile(path.join(dir, fileName), 'utf8')
      const { data } = matter(source)
      return {
        slug,
        name: data.name as string,
        date: data.date as string,
        summary: data.summary as string | undefined,
        image: {
          src: data.image?.src as string | undefined,
          alt: data.image?.alt as string | undefined,
          width: data.image?.width as number | undefined,
          height: data.image?.height as number | undefined,
        },
        description: data.description as string | undefined,
        tags: data.tags as string[] | undefined,
      }
    })
  )
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getProjectBySlug(slug: string): Promise<any> {
  const dir = path.join(process.cwd(), 'app/projects')
  const filePath = path.join(dir, `${slug}.mdx`)

  try {
    const source = await fs.readFile(filePath, 'utf8')
    const { data } = matter(source)
    return {
      slug,
      name: data.name as string,
      date: data.date as string,
      summary: data.summary as string | undefined,
      image: {
        src: data.image?.src as string | undefined,
        alt: data.image?.alt as string | undefined,
        width: data.image?.width as number | undefined,
        height: data.image?.height as number | undefined,
      },
      description: data.description as string | undefined,
      tags: data.tags as string[] | undefined,
    }
  } catch (error) {
    console.error(`Error reading project file for slug "${slug}":`, error)
    return null
  }
}

